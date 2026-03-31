import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const askAI = async (message: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }],
      max_tokens: 500,
    });
    return response.choices[0]?.message?.content || "답변이 없습니다.";
  } catch (error: any) {
    console.error("OpenAI 에러:", error.message);
    return "연결 오류가 발생했습니다. 키와 충전 잔액을 확인하세요.";
  }
};
