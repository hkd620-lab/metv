"use client";

import React, { useState, useEffect } from 'react';
import { WordEntryForm } from '@/components/WordEntryForm';
import { WordList } from '@/components/WordList';
import { WordEntry } from '@/lib/types';
import { Sparkles } from 'lucide-react';

export default function Home() {
  const [words, setWords] = useState<WordEntry[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load words from local storage
  useEffect(() => {
    const saved = localStorage.getItem('lexilist_data');
    if (saved) {
      try {
        setWords(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse words from localStorage");
      }
    }
    setIsLoaded(true);
  }, []);

  // Save words to local storage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('lexilist_data', JSON.stringify(words));
    }
  }, [words, isLoaded]);

  const handleAddWord = (newWord: Omit<WordEntry, 'id' | 'createdAt'>) => {
    const entry: WordEntry = {
      ...newWord,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };
    setWords((prev) => [entry, ...prev]);
  };

  const handleDeleteWord = (id: string) => {
    setWords((prev) => prev.filter((w) => w.id !== id));
  };

  return (
    <main className="min-h-screen pb-12">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">
              L
            </div>
            <h1 className="text-2xl font-black tracking-tight text-primary">LexiList</h1>
          </div>
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-secondary" />
            AI Enhanced Learning
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 pt-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Input Sidebar / Section */}
        <section className="md:col-span-5 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Expand your mind</h2>
            <p className="text-muted-foreground">Capture new words instantly. Let AI help you with definitions and examples.</p>
          </div>
          <WordEntryForm onAddWord={handleAddWord} />
          
          <div className="p-4 bg-secondary/10 rounded-xl border border-secondary/20">
            <h4 className="text-sm font-semibold text-secondary mb-1 flex items-center gap-1.5">
              💡 Tip
            </h4>
            <p className="text-xs text-secondary/80 leading-relaxed">
              Use the sparkles icon to automatically generate Korean definitions and natural example sentences for any word.
            </p>
          </div>
        </section>

        {/* List Section */}
        <section className="md:col-span-7">
          <WordList words={words} onDelete={handleDeleteWord} />
        </section>
      </div>
    </main>
  );
}
