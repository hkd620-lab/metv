"use client";

import React from 'react';
import { TravelWord } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { TTSButton } from './TTSButton';
import { InteractiveSentence } from './InteractiveSentence';

interface WordListProps {
  words: TravelWord[];
}

export function WordList({ words }: WordListProps) {
  return (
    <div className="space-y-6 pb-24">
      {words.map((word, idx) => (
        <Card key={word.id} className="border-t-4 border-t-blue-500 shadow-xl rounded-2xl overflow-hidden">
          <CardContent className="p-5 sm:p-6 space-y-4 bg-white">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-3 inline-block">필수 단어 {idx + 1}</span>
                <h3 className="text-4xl font-black text-slate-800 tracking-tight">{word.english}</h3>
                <p className="text-2xl font-bold text-slate-500 mt-2">{word.korean}</p>
              </div>
              <TTSButton englishText={word.english} className="w-16 h-16 bg-blue-100 text-blue-700 hover:bg-blue-200" iconSize="w-8 h-8" />
            </div>
            
            <div className="space-y-3 pt-2">
              <h4 className="font-semibold text-slate-400 text-sm uppercase tracking-wider mb-2">실생활 예문 (단어를 클릭해보세요!)</h4>
              {word.examples.map((ex, i) => (
                <div key={i} className="bg-slate-50 rounded-2xl p-5 flex gap-4 items-center justify-between border border-slate-100 hover:border-blue-200 transition-colors">
                  <div className="space-y-3 flex-1">
                    <InteractiveSentence sentence={ex.english} />
                    <p className="text-lg text-slate-500 font-medium">{ex.korean}</p>
                  </div>
                  <TTSButton 
                    englishText={ex.english} 
                    iconSize="w-5 h-5" 
                    className="w-12 h-12 shrink-0 bg-white border border-slate-200" 
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
