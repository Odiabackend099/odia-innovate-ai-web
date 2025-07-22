-- Create voice agent sessions table
CREATE TABLE public.voice_agent_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  agent_id TEXT NOT NULL,
  user_id UUID,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ended_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Create voice agent messages table
CREATE TABLE public.voice_agent_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.voice_agent_sessions(id) ON DELETE CASCADE,
  message_type TEXT NOT NULL, -- 'user' or 'agent'
  content TEXT,
  audio_data TEXT, -- base64 encoded audio
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Create indexes for performance
CREATE INDEX idx_voice_agent_sessions_agent_id ON public.voice_agent_sessions(agent_id);
CREATE INDEX idx_voice_agent_sessions_user_id ON public.voice_agent_sessions(user_id);
CREATE INDEX idx_voice_agent_sessions_status ON public.voice_agent_sessions(status);
CREATE INDEX idx_voice_agent_messages_session_id ON public.voice_agent_messages(session_id);
CREATE INDEX idx_voice_agent_messages_timestamp ON public.voice_agent_messages(timestamp);

-- Enable Row Level Security
ALTER TABLE public.voice_agent_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.voice_agent_messages ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for voice_agent_sessions
CREATE POLICY "Users can view their own sessions" 
ON public.voice_agent_sessions 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own sessions" 
ON public.voice_agent_sessions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own sessions" 
ON public.voice_agent_sessions 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create RLS policies for voice_agent_messages
CREATE POLICY "Users can view messages from their sessions" 
ON public.voice_agent_messages 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.voice_agent_sessions 
  WHERE id = session_id AND user_id = auth.uid()
));

CREATE POLICY "Users can create messages in their sessions" 
ON public.voice_agent_messages 
FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM public.voice_agent_sessions 
  WHERE id = session_id AND user_id = auth.uid()
));

-- Create function to clean up old sessions
CREATE OR REPLACE FUNCTION public.cleanup_old_voice_sessions()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Delete sessions older than 24 hours that are not ended
  UPDATE public.voice_agent_sessions 
  SET status = 'expired', ended_at = now()
  WHERE created_at < now() - INTERVAL '24 hours' 
  AND status = 'active';
  
  -- Delete very old sessions and their messages (older than 7 days)
  DELETE FROM public.voice_agent_sessions 
  WHERE created_at < now() - INTERVAL '7 days';
END;
$$;