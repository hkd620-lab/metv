export const stopMixedAITTS = () => {
    // We can stop active playback by exposing a signal or using a global var
    if (globalAudio) {
        globalAudio.pause();
        globalAudio.currentTime = 0;
        globalAudio = null;
    }
    isGlobalPlaying = false;
};

let globalAudio: HTMLAudioElement | null = null;
let isGlobalPlaying = false;

// 캐시를 언어/음성 조합으로 유지
const ttsCache = new Map<string, string>();

/**
 * 텍스트를 파싱하여 영어 덩어리와 한국어 덩어리로 분리합니다.
 */
function chunkTextByLanguage(text: string): { text: string; lang: 'en-US' | 'ko-KR' }[] {
    // 영어 알파벳이 포함된 단어 덩어리를 추출 (기본적인 띄어쓰기, 문장부호 포함)
    // 한글과 영어를 분리하기 위한 정규식
    const segments = text.split(/([a-zA-Z]+(?:[\s.,!?'-]+[a-zA-Z]+)*)/g).filter(s => s.trim().length > 0);
    
    return segments.map(seg => {
        // 영어 문자가 포함되어 있다면 영어로 판단
        if (/[a-zA-Z]/.test(seg)) {
            return { text: seg, lang: 'en-US' };
        }
        return { text: seg, lang: 'ko-KR' };
    });
}

async function fetchAudioUrl(text: string, lang: 'en-US' | 'ko-KR'): Promise<string> {
    const voiceName = lang === 'en-US' ? 'en-US-Journey-F' : 'ko-KR-Neural2-A';
    const cacheKey = `${voiceName}:${text}`;
    
    if (ttsCache.has(cacheKey)) {
        return ttsCache.get(cacheKey)!;
    }

    const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            text, 
            languageCode: lang, 
            voiceName: voiceName 
        })
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'TTS Fetch failed');
    }

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    ttsCache.set(cacheKey, url);
    return url;
}

export async function playMixedTTS(text: string, onEnd?: () => void, onError?: (err: Error) => void) {
    stopMixedAITTS();
    isGlobalPlaying = true;

    try {
        const chunks = chunkTextByLanguage(text);
        
        // 1. 병렬로 모든 음성을 먼저 다운로드 (지연 최소화)
        const audioUrls = await Promise.all(chunks.map(chunk => fetchAudioUrl(chunk.text, chunk.lang)));

        // 2. 순차 재생 함수
        let currentIndex = 0;
        const playNext = () => {
            if (!isGlobalPlaying) return; // 중지된 경우
            
            if (currentIndex >= audioUrls.length) {
                isGlobalPlaying = false;
                if (onEnd) onEnd();
                return;
            }

            const audio = new Audio(audioUrls[currentIndex]);
            globalAudio = audio;
            
            audio.onended = () => {
                currentIndex++;
                playNext();
            };

            audio.onerror = (e) => {
                console.error('Audio chunk play error', e);
                isGlobalPlaying = false;
                if (onError) onError(new Error("음성 재생 중 오류가 발생했습니다."));
            };

            audio.play().catch(e => {
                console.error("재생 시작 에러:", e);
                isGlobalPlaying = false;
                if (onError) onError(e);
            });
        };

        // 첫 번째 청크 재생 시작
        playNext();

    } catch (error: any) {
        console.error('Mixed TTS Error:', error);
        isGlobalPlaying = false;
        if (onError) onError(error);
    }
}
