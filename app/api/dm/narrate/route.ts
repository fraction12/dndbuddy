import { NextRequest } from 'next/server';
import { getDMNarration } from '@/lib/ai/chatgpt';
import { GameContext } from '@/types';
import { OpenAIStream, StreamingTextResponse } from 'ai';

export const runtime = 'edge';

/**
 * POST /api/dm/narrate
 * Get DM narration based on player action
 */
export async function POST(req: NextRequest) {
  try {
    const { gameContext, playerAction } = await req.json() as {
      gameContext: GameContext;
      playerAction: string;
    };

    // Validate input
    if (!playerAction) {
      return new Response('Player action is required', { status: 400 });
    }

    // Get streaming response from ChatGPT
    const stream = await getDMNarration(gameContext, playerAction);

    // Convert OpenAI stream to Vercel AI SDK stream
    const aiStream = OpenAIStream(stream);

    // Return streaming response
    return new StreamingTextResponse(aiStream);

  } catch (error) {
    console.error('DM narration error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to get DM narration' }),
      { status: 500 }
    );
  }
}
