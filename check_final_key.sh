echo "현재 저장된 키의 앞부분 5자리입니다:"
grep "NEXT_PUBLIC_GEMINI_API_KEY" .env.local | cut -d'=' -f2 | cut -c 1-5
echo "... (나머지 생략)"
