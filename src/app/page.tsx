"use client";

import React, { useState, useEffect } from 'react';
import { travelSections } from '@/lib/travel-data';
import { WordList } from '@/components/WordList';
import { ScrambleQuiz } from '@/components/ScrambleQuiz';
import { Plane, BookOpen, Gamepad2, Trophy, LockOpen } from 'lucide-react';
import { QuizScore } from '@/lib/types';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'LEARN' | 'QUIZ'>('LEARN');
  const [score, setScore] = useState<QuizScore>({ totalAttempted: 0, correctAnswers: 0 });
  const [unlockedCount, setUnlockedCount] = useState<number>(1);
  const [isLoaded, setIsLoaded] = useState(false);

  // 로컬 스토리지 데이터 불러오기
  useEffect(() => {
    const savedScore = localStorage.getItem('lexitravel_score');
    if (savedScore) {
      try {
        setScore(JSON.parse(savedScore));
      } catch (e) {
        console.error("Failed to parse score");
      }
    }
    
    const savedUnlocked = localStorage.getItem('lexitravel_unlocked_sections');
    if (savedUnlocked) {
      setUnlockedCount(parseInt(savedUnlocked, 10));
    }
    
    setIsLoaded(true);
  }, []);

  // 로컬 스토리지에 점수 저장하기
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('lexitravel_score', JSON.stringify(score));
    }
  }, [score, isLoaded]);

  const handleCorrectAnswer = () => {
    setScore(prev => ({
      ...prev,
      totalAttempted: prev.totalAttempted + 1,
      correctAnswers: prev.correctAnswers + 1
    }));
  };

  const handleUnlockNext = () => {
    if (unlockedCount < travelSections.length) {
      const nextCount = unlockedCount + 1;
      setUnlockedCount(nextCount);
      localStorage.setItem('lexitravel_unlocked_sections', nextCount.toString());
    }
  };

  const unlockedSections = travelSections.slice(0, unlockedCount);
  const quizWords = unlockedSections.flatMap(s => s.words);

  return (
    <main className="min-h-screen bg-slate-50 pb-24 font-sans">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-sm">
              <Plane className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-blue-600">METV (필여단정)</h1>
          </div>
          {/* 점수 표시기 */}
          <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full border border-yellow-200 shadow-sm">
            <Trophy className="w-5 h-5 text-yellow-600" />
            <span className="font-bold text-yellow-700 text-base">
              정답 {score.correctAnswers}회
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 pt-6 space-y-8">
        
        {/* 네비게이션 탭 */}
        <div className="flex p-1.5 bg-slate-200/70 rounded-2xl sticky top-20 z-40 backdrop-blur-md">
          <Button
            variant={activeTab === 'LEARN' ? 'default' : 'ghost'}
            className={`flex-1 rounded-xl text-lg h-14 font-bold transition-all duration-200 ${activeTab === 'LEARN' ? 'bg-white text-blue-600 shadow-md scale-100' : 'text-slate-500 hover:text-slate-700 scale-95 hover:bg-slate-200'}`}
            onClick={() => setActiveTab('LEARN')}
          >
            <BookOpen className="w-6 h-6 mr-2" />
            단어 학습장
          </Button>
          <Button
            variant={activeTab === 'QUIZ' ? 'default' : 'ghost'}
            className={`flex-1 rounded-xl text-lg h-14 font-bold transition-all duration-200 ${activeTab === 'QUIZ' ? 'bg-white text-blue-600 shadow-md scale-100' : 'text-slate-500 hover:text-slate-700 scale-95 hover:bg-slate-200'}`}
            onClick={() => setActiveTab('QUIZ')}
          >
            <Gamepad2 className="w-6 h-6 mr-2" />
            문장 조립 퀴즈
          </Button>
        </div>

        {/* 탭 콘텐츠 */}
        {activeTab === 'LEARN' ? (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-12">
            <div className="space-y-3 px-2">
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">해외 여행 생존 영단어 코스</h2>
              <p className="text-slate-600 text-xl font-medium break-keep leading-relaxed">준비된 단원을 차근차근 학습하며 범위를 넓혀가세요. 스피커를 누르거나 문장의 단어를 직접 눌러 뜻과 발음을 확인할 수 있습니다.</p>
            </div>

            {unlockedSections.map((section, idx) => (
              <div key={section.id} className="space-y-6">
                <div className={`rounded-3xl p-6 text-white shadow-md bg-gradient-to-br ${idx === 0 ? 'from-indigo-600 to-blue-500' : idx === 1 ? 'from-emerald-600 to-teal-500' : 'from-orange-500 to-amber-500'}`}>
                  <h3 className="text-2xl font-bold">{section.title}</h3>
                  <p className="opacity-90 mt-2 text-lg">{section.description}</p>
                </div>
                <WordList words={section.words} />
              </div>
            ))}
            
            {unlockedCount < travelSections.length && (
              <div className="pt-4 pb-12 text-center animate-in zoom-in-95 duration-500">
                <Button 
                  size="lg" 
                  onClick={handleUnlockNext} 
                  className="bg-slate-800 hover:bg-slate-900 text-white font-bold text-xl h-20 px-10 border-4 border-slate-700 rounded-3xl shadow-xl hover:-translate-y-1 transition-all"
                >
                  <LockOpen className="w-8 h-8 mr-4" />
                  단원 {unlockedCount + 1} 잠금 해제하기!
                </Button>
                <p className="text-slate-500 font-semibold mt-6 text-lg">💡 현재 단원을 충분히 익혔다면 다음 레벨로 넘어가세요.</p>
              </div>
            )}
            
            {unlockedCount >= travelSections.length && (
              <div className="py-12 text-center">
                <p className="text-xl font-bold text-slate-400">🎉 모든 단원이 열려 있습니다!</p>
              </div>
            )}
          </section>
        ) : (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-6 space-y-3 px-2">
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">도전! 실전 문장 게임</h2>
              <p className="text-slate-600 text-xl font-medium break-keep leading-relaxed">지금까지 개방된 **{unlockedCount}개 단원의 {quizWords.length}단어**들에서 무작위로 출제가 진행됩니다. 영어로 문장을 조립해 보세요!</p>
            </div>
            
            <ScrambleQuiz 
              words={quizWords} 
              onCorrectAnswer={handleCorrectAnswer} 
            />
          </section>
        )}
      </div>
    </main>
  );
}
