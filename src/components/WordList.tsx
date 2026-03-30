"use client";

import React from 'react';
import { WordEntry } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, BookOpen, ChevronRight } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface WordListProps {
  words: WordEntry[];
  onDelete: (id: string) => void;
}

export function WordList({ words, onDelete }: WordListProps) {
  if (words.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground space-y-4 bg-white/50 rounded-xl border-2 border-dashed">
        <BookOpen className="w-12 h-12 opacity-20" />
        <p className="text-lg">Your vocabulary list is empty.</p>
        <p className="text-sm">Start by adding your first word above!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-2">
        <h3 className="font-semibold text-lg text-primary flex items-center gap-2">
          Your Collection
          <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
            {words.length} words
          </span>
        </h3>
      </div>
      
      <ScrollArea className="h-[calc(100vh-450px)] min-h-[400px] pr-4">
        <div className="space-y-3 pb-8">
          {words.map((word) => (
            <Card key={word.id} className="group hover:shadow-md transition-all duration-200 border-l-4 border-l-secondary overflow-hidden animate-in fade-in slide-in-from-bottom-2">
              <CardContent className="p-4 flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xl font-bold text-foreground">{word.english}</h4>
                    <ChevronRight className="w-4 h-4 text-muted-foreground opacity-50" />
                    <span className="text-primary font-medium">{word.korean}</span>
                  </div>
                  
                  {word.examples.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {word.examples.map((ex, idx) => (
                        <p key={idx} className="text-sm text-muted-foreground leading-relaxed">
                          • {ex}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(word.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
