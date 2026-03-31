lsof -ti:9002 | xargs kill -9 2>/dev/null || echo "점유 중인 포트가 없습니다."
