"use client";

import React, { useState } from 'react';
import { Volume2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TTSButtonProps {
  englishText: string;
  className?: string;
  iconSize?: string;
}

// 오디오가 겹치지 않게 하기 위한 전역 변수
let currentAudio: HTMLAudioElement | null = null;
const audioCache = new Map<string, string>(); // 텍스트별 오디오 URL 캐싱

export function stopAITTS() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
}

// 고품질 Google TTS 음성 호출 함수
export async function playAITTS(text: string, onEnd?: () => void, onError?: () => void) {
  stopAITTS();
  
  try {
    let url = audioCache.get(text);

    // 캐시에 없으면 새로 서버에 요청하여 받아옴
    if (!url) {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'TTS Fetch failed');
      }
      
      const blob = await res.blob();
      url = URL.createObjectURL(blob);
      audioCache.set(text, url); // 메모리에 오디오 URL 저장 (지연시간 완전 제거)
    }
    
    const audio = new Audio(url);
    currentAudio = audio;
    
    if (onEnd) audio.onended = onEnd;
    
    // 자동 재생 에러 방지 및 에러 콜백
    audio.play().catch(e => {
      console.error('Audio Play Error:', e);
      if (onError) onError();
    });
  } catch (error) {
    console.error('TTS Request Error:', error);
    if (onError) onError();
    throw error;
  }
}

export function TTSButton({ englishText, className = "", iconSize = "w-6 h-6" }: TTSButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePlay = async () => {
    if (isPlaying || isLoading) return;
    setIsLoading(true);
    
    try {
      await playAITTS(
        englishText,
        () => {
          setIsPlaying(false);
          setIsLoading(false);
        },
        () => {
          setIsPlaying(false);
          setIsLoading(false);
        }
      );
      setIsPlaying(true);
      setIsLoading(false);
    } catch (e: any) {
      setIsLoading(false);
      setIsPlaying(false);
      alert(e.message || "음성 재생에 실패했습니다. 키 설정을 확인하세요.");
    }
  };

  return (
    <Button 
      variant="secondary" 
      size="icon" 
      onClick={handlePlay}
      disabled={isLoading}
      className={`rounded-full shadow-md hover:scale-105 active:scale-95 transition-all w-12 h-12 
        ${isPlaying ? 'bg-blue-600 text-white animate-pulse' : 'bg-blue-50 text-blue-600'} 
        ${className}`}
      title="영어 발음 듣기"
    >
      {isLoading ? <Loader2 className={`animate-spin ${iconSize}`} /> : <Volume2 className={iconSize} />}
    </Button>
  );
}
