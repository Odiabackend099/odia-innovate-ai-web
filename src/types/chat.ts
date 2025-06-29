
export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  type: 'text' | 'voice';
  audioUrl?: string;
  timestamp: Date;
  status?: 'sending' | 'sent' | 'delivered' | 'read' | 'failed';
}

export interface SendMessageRequest {
  message: string;
  language: string;
  message_type?: 'text' | 'voice';
  user_id?: string;
}
