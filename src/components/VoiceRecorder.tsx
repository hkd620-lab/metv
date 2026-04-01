"use client";

import React, { useState, useRef } from 'react';
import { Mic, Square, Loader2, Sparkles, MessageSquare, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { analyzeEnglishAudio } from '@/lib/gemini';
import { playMixedTTS, stopMixedAITTS } from '@/lib/ttsUtils';
import { Card, CardContent } from '@/components/ui/card';

export function VoiceRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [sttText, setSttText] = useState<string | null>(null);
  const [isReadingFeedback, setIsReadingFeedback] = useState(false);
  const [audioPayload, setAudioPayload] = useState<{base64: string, mimeType: string} | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const handleReadFeedback = async () => {
    if (isReadingFeedback) {
      stopMixedAITTS();
      setIsReadingFeedback(false);
      return;
    }
    if (!feedback) return;
    setIsReadingFeedback(true);
    await playMixedTTS(
      feedback,
      () => setIsReadingFeedback(false),
      (err) => {
        setIsReadingFeedback(false);
        alert(err.message);
      }
    );
  };

  const toggleRecording = async () => {
    if (isRecording) {
      stopRecording();
    } else {
      await startRecording();
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm;codecs=opus' });
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        
        if (audioBlob.size === 0) {
          setIsRecording(false);
          setSttText("(오디오 입력 없음)");
          setFeedback("마이크에 아무 소리도 입력되지 않았습니다! (아이폰 마이크 일시정지 또는 권한 문제를 확인해주세요.)");
          stream.getTracks().forEach((track) => track.stop());
          return;
        }
        
        submitAudioForSTT(audioBlob, 'audio/webm');
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setFeedback(null);
      setSttText(null);
    } catch (err: any) {
      console.error("마이크 접근 권한 에러:", err);
      alert("마이크 사용 기능을 허용해주세요!");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const submitAudioForSTT = async (blob: Blob, mimeType: string) => {
    setIsAnalyzing(true);
    setFeedback(null);
    setSttText(null);
    setAudioPayload(null);
    
    try {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = async () => {
        const base64Data = (reader.result as string).split(',')[1];
        setAudioPayload({ base64: base64Data, mimeType });
        
        // 1. Google Cloud STT 호출 (즉각적인 텍스트 변환 -> 화면 표출)
        try {
          const sttRes = await fetch('/api/stt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ audioBase64: base64Data })
          });
          
          if (sttRes.ok) {
            const sttData = await sttRes.json();
            if (sttData.transcript) {
              setSttText(sttData.transcript);
            } else {
              setSttText("(인식된 음성이 없습니다. 조금 더 크게 말씀해주세요!)");
            }
          } else {
            console.error("STT API 에러", await sttRes.text());
            setSttText("(STT 변환 일시 오류)");
          }
        } catch (e) {
          console.error("STT Fetch Error:", e);
          setSttText("(STT 변환 실패)");
        } finally {
            setIsAnalyzing(false);
        }
      };
    } catch (e: any) {
      setIsAnalyzing(false);
      setSttText("(오디오 처리 오류)");
    }
  };

  const requestGeminiFeedback = async () => {
    if (!audioPayload) return;
    setIsAnalyzing(true);
    try {
        const resultText = await analyzeEnglishAudio(audioPayload.base64, audioPayload.mimeType);
        setFeedback(resultText);
    } catch (e: any) {
        console.error("Gemini 분석 에러", e);
        setFeedback("코칭 중 오류가 발생했습니다: " + (e.message || "알 수 없는 오류"));
    } finally {
        setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full mt-3">
      <div className="flex items-center gap-2 relative">
        <Button
          variant={isRecording ? "destructive" : "outline"}
          size="sm"
          onClick={toggleRecording}
          disabled={isAnalyzing}
          className={`flex items-center gap-1.5 transition-all shadow-sm
            ${isRecording ? 'animate-pulse' : 'hover:border-blue-300 hover:text-blue-600'}`}
        >
          {isRecording ? <Square className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          <span className="text-xs font-semibold">
            {isRecording ? "녹음 중지 및 제출" : isAnalyzing ? "분석 중..." : "발음 진단(마이크)"}
          </span>
        </Button>
        {isAnalyzing && !sttText && (
          <div className="flex items-center gap-2 text-blue-600 text-xs font-medium animate-pulse ml-2">
            <Loader2 className="w-4 h-4 animate-spin" /> 구글 마이크가 텍스트를 받아적고 있습니다...
          </div>
        )}
        {isAnalyzing && sttText && (
          <div className="flex items-center gap-2 text-yellow-600 text-xs font-medium animate-pulse ml-2">
            <Loader2 className="w-4 h-4 animate-spin" /> 제미나이가 발음을 평가 중입니다...
          </div>
        )}
      </div>

      {sttText && (
        <div className="mt-2 text-sm font-medium text-blue-800 bg-blue-50 border border-blue-100 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm animate-in fade-in slide-in-from-top-2">
          <div className="flex items-start gap-3">
            <MessageSquare className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-blue-600 mb-1 uppercase tracking-wider">내가 발음한 문장</span>
              <span className="text-xl font-bold italic tracking-tight text-blue-950">"{sttText}"</span>
            </div>
          </div>
          {!feedback && !isAnalyzing && audioPayload && (
             <Button 
                onClick={requestGeminiFeedback} 
                variant="default" 
                size="sm"
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold whitespace-nowrap shadow-md"
             >
                <Sparkles className="w-4 h-4 mr-1.5" /> 
                Gemini 발음 코칭받기
             </Button>
          )}
        </div>
      )}

      {feedback && (
        <Card className="bg-yellow-50 border-yellow-200 mt-2 shadow-inner animate-in fade-in slide-in-from-top-2">
          <CardContent className="p-4 text-sm whitespace-pre-wrap text-slate-700 leading-relaxed font-medium">
            <div className="flex items-center justify-between gap-1.5 mb-2 border-b border-yellow-200 pb-2">
              <div className="flex items-center gap-1.5 text-slate-800 font-bold">
                <Sparkles className="w-4 h-4 text-yellow-600" /> <span className="text-yellow-800">Gemini 코치의 피드백</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleReadFeedback}
                className={`h-7 px-2.5 text-xs font-semibold rounded-full transition-all ${isReadingFeedback ? 'bg-yellow-200 text-yellow-800 animate-pulse' : 'bg-yellow-100/50 text-yellow-700 hover:bg-yellow-200'}`}
              >
                {isReadingFeedback ? <Square className="w-3.5 h-3.5 mr-1" /> : <Volume2 className="w-3.5 h-3.5 mr-1" />}
                {isReadingFeedback ? '중지' : '코치 음성 듣기'}
              </Button>
            </div>
            {feedback}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
