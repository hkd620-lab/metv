export const getWordMeaning = (word: string): string => {
  const normalized = word.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  const dict: Record<string, string> = {
    // Pronouns & Prepositions
    "i": "나는/나", "my": "나의", "me": "나에게", "you": "당신", "your": "당신의", "we": "우리는", "our": "우리의",
    "he": "그는", "she": "그녀는", "it": "그것은", "they": "그들은",
    "this": "이것은/이", "that": "저것은/저", "here": "여기에/여기", "there": "거기에/저기",
    "what": "무엇", "where": "어디에", "when": "언제", "how": "어떻게", "which": "어떤",
    "a": "하나의", "an": "하나의", "the": "그", "some": "약간의", "any": "어떤", "another": "또 다른", "more": "더 많은", "one": "하나는",
    "in": "~안에", "on": "~위에", "at": "~에", "to": "~로/~에게", "for": "~을 위해/대해", "with": "~와 함께", "from": "~로부터", "under": "~아래에", "of": "~의",
    
    // Core Be & Verbs
    "is": "이다", "am": "이다", "are": "이다", "was": "이었다", "were": "이었다",
    "can": "할 수 있다", "do": "하다", "does": "하다", "will": "할 것이다", "would": "~할 것이다(정중)",
    "have": "가지고 있다", "has": "가지고 있다", "had": "가지고 있었다", "need": "필요하다", "want": "원하다", "like": "관심있다/좋아하다",
    "see": "보다", "look": "보다", "show": "보여주다", "find": "찾다", "check": "확인하다",
    "buy": "사다", "pay": "지불하다", "order": "주문하다", "take": "가져가다/타다", "bring": "가져오다",
    "make": "만들다/하다", "made": "했다/만들었다", "put": "놓다", "keep": "보관하다", "leave": "두고 가다", "left": "두다/떠났다",
    "lost": "잃어버렸다", "change": "바꾸다", "cancel": "취소하다", "help": "도와주다", "eat": "먹다", "drink": "마시다",
    "use": "사용하다", "wait": "기다리다", "waited": "기다렸다", "call": "부르다", "get": "얻다/도착하다", "turn": "돌리다/켜다", "fix": "고치다", "swam": "수영했다", "drop": "떨어뜨리다", "dropped": "떨어뜨렸다",
    
    // Nouns & Objects
    "passport": "여권", "ticket": "표/티켓", "flight": "비행(기)", "luggage": "수하물", "pieces": "개/조각",
    "reservation": "예약", "name": "이름", "hotel": "호텔", "subway": "지하철", "station": "역/정류장", "train": "기차",
    "bus": "버스", "taxi": "택시", "tonight": "오늘 밤", "now": "지금", "time": "시간/번",
    "menu": "메뉴판", "water": "물", "bottle": "병", "bathroom": "화장실", "room": "객실/방", "counter": "카운터",
    "towel": "수건", "towels": "수건들", "key": "열쇠", "breakfast": "조식/아침식사", "blanket": "담요/이불", "elevator": "엘리베이터",
    "air": "공기", "conditioner": "에어컨 (air와 conditioner)", "pool": "수영장", "swimming": "수영", "map": "지도",
    "table": "테이블/식탁", "window": "창문", "waiter": "종업원/웨이터", "fork": "포크", "knife": "나이프/칼", "food": "음식",
    "meal": "식사", "dishes": "요리/접시", "bill": "계산서", "dessert": "디저트", "allergy": "알레르기", "risk": "위험",
    "milk": "우유", "peanut": "땅콩", "coffee": "커피", "box": "상자", "cash": "현금", "machine": "기계",
    "london": "런던", "english": "영어", "floor": "층", "fifth": "다섯 번째", "two": "2/두 개",
    
    // Adjectives & Adverbs
    "safe": "안전한", "expired": "만료된", "missing": "없어진", "expensive": "비싼", "public": "공공의/대중의",
    "clean": "깨끗한", "dirty": "더러운", "early": "일찍", "possible": "가능한", "small": "작은", "nice": "좋은/멋진",
    "included": "포함된", "good": "좋은", "extra": "추가의", "soft": "부드러운", "broken": "고장난", "loud": "시끄러운",
    "closed": "닫힌", "cold": "추운/차가운", "useful": "유용한", "free": "무료의/비어있는", "kind": "친절한",
    "spicy": "매운", "less": "덜", "delicious": "맛있는", "everything": "모든 것", "famous": "유명한",
    "wrong": "잘못된", "bad": "나쁜", "sweet": "달콤한", "only": "오직/~만",
    
    // Conversational & Others
    "please": "제발/부탁합니다", "thank": "감사하다", "excuse": "(신례를) 용서하다 / Excuse me(실례합니다)",
    "ok": "네/알겠습니다", "yes": "네", "no": "아니요/없다", "not": "아니다", "too": "너무", "very": "매우"
  };

  return dict[normalized] || "사전 없음";
};
