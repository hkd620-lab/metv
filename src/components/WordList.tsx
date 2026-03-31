"use client";

import React, { useState, useRef, useEffect } from 'react';
import { TravelWord } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { TTSButton, playAITTS, stopAITTS } from './TTSButton';
import { InteractiveSentence } from './InteractiveSentence';
import { Button } from '@/components/ui/button';
import { Play, Repeat, Square } from 'lucide-react';
import { VoiceRecorder } from './VoiceRecorder';

interface WordListProps {
  words: TravelWord[];
}

function WordCard({ word, idx }: { word: TravelWord; idx: number }) {
  const [playingMode, setPlayingMode] = useState<'none' | 'once' | 'loop'>('none');
  const [playingIndex, setPlayingIndex] = useState<number>(-1);
  const playStateRef = useRef<{ mode: 'none' | 'once' | 'loop', index: number }>({ mode: 'none', index: -1 });

  // 컴포넌트 언마운트 시 오디오 중지
  useEffect(() => {
    return () => {
      if (playStateRef.current.mode !== 'none') {
        stopAITTS();
      }
    };
  }, []);

  const stopPlayback = () => {
    stopAITTS();
    setPlayingMode('none');
    setPlayingIndex(-1);
    playStateRef.current = { mode: 'none', index: -1 };
  };

  const playSequence = async (mode: 'once' | 'loop', startIndex: number = 0) => {
    if (playStateRef.current.mode === 'none' && startIndex !== 0) return; 
    
    if (startIndex >= word.examples.length) {
      if (mode === 'loop' && playStateRef.current.mode === 'loop') {
        playSequence('loop', 0); // 다시 처음부터
      } else {
        stopPlayback();
      }
      return;
    }

    setPlayingMode(mode);
    setPlayingIndex(startIndex);
    playStateRef.current = { mode, index: startIndex };
    
    try {
        await playAITTS(
          word.examples[startIndex].english,
          () => {
            setTimeout(() => {
              if (playStateRef.current.mode === mode && playStateRef.current.index === startIndex) {
                playSequence(mode, startIndex + 1);
              }
            }, 500); // 문장 사이 0.5초 간격
          },
          () => {
            stopPlayback();
          }
        );
    } catch(e) {
        stopPlayback();
        alert("순차 재생 중 오류가 발생했습니다.");
    }
  };

  const handlePlayOnce = () => {
    if (playingMode === 'once') {
      stopPlayback();
    } else {
      stopPlayback();
      playSequence('once', 0);
    }
  };

  const handlePlayLoop = () => {
    if (playingMode === 'loop') {
      stopPlayback();
    } else {
      stopPlayback();
      playSequence('loop', 0);
    }
  };

  return (
    <Card className="border-t-4 border-t-blue-500 shadow-xl rounded-2xl overflow-hidden">
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
            <h4 className="font-semibold text-slate-400 text-sm uppercase tracking-wider">실생활 예문 (단어를 클릭해보세요!)</h4>
            <div className="flex gap-2 shrink-0">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handlePlayOnce}
                className={`text-xs h-8 ${playingMode === 'once' ? 'bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200' : 'text-slate-500 hover:bg-slate-100'}`}
              >
                {playingMode === 'once' ? <Square className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
                1회 연속듣기
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handlePlayLoop}
                className={`text-xs h-8 ${playingMode === 'loop' ? 'bg-indigo-100 text-indigo-700 border-indigo-300 hover:bg-indigo-200' : 'text-slate-500 hover:bg-slate-100'}`}
              >
                {playingMode === 'loop' ? <Square className="w-4 h-4 mr-1" /> : <Repeat className="w-4 h-4 mr-1" />}
                무한 반복
              </Button>
            </div>
          </div>
          
          {word.examples.map((ex, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className={`bg-slate-50 rounded-2xl p-5 flex gap-4 items-center justify-between border transition-all duration-300 ${playingMode !== 'none' && playingIndex === i ? 'border-blue-400 bg-blue-50/50 scale-[1.02] shadow-sm' : 'border-slate-100 hover:border-blue-200'}`}>
                <div className="space-y-3 flex-1">
                  <InteractiveSentence sentence={ex.english} />
                  <p className="text-lg text-slate-500 font-medium">{ex.korean}</p>
                </div>
                <TTSButton 
                  englishText={ex.english} 
                  iconSize="w-5 h-5" 
                  className={`w-12 h-12 shrink-0 border transition-colors ${playingMode !== 'none' && playingIndex === i ? 'bg-blue-600 !text-white animate-pulse border-transparent' : 'bg-white border-slate-200'}`} 
                />
              </div>
              <VoiceRecorder />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function WordList({ words }: WordListProps) {
  return (
    <div className="space-y-6 pb-24">
      {words.map((word, idx) => (
        <WordCard key={word.id} word={word} idx={idx} />
      ))}
    </div>
  );
}
