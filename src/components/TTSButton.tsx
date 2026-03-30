"use client";

import React, { useState, useEffect } from 'react';
import { Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TTSButtonProps {
  englishText: string;
  className?: string;
  iconSize?: string;
}

// 고품질 음성을 찾는 공통 헬퍼 함수
export function playNativeTTS(text: string, onEnd?: () => void, onError?: () => void) {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    if (onError) onError();
    return;
  }
  
  window.speechSynthesis.cancel(); // 진행 중인 음성 취소

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 1.0; // 완전 원어민 일반 말하기 속도로 설정

  const voices = window.speechSynthesis.getVoices();
  // 우선순위: 맥OS/iOS 고품질 원어민 음성(Samantha, Daniel) 최우선 선택
  const preferredVoice = 
    voices.find(v => v.name.includes("Samantha") && v.lang.startsWith("en")) || 
    voices.find(v => v.name.includes("Daniel") && v.lang.startsWith("en")) || 
    voices.find(v => v.name.includes("Google US English")) || 
    voices.find(v => v.lang === 'en-US') || 
    voices.find(v => v.lang.startsWith("en"));
    
  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }

  if (onEnd) utterance.onend = onEnd;
  if (onError) utterance.onerror = onError;

  window.speechSynthesis.speak(utterance);
}

export function TTSButton({ englishText, className = "", iconSize = "w-6 h-6" }: TTSButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // 컴포넌트 마운트 시 브라우저 음성 목록 미리 로드 (비동기 로딩 대응)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  const handlePlay = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    
    playNativeTTS(
      englishText,
      () => setIsPlaying(false),
      () => setIsPlaying(false)
    );
  };

  return (
    <Button 
      variant="secondary" 
      size="icon" 
      onClick={handlePlay}
      className={`rounded-full shadow-md hover:scale-105 active:scale-95 transition-all w-12 h-12 
        ${isPlaying ? 'bg-blue-600 text-white animate-pulse' : 'bg-blue-50 text-blue-600'} 
        ${className}`}
      title="영어 발음 듣기"
    >
      <Volume2 className={iconSize} />
    </Button>
  );
}
