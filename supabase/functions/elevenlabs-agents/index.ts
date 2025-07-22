import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, data } = await req.json();
    
    switch (action) {
      case 'create_agent_session':
        return await createAgentSession(data);
      case 'get_signed_url':
        return await getSignedUrl(data);
      case 'process_voice_message':
        return await processVoiceMessage(data);
      case 'end_session':
        return await endSession(data);
      default:
        throw new Error('Invalid action');
    }
  } catch (error) {
    console.error('Error in elevenlabs-agents function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

async function createAgentSession(data: any): Promise<Response> {
  const { agentId, userId } = data;
  
  // Initialize Supabase client
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );

  // Create session record
  const { data: session, error } = await supabase
    .from('voice_agent_sessions')
    .insert({
      agent_id: agentId,
      user_id: userId,
      status: 'active',
      created_at: new Date().toISOString()
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create session: ${error.message}`);
  }

  return new Response(
    JSON.stringify({ 
      sessionId: session.id,
      agentId,
      status: 'created'
    }),
    { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    }
  );
}

async function getSignedUrl(data: any): Promise<Response> {
  const { agentId } = data;
  const elevenLabsApiKey = Deno.env.get('ELEVENLABS_API_KEY');

  if (!elevenLabsApiKey) {
    throw new Error('ElevenLabs API key not configured');
  }

  // Map agent IDs to actual ElevenLabs agent IDs
  const agentMapping: Record<string, string> = {
    'agent-lexi': 'your-actual-lexi-agent-id',
    'agent-atlas': 'your-actual-atlas-agent-id', 
    'agent-nova': 'your-actual-nova-agent-id'
  };

  const actualAgentId = agentMapping[agentId] || agentId;

  // Get signed URL from ElevenLabs
  const response = await fetch(
    `https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${actualAgentId}`,
    {
      method: 'GET',
      headers: {
        'xi-api-key': elevenLabsApiKey,
      },
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`ElevenLabs API error: ${error}`);
  }

  const result = await response.json();

  return new Response(
    JSON.stringify(result),
    { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    }
  );
}

async function processVoiceMessage(data: any): Promise<Response> {
  const { sessionId, messageType, content, audioData } = data;
  
  // Initialize Supabase client
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );

  // Store voice message
  const { data: message, error } = await supabase
    .from('voice_agent_messages')
    .insert({
      session_id: sessionId,
      message_type: messageType,
      content: content,
      audio_data: audioData,
      timestamp: new Date().toISOString()
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to store message: ${error.message}`);
  }

  return new Response(
    JSON.stringify({ 
      messageId: message.id,
      status: 'processed'
    }),
    { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    }
  );
}

async function endSession(data: any): Promise<Response> {
  const { sessionId } = data;
  
  // Initialize Supabase client
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );

  // Update session status
  const { error } = await supabase
    .from('voice_agent_sessions')
    .update({ 
      status: 'ended',
      ended_at: new Date().toISOString()
    })
    .eq('id', sessionId);

  if (error) {
    throw new Error(`Failed to end session: ${error.message}`);
  }

  return new Response(
    JSON.stringify({ 
      sessionId,
      status: 'ended'
    }),
    { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    }
  );
}