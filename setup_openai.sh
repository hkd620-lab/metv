# 1. src 폴더가 없으면 만들고, 있으면 그대로 둡니다.
mkdir -p src

# 2. OpenAI 호출 파일을 생성합니다. (가장 저렴한 gpt-4o-mini 모델 설정)
cat << 'INNER_EOF' > src/openai.ts
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
INNER_EOF

echo "성공: src/openai.ts 파일이 생성되었습니다."
