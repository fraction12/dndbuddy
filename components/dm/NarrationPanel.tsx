'use client';

import { useState } from 'react';
import { useCompletion } from 'ai/react';
import { Volume2, VolumeX } from 'lucide-react';
import { GameContext } from '@/types';

interface NarrationPanelProps {
  gameContext: GameContext;
}

export default function NarrationPanel({ gameContext }: NarrationPanelProps) {
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const { completion, input, handleInputChange, handleSubmit, isLoading } = useCompletion({
    api: '/api/dm/narrate',
    body: { gameContext },
    onFinish: (prompt, completion) => {
      // Auto-play TTS if enabled
      if (ttsEnabled) {
        playNarration(completion);
      }
    },
  });

  const playNarration = async (text: string) => {
    if (!text) return;

    setIsPlaying(true);

    try {
      // Use Web Speech API for free TTS
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9; // Slightly slower for dramatic effect
      utterance.pitch = 0.8; // Deeper voice
      utterance.volume = 1.0;

      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('TTS error:', error);
      setIsPlaying(false);
    }
  };

  const stopNarration = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* DM Narration Display */}
      <div className="fantasy-border parchment-bg p-6 mb-4 min-h-[200px]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            🎙️ Dungeon Master
          </h2>

          {/* TTS Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTtsEnabled(!ttsEnabled)}
              className={`p-2 rounded transition-colors ${
                ttsEnabled
                  ? 'bg-fantasy-magic text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
              title={ttsEnabled ? 'TTS Enabled' : 'TTS Disabled'}
            >
              {ttsEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>

            {isPlaying && (
              <button
                onClick={stopNarration}
                className="px-3 py-1 bg-red-500 text-white rounded text-sm"
              >
                Stop
              </button>
            )}
          </div>
        </div>

        {/* Narration Text */}
        <div className="prose prose-sm max-w-none">
          {completion ? (
            <p className="text-base leading-relaxed whitespace-pre-wrap">
              {completion}
            </p>
          ) : (
            <p className="text-gray-500 italic">
              Waiting for your action...
            </p>
          )}

          {isLoading && (
            <span className="inline-block animate-pulse">▋</span>
          )}
        </div>
      </div>

      {/* Player Input */}
      <form onSubmit={handleSubmit} className="fantasy-border parchment-bg p-4">
        <label className="block text-sm font-bold mb-2">
          What do you do?
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="I attack the werewolf with my dagger..."
            className="flex-1 px-4 py-2 border-2 border-fantasy-brown rounded focus:outline-none focus:ring-2 focus:ring-fantasy-magic"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-6 py-2 bg-fantasy-brown text-fantasy-parchment font-bold rounded hover:bg-fantasy-brown/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Thinking...' : 'Act'}
          </button>
        </div>

        {/* Quick Actions */}
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => handleInputChange({ target: { value: 'I look around carefully' } } as any)}
            className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
          >
            Look Around
          </button>
          <button
            type="button"
            onClick={() => handleInputChange({ target: { value: 'I ready my weapon' } } as any)}
            className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
          >
            Ready Weapon
          </button>
          <button
            type="button"
            onClick={() => handleInputChange({ target: { value: 'I search for traps' } } as any)}
            className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
          >
            Search
          </button>
        </div>
      </form>

      {/* Context Info */}
      <div className="mt-4 text-sm text-gray-600">
        <p>
          <strong>Location:</strong> {gameContext.location}
        </p>
        <p>
          <strong>Session:</strong> {gameContext.campaign.sessionNumber} of{' '}
          {gameContext.campaign.totalSessions}
        </p>
      </div>
    </div>
  );
}
