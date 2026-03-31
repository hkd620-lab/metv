"use client";

import React, { useState } from 'react';
import { getWordMeaning } from '@/lib/dictionary';
import { playNativeTTS } from '@/components/TTSButton';

interface InteractiveSentenceProps {
  sentence: string;
}

export function InteractiveSentence({ sentence }: InteractiveSentenceProps) {
  // 현재 클릭된 단어의 상태를 관리
  const [activeTokenIdx, setActiveTokenIdx] = useState<number | null>(null);

  // 문장을 공백 기준으로 쪼개고 구두점을 분리하여 배열화
  const tokens = sentence.split(/\s+/).map((word, idx) => {
    const cleanText = word.replace(/[^a-zA-Z0-9]/g, '');
    return { id: idx, rawWord: word, cleanText };
  });

  const handleWordClick = (idx: number, text: string) => {
    // 1. 뜻을 띄우기 위해 팝업 인덱스 업데이트
    setActiveTokenIdx(idx);

    // 2. 단어 개별 원어민 발음 재생
    if (text) {
      playNativeTTS(text);
    }
  };

  return (
    <div className="flex flex-wrap text-xl font-bold text-slate-800 leading-relaxed gap-x-1.5 gap-y-2">
      {tokens.map((token) => (
        <span key={token.id} className="relative inline-block">
          {/* 단어 클릭 시 발음 + 팝업 노출 */}
          <button
            onClick={() => handleWordClick(token.id, token.cleanText)}
            className={`transition-colors duration-200 decoration-2 underline-offset-4 focus:outline-none 
              ${activeTokenIdx === token.id ? 'text-blue-600 underline' : 'hover:text-blue-500 hover:underline'}`}
          >
            {token.rawWord}
          </button>
          
          {/* 뜻 팝업 UI */}
          {activeTokenIdx === token.id && token.cleanText && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 animate-in fade-in slide-in-from-bottom-2">
              <div className="bg-slate-800 text-white text-sm font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
                {getWordMeaning(token.cleanText)}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-spacing-2 border-t-4 border-t-slate-800 border-x-4 border-x-transparent border-b-0 w-0 h-0" />
              </div>
            </div>
          )}
        </span>
      ))}
    </div>
  );
}
