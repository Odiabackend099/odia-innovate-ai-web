
import { ApiRequest, ApiResponse } from '../types/api';

const WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || 'https://n8n.yourdomain.com/webhook/odiaaa-agent';

export async function sendMessage(request: ApiRequest): Promise<ApiResponse> {
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: request.message,
        language: request.language,
        message_type: request.message_type,
        user_id: request.user_id || 'anonymous',
        session_id: request.session_id,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    return {
      reply: data.reply || 'Sorry, I could not process your request at the moment.',
      audio_url: data.audio_url,
      language: data.language || request.language,
      session_id: data.session_id || request.session_id,
    };
  } catch (error) {
    console.error('API request error:', error);
    
    // Fallback response for development/demo
    return {
      reply: getDemoResponse(request.message, request.language),
      language: request.language,
      session_id: request.session_id,
    };
  }
}

// Demo responses for development
function getDemoResponse(message: string, language: string): string {
  const responses = {
    en: [
      "Hello! I'm ODIAAA, your AI assistant for Africa. How can I help you today?",
      "That's interesting! Let me help you with that.",
      "I understand. Here's what I think about your question...",
      "Thank you for sharing that with me. I'm here to assist you.",
    ],
    pcm: [
      "How far! I be ODIAAA, your AI assistant wey dey help Africans. Wetin I fit do for you?",
      "Na true talk be that! Make I help you solve am.",
      "I understand wetin you talk. This na wetin I think...",
    ],
    yo: [
      "Bawo! Mo n je ODIAAA, oluranlowo AI ti o wa fun awon ara Afrika. Bawo ni mo se le ran e lowo?",
      "O dara! Je ki n ran e lowo pelu eyi.",
      "Mo ye mi. Eyi ni ohun ti mo ro nipa ibeere yin...",
    ],
    ig: [
      "Ndewo! Abụ m ODIAAA, onye inyeaka AI maka ndị Africa. Kedu ka m ga-esi nyere gị aka?",
      "Nke ahụ dị mma! Ka m nyere gị aka na nke ahụ.",
      "Aghọtara m. Nke a bụ ihe m chere banyere ajụjụ gị...",
    ],
    ha: [
      "Sannu! Ni ne ODIAAA, mataimakinka na AI don Afirka. Yaya zan iya taimaka maka?",
      "Wannan yana da kyau! Bari in taimaka maka wannan.",
      "Na fahimta. Ga abin da nake tunani game da tambayar ku...",
    ],
  };

  const languageResponses = responses[language as keyof typeof responses] || responses.en;
  return languageResponses[Math.floor(Math.random() * languageResponses.length)];
}
