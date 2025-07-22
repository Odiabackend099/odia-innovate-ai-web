import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    const { text, voice_id = "female-shaonv" } = await req.json();

    if (!text) {
      return new Response(
        JSON.stringify({ error: 'Text is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const minimaxApiKey = Deno.env.get('MINIMAX_API_KEY');
    const minimaxGroupId = Deno.env.get('MINIMAX_GROUP_ID');

    if (!minimaxApiKey || !minimaxGroupId) {
      return new Response(
        JSON.stringify({ error: 'MiniMax API credentials not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Generating speech with MiniMax TTS for text:', text.substring(0, 50) + '...');

    const response = await fetch(`https://api.minimax.chat/v1/text_to_speech?GroupId=${minimaxGroupId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${minimaxApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        voice_id: voice_id,
        text: text,
        model: "speech-01",
        speed: 1.0,
        vol: 1.0,
        pitch: 0,
        audio_sample_rate: 24000,
        bitrate: 128000,
        format: "mp3"
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('MiniMax API error:', errorText);
      return new Response(
        JSON.stringify({ error: `MiniMax API error: ${response.status}` }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const result = await response.json();
    
    if (result.base_resp?.status_code !== 0) {
      console.error('MiniMax API returned error:', result.base_resp);
      return new Response(
        JSON.stringify({ error: 'MiniMax API returned an error' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ 
        audioUrl: result.audio_file,
        text: text 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in minimax-tts function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});