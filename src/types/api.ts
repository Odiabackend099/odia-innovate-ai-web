
export interface ApiRequest {
  message: string;
  language: string;
  message_type: 'text' | 'voice';
  user_id?: string;
  session_id: string;
}

export interface ApiResponse {
  reply: string;
  audio_url?: string;
  language: string;
  session_id: string;
}
