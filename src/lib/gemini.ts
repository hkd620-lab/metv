import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

export const analyzeEnglishAudio = async (audioBase64: string, mimeType: string) => {
  try {
    // 유료 티어에서 가장 효율적인 gemini-1.5-flash 모델을 사용합니다.
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      당신은 전문 영어 발음 코치입니다. 이 오디오 파일을 정밀 분석하여 다음을 수행하세요:
      1. [영문 텍스트]: 들리는 문장을 정확히 받아쓰기 해주세요.
      2. [발음 진단]: 원어민의 강세와 억양을 비교하여 개선할 점을 한국어로 알려주세요.
      3. [훈련 팁]: 더 자연스러운 소리를 내기 위한 팁 1가지를 한국어로 제시해주세요.
    `;

    const result = await model.generateContent([
      { text: prompt },
      {
        inlineData: {
          data: audioBase64,
          mimeType: mimeType
        }
      }
    ]);
    
    return result.response.text();
  } catch (error: any) {
    console.error("Gemini 에러 상세:", error.message);
    return "AI 분석 중 오류가 발생했습니다. 키와 결제 상태를 확인해주세요.";
  }
};
