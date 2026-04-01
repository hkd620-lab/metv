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

export function cleanTextForTTS(text: string): string {
    return text
        // 불필요한 마크다운 문법 기호 제거 (별표, 샵, 물결, 백틱)
        .replace(/[*#~`]+/g, '')
        // 언더바(_)가 양쪽에 쓰이거나 연속된 경우 제거
        .replace(/_+/g, '')
        // 리스트 대시(-)가 단독으로 쓰인 경우 제거 (단어 연결용 하이픈은 보존하기 위해 스페이스가 뒤에 오는 대시를 타겟팅)
        .replace(/(^|\n|\s)-\s+/g, ' ')
        // 이모티콘 싹 지우기
        .replace(/[\u{1F600}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F300}-\u{1F5FF}\u{1F900}-\u{1F9FF}\u{1FA70}-\u{1FAFF}]/gu, '')
        // 여러 공백 하나로 압축 
        .replace(/\s+/g, ' ')
        .trim();
}

export async function playMixedTTS(rawText: string, onEnd?: () => void, onError?: (err: Error) => void) {
    stopMixedAITTS();
    isGlobalPlaying = true;

    try {
        const cleanedText = cleanTextForTTS(rawText);
        const chunks = chunkTextByLanguage(cleanedText);
        
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
