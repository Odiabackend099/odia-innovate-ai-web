import { useState, useCallback, useRef, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';

interface VoiceAgentSession {
  id: string;
  agentId: string;
  status: 'active' | 'ended' | 'expired';
  createdAt: string;
}

interface VoiceMessage {
  id: string;
  sessionId: string;
  messageType: 'user' | 'agent';
  content: string;
  timestamp: string;
}

export const useElevenLabsAgent = () => {
  const [session, setSession] = useState<VoiceAgentSession | null>(null);
  const [messages, setMessages] = useState<VoiceMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createSession = useCallback(async (agentId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: functionError } = await supabase.functions.invoke('elevenlabs-agents', {
        body: {
          action: 'create_agent_session',
          data: {
            agentId,
            userId: (await supabase.auth.getUser()).data.user?.id
          }
        }
      });

      if (functionError) throw functionError;

      const newSession: VoiceAgentSession = {
        id: data.sessionId,
        agentId: data.agentId,
        status: 'active',
        createdAt: new Date().toISOString()
      };

      setSession(newSession);
      setIsConnected(true);
      
      return newSession;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getSignedUrl = useCallback(async (agentId: string) => {
    try {
      const { data, error: functionError } = await supabase.functions.invoke('elevenlabs-agents', {
        body: {
          action: 'get_signed_url',
          data: { agentId }
        }
      });

      if (functionError) throw functionError;
      return data.signed_url;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }, []);

  const sendMessage = useCallback(async (content: string, messageType: 'user' | 'agent' = 'user') => {
    if (!session) {
      throw new Error('No active session');
    }

    try {
      const { data, error: functionError } = await supabase.functions.invoke('elevenlabs-agents', {
        body: {
          action: 'process_voice_message',
          data: {
            sessionId: session.id,
            messageType,
            content
          }
        }
      });

      if (functionError) throw functionError;

      const newMessage: VoiceMessage = {
        id: data.messageId,
        sessionId: session.id,
        messageType,
        content,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, newMessage]);
      return newMessage;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }, [session]);

  const endSession = useCallback(async () => {
    if (!session) return;

    try {
      await supabase.functions.invoke('elevenlabs-agents', {
        body: {
          action: 'end_session',
          data: { sessionId: session.id }
        }
      });

      setSession(null);
      setIsConnected(false);
      setMessages([]);
    } catch (err: any) {
      setError(err.message);
    }
  }, [session]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Subscribe to real-time message updates
  useEffect(() => {
    if (!session) return;

    const channel = supabase
      .channel(`voice-session-${session.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'voice_agent_messages',
          filter: `session_id=eq.${session.id}`
        },
        (payload) => {
          const newMessage = payload.new as VoiceMessage;
          setMessages(prev => {
            // Avoid duplicates
            if (prev.some(msg => msg.id === newMessage.id)) {
              return prev;
            }
            return [...prev, newMessage];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [session]);

  return {
    session,
    messages,
    isConnected,
    isLoading,
    error,
    createSession,
    getSignedUrl,
    sendMessage,
    endSession,
    clearError
  };
};