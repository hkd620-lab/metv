import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { audioBase64 } = await req.json();

    if (!audioBase64) {
      return NextResponse.json({ error: 'Audio data is required' }, { status: 400 });
    }

    const API_KEY = process.env.GOOGLE_TTS_API_KEY;
    if (!API_KEY) {
      return NextResponse.json({ error: 'Google API Key is missing.' }, { status: 500 });
    }

    // Google Cloud Speech-to-Text API 호출
    const response = await fetch(`https://speech.googleapis.com/v1/speech:recognize?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        config: {
          // 브라우저 MediaRecorder 기본 WebM Opus 포맷
          encoding: 'WEBM_OPUS',
          languageCode: 'en-US',
          // 사용자가 한국어로 테스트하더라도 무시(빈 칸)되지 않고 글자로 나오게 언어 추가
          alternativeLanguageCodes: ['ko-KR'],
          // 짧은 문장/명령어(단발성 음성)에 가장 뛰어난 최신 모델 지정
          model: 'latest_short'
        },
        audio: {
          content: audioBase64
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Google STT API error response:', errText);
      throw new Error(`Google STT API Request failed: ${response.status}`);
    }

    const data = await response.json();
    
    // 분석 결과 조합
    let transcript = '';
    if (data.results && data.results.length > 0) {
      transcript = data.results
        .map((r: any) => r.alternatives[0].transcript)
        .join(' ');
    }

    return NextResponse.json({ transcript }, { status: 200 });
  } catch (error: any) {
    console.error('STT Error:', error);
    return NextResponse.json(
      { error: error.message || 'Error executing Google STT' },
      { status: 500 }
    );
  }
}
