
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const elevenLabsApiKey = Deno.env.get('ELEVENLABS_API_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, data } = await req.json();

    switch (action) {
      case 'create_conversation':
        return await createConversation(data);
      case 'send_message':
        return await sendMessage(data);
      case 'get_signed_url':
        return await getSignedUrl(data);
      case 'process_audio':
        return await processAudio(data);
      default:
        throw new Error('Invalid action');
    }
  } catch (error) {
    console.error('ElevenLabs Voice Chat Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

async function createConversation(data: any) {
  const { userId, sessionId } = data;
  
  // Create conversation record
  const { data: conversation, error } = await supabase
    .from('voice_conversations')
    .insert({
      user_id: userId,
      session_id: sessionId,
      status: 'active',
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create conversation: ${error.message}`);
  }

  return new Response(
    JSON.stringify({ conversation }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function getSignedUrl(data: any) {
  const { agentId = 'UgBBYS2sOqTuMpoF3BR0' } = data;
  
  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${agentId}`,
      {
        method: 'GET',
        headers: {
          'xi-api-key': elevenLabsApiKey,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`ElevenLabs API error: ${response.status}`);
    }

    const result = await response.json();
    
    return new Response(
      JSON.stringify({ signedUrl: result.signed_url }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    throw new Error(`Failed to get signed URL: ${error.message}`);
  }
}

async function sendMessage(data: any) {
  const { conversationId, message, messageType = 'text' } = data;
  
  // Store message in database
  const { data: messageRecord, error } = await supabase
    .from('voice_messages')
    .insert({
      conversation_id: conversationId,
      content: message,
      message_type: messageType,
      sender: 'user',
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to store message: ${error.message}`);
  }

  return new Response(
    JSON.stringify({ message: messageRecord }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function processAudio(data: any) {
  const { audioData, conversationId, language = 'en' } = data;
  
  try {
    // Convert base64 audio to binary
    const binaryAudio = Uint8Array.from(atob(audioData), c => c.charCodeAt(0));
    
    // Create form data for Whisper API
    const formData = new FormData();
    const blob = new Blob([binaryAudio], { type: 'audio/webm' });
    formData.append('file', blob, 'audio.webm');
    formData.append('model', 'whisper-1');
    formData.append('language', language);

    // Transcribe audio using OpenAI Whisper
    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Whisper API error: ${response.status}`);
    }

    const result = await response.json();
    
    // Store transcription
    await supabase
      .from('voice_messages')
      .insert({
        conversation_id: conversationId,
        content: result.text,
        message_type: 'voice',
        sender: 'user',
        transcription: result.text,
        created_at: new Date().toISOString(),
      });

    return new Response(
      JSON.stringify({ transcription: result.text }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    throw new Error(`Failed to process audio: ${error.message}`);
  }
}
