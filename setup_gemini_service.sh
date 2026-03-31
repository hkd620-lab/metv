mkdir -p src/lib
cat << 'INNER_EOF' > src/lib/gemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

export const askGemini = async (prompt: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error: any) {
    console.error("Gemini 오류:", error.message);
    return "AI 답변을 가져오지 못했습니다. 키와 결제 상태를 확인하세요.";
  }
};
INNER_EOF
echo "성공: src/lib/gemini.ts 파일이 준비되었습니다."
