export interface ExampleSentence {
  english: string;
  korean: string;
}

export interface TravelWord {
  id: string;
  english: string;
  korean: string;
  category?: string;
  examples: ExampleSentence[];
}

export interface QuizScore {
  totalAttempted: number;
  correctAnswers: number;
}

export interface TravelSection {
  id: string; // 고유 섹션 ID
  title: string; // 섹션 제목
  description: string; // 섹션 설명
  words: TravelWord[];
}
