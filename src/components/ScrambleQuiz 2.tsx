"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { TravelWord, ExampleSentence } from '@/lib/types';
import { Button } from '@/components/ui/button';
import confetti from 'canvas-confetti';
import { TTSButton, playNativeTTS } from './TTSButton';

interface ScrambleQuizProps {
  words: TravelWord[];
  onCorrectAnswer: () => void;
}

// 헬퍼: 구두점 제거 및 소문자 변환 없이 토큰화
function tokenize(sentence: string) {
  return sentence.split(/\s+/).filter(w => w.trim() !== "");
}

// 헬퍼: 배열 섞기
function shuffle<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export function ScrambleQuiz({ words, onCorrectAnswer }: ScrambleQuizProps) {
  const [currentSentence, setCurrentSentence] = useState<ExampleSentence | null>(null);
  const [targetTokens, setTargetTokens] = useState<string[]>([]);
  const [availableChips, setAvailableChips] = useState<{ id: string; text: string }[]>([]);
  const [selectedChips, setSelectedChips] = useState<{ id: string; text: string }[]>([]);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // 새로운 문제를 생성하는 함수
  const generateProblem = () => {
    setIsError(false);
    setIsSuccess(false);
    setSelectedChips([]);

    if (words.length === 0) return;

    // 랜덤 단어 & 랜덤 예문 선택
    const randomWordIdx = Math.floor(Math.random() * words.length);
    const randomWord = words[randomWordIdx];
    const randomExampleIdx = Math.floor(Math.random() * randomWord.examples.length);
    const target = randomWord.examples[randomExampleIdx];

    setCurrentSentence(target);

    // 문장 토큰화
    const tokens = tokenize(target.english);
    setTargetTokens(tokens);

    // 방해 단어 2개 생성 (다른 예문들에서 무작위 토큰 추출)
    const allTokens = words.flatMap(w => w.examples.flatMap(ex => tokenize(ex.english)));
    const otherTokens = allTokens.filter(t => !tokens.includes(t));
    const distractor1 = otherTokens[Math.floor(Math.random() * otherTokens.length)] || "the";
    const distractor2 = otherTokens[Math.floor(Math.random() * otherTokens.length)] || "is";

    // 토큰 합치고 섞기
    const chipsToShuffle = [...tokens, distractor1, distractor2].map((text, idx) => ({ id: `chip-${idx}`, text }));
    setAvailableChips(shuffle(chipsToShuffle));
  };

  useEffect(() => {
    generateProblem();
  }, [words]);

  const handleChipClick = (chip: { id: string; text: string }) => {
    if (isSuccess) return;
    setAvailableChips(prev => prev.filter(c => c.id !== chip.id));
    setSelectedChips(prev => [...prev, chip]);
    setIsError(false); // 에러 상태 초기화
  };

  const handleSelectedClick = (chip: { id: string; text: string }) => {
    if (isSuccess) return;
    setSelectedChips(prev => prev.filter(c => c.id !== chip.id));
    setAvailableChips(prev => [...prev, chip]);
  };

  // 정답 검사
  useEffect(() => {
    if (targetTokens.length > 0 && selectedChips.length === targetTokens.length && !isSuccess) {
      const currentAnswer = selectedChips.map(c => c.text).join(' ');
      const targetAnswer = targetTokens.join(' ');

      if (currentAnswer === targetAnswer) {
        // 정답!
        setIsSuccess(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        
        // 맥OS/iOS의 고품질 원어민 발음 자동 재생 (Samantha, Daniel 최우선)
        if (currentSentence) {
          playNativeTTS(currentSentence.english);
        }

        onCorrectAnswer();
      } else {
        // 오답
        setIsError(true);
      }
    }
  }, [selectedChips, targetTokens, isSuccess, currentSentence, onCorrectAnswer]);

  if (!currentSentence) return <div className="p-8 text-center text-xl">로딩 중...</div>;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-8 animate-in fade-in">
      {/* 문제 영역 */}
      <div className="text-center space-y-4">
        <h3 className="text-sm font-semibold text-blue-600 tracking-wider">단어를 올바른 순서로 조립하세요!</h3>
        <p className="text-2xl font-bold break-keep text-slate-800 leading-relaxed">
          {currentSentence.korean}
        </p>
      </div>

      {/* 조립된 문장 (빈칸) 영역 */}
      <div className={`min-h-[80px] p-4 rounded-xl border-2 flex flex-wrap gap-2 items-center justify-center transition-colors ${isSuccess ? 'bg-green-50 border-green-500' : isError ? 'bg-red-50 border-red-400 animate-shake' : 'bg-slate-50 border-slate-200'}`}>
        {selectedChips.length === 0 && !isSuccess && !isError && (
          <span className="text-slate-400 text-lg">단어를 눌러 문장을 완성하세요</span>
        )}
        {selectedChips.map(chip => (
          <Button
            key={chip.id}
            variant={isSuccess ? "default" : isError ? "destructive" : "secondary"}
            onClick={() => handleSelectedClick(chip)}
            className={`text-lg px-4 py-6 shadow-sm ${isSuccess ? 'bg-green-500 hover:bg-green-600' : ''}`}
            disabled={isSuccess}
          >
            {chip.text}
          </Button>
        ))}
      </div>

      {/* 정답 시 다음 및 다시 듣기 버튼 */}
      {isSuccess && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in slide-in-from-bottom-4">
          <TTSButton iconSize="w-5 h-5" englishText={currentSentence.english} />
          <Button size="lg" onClick={generateProblem} className="w-full sm:w-auto text-lg font-bold bg-blue-600 hover:bg-blue-700 h-14 px-8 rounded-xl shadow-md">
            다음 퀴즈 풀기
          </Button>
        </div>
      )}

      {/* 오답 처리 메시지 */}
      {isError && (
        <p className="text-center text-red-500 font-bold animate-pulse">
          순서가 올바르지 않습니다. 다시 배열해보세요!
        </p>
      )}

      {/* 선택할 수 있는 단어 칩 (방해단어 포함) */}
      {!isSuccess && (
        <div className="pt-4 border-t border-slate-100">
          <p className="text-sm text-slate-500 text-center mb-4 font-medium">단어를 선택하세요 (방해 단어 주의!)</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {availableChips.map(chip => (
              <Button
                key={chip.id}
                variant="outline"
                onClick={() => handleChipClick(chip)}
                className="text-xl px-5 py-7 border-2 border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-slate-800 shadow-sm transition-all bg-white"
              >
                {chip.text}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
