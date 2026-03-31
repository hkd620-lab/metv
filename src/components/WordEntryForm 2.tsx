"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Plus, Sparkles, Loader2, RotateCcw } from 'lucide-react';
import { suggestWordDefinition } from '@/ai/flows/suggest-word-definition';
import { WordEntry } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface WordEntryFormProps {
  onAddWord: (word: Omit<WordEntry, 'id' | 'createdAt'>) => void;
}

export function WordEntryForm({ onAddWord }: WordEntryFormProps) {
  const [english, setEnglish] = useState('');
  const [korean, setKorean] = useState('');
  const [examples, setExamples] = useState<string[]>([]);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const { toast } = useToast();

  const handleSuggest = async () => {
    if (!english.trim()) {
      toast({
        title: "단어 누락",
        description: "먼저 영단어를 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    setIsSuggesting(true);
    try {
      const suggestion = await suggestWordDefinition({ englishWord: english });
      setKorean(suggestion.koreanDefinition);
      setExamples(suggestion.exampleSentences);
    } catch (error) {
      toast({
        title: "AI 추천 실패",
        description: "뜻을 추천받지 못했습니다. 다시 시도하거나 직접 입력해주세요.",
        variant: "destructive",
      });
    } finally {
      setIsSuggesting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!english.trim() || !korean.trim()) {
      toast({
        title: "필수 항목 누락",
        description: "영단어와 한글 뜻을 모두 입력해야 합니다.",
        variant: "destructive",
      });
      return;
    }

    onAddWord({ english, korean, examples });
    setEnglish('');
    setKorean('');
    setExamples([]);
  };

  const handleReset = () => {
    setEnglish('');
    setKorean('');
    setExamples([]);
  };

  return (
    <Card className="shadow-lg border-primary/10">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2 text-primary">
          <Plus className="w-5 h-5" />
          새 단어 추가
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="english">영단어</Label>
            <div className="flex gap-2">
              <Input
                id="english"
                placeholder="예: Serendipity"
                value={english}
                onChange={(e) => setEnglish(e.target.value)}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleSuggest}
                disabled={isSuggesting || !english.trim()}
                title="AI 추천 받기"
                className="shrink-0 border-secondary text-secondary hover:bg-secondary hover:text-white"
              >
                {isSuggesting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="korean">한글 뜻</Label>
            <Input
              id="korean"
              placeholder="뜻을 입력하세요"
              value={korean}
              onChange={(e) => setKorean(e.target.value)}
            />
          </div>

          {examples.length > 0 && (
            <div className="space-y-2 pt-2">
              <Label className="text-muted-foreground text-xs uppercase tracking-wider">예문</Label>
              <ul className="space-y-2">
                {examples.map((ex, idx) => (
                  <li key={idx} className="text-sm p-2 bg-muted/50 rounded-md border border-border italic">
                    {ex}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
              단어장에 추가
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleReset}
              className="text-muted-foreground hover:text-destructive"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
