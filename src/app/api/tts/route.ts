import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { text, voiceName = 'en-US-Journey-F', languageCode = 'en-US' } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const API_KEY = process.env.GOOGLE_TTS_API_KEY;
    if (!API_KEY) {
      return NextResponse.json({ error: 'Google TTS API Key is missing. Please set GOOGLE_TTS_API_KEY in .env file.' }, { status: 500 });
    }

    // Google Cloud Text-to-Speech API 호출 (REST 방식)
    const response = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: { text },
        voice: { languageCode, name: voiceName },
        audioConfig: { audioEncoding: 'MP3' }
      })
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error?.message || 'Google TTS Request failed');
    }

    const data = await response.json();
    const audioContent = data.audioContent; // Base64 인코딩된 오디오

    // Base64 문자열을 안전하게 이진 버퍼로 변환하여 에러 우회(Uint8Array 사용)
    const buffer = Buffer.from(audioContent, 'base64');
    const u8array = new Uint8Array(buffer);

    return new NextResponse(u8array, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        // 브라우저 캐싱 적용 (한 번 만들어진 문장 오디오는 재요청 없이 브라우저 단에서 즉시 로드)
        'Cache-Control': 'public, max-age=31536000', 
      },
    });
  } catch (error: any) {
    console.error('Google TTS Error:', error);
    return NextResponse.json(
      { error: error.message || 'Error generating Google TTS' },
      { status: 500 }
    );
  }
}
