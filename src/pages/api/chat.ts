/**
 * 🤖 API Route - Chat avec Gemini 2.5 Flash Lite
 * Endpoint: POST /api/chat
 */

import type { APIRoute } from 'astro';
import { julesAI } from '../../lib/julesDigitalTwin.js';

// Force le rendu côté serveur pour cette API
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  // Headers CORS pour Netlify
  const corsHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  try {
    // Log pour debug Netlify
    console.log('[Netlify] API Chat called');
    console.log('[Netlify] Request method:', request.method);
    console.log('[Netlify] Content-Type:', request.headers.get('content-type'));

    // Vérification du Content-Type (plus permissive pour Netlify)
    const contentType = request.headers.get('content-type');
    if (contentType && !contentType.includes('application/json')) {
      return new Response(JSON.stringify({ 
        error: 'Content-Type must be application/json' 
      }), {
        status: 400,
        headers: corsHeaders
      });
    }

    // Parse du body avec gestion d'erreur Netlify
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error('[Netlify] JSON Parse Error:', parseError);
      return new Response(JSON.stringify({ 
        error: 'Invalid JSON format',
        message: 'Désolé, je rencontre un problème technique. Pouvez-vous réessayer ?'
      }), {
        status: 400,
        headers: corsHeaders
      });
    }

    const { message, history = [] } = body;
    console.log('[Netlify] Parsed message:', message);

    // Validation des données
    if (!message || typeof message !== 'string') {
      return new Response(JSON.stringify({ 
        error: 'Message is required and must be a string',
        message: 'Désolé, je rencontre un problème technique. Pouvez-vous réessayer ?'
      }), {
        status: 400,
        headers: corsHeaders
      });
    }

    if (!Array.isArray(history)) {
      return new Response(JSON.stringify({ 
        error: 'History must be an array',
        message: 'Désolé, je rencontre un problème technique. Pouvez-vous réessayer ?'
      }), {
        status: 400,
        headers: corsHeaders
      });
    }

    // Détection de langue améliorée
    const lowerMessage = message.toLowerCase();
    
    // Mots-clés français explicites (ajout de "est" pour "qui est tu")
    const frenchKeywords = ['qui', 'tu', 'es', 'est', 'sont', 'quoi', 'comment', 'pourquoi', 'où', 'quand', 
                           'je', 'me', 'mon', 'ma', 'mes', 'le', 'la', 'les', 'de', 'du', 'des', 
                           'salut', 'bonjour', 'merci', 'oui', 'non', 'avec', 'sans', 'pour', 'sur',
                           'toi', 'tes', 'ton', 'ta', 'dans', 'sur', 'sous'];
    
    // Mots-clés anglais explicites  
    const englishKeywords = ['what', 'how', 'who', 'where', 'when', 'why', 'hello', 'hi', 'thank', 'yes', 'no',
                            'the', 'and', 'or', 'but', 'with', 'without', 'for', 'about', 'can', 'will'];
    
    // Caractères français
    const hasFrenchChars = /[àáâäèéêëìíîïòóôöùúûüÿç]/.test(lowerMessage);
    
    // Compter les mots-clés
    const frenchScore = frenchKeywords.filter(word => lowerMessage.includes(word)).length;
    const englishScore = englishKeywords.filter(word => lowerMessage.includes(word)).length;
    
    // Logique de détection améliorée
    const isEnglish = !hasFrenchChars && 
                     (englishScore > frenchScore || 
                      (englishScore > 0 && frenchScore === 0));
    
    const language = isEnglish ? 'en' : 'fr';
    console.log('🌍 Detected language:', language, `(FR: ${frenchScore}, EN: ${englishScore}, French chars: ${hasFrenchChars})`);

    // Appel à Gemini 2.5 Flash Lite via LangChain
    console.log(`🤖 Calling Gemini with message: ${message}`);
    const startTime = Date.now();
    
    const aiResponse = await julesAI.chat(message, history, language);
    
    const processingTime = Date.now() - startTime;
    console.log(`✅ Gemini response received in ${processingTime}ms:`, aiResponse);

    // Réponse structurée avec Gemini
    return new Response(JSON.stringify({
      success: true,
      message: aiResponse,
      timestamp: new Date().toISOString(),
      metadata: {
        model: 'gemini-2.5-flash-lite',
        powered_by: 'LangChain + Google Gemini',
        processing_time: processingTime,
        language_detected: language,
        tokens: {
          input: message.length,
          output: aiResponse.length
        }
      }
    }), {
      status: 200,
      headers: corsHeaders
    });

  } catch (error) {
    console.error('[Netlify API Error]:', error);
    console.error('[Netlify API Error Stack]:', error instanceof Error ? error.stack : 'No stack trace');
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Internal server error',
      message: 'Désolé, je rencontre un problème technique. Pouvez-vous réessayer ?'
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
};

// Gestion des requêtes OPTIONS pour CORS
export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    }
  });
};

// Endpoint de debug pour tester l'API
export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({
    message: 'Jules Digital Twin API is running!',
    status: 'operational',
    ai_model: 'gemini-2.5-flash-lite',
    powered_by: 'LangChain + Google Gemini',
    optimization: '4-section intelligent loading',
    endpoints: {
      chat: 'POST /api/chat',
      debug: 'GET /api/chat'
    },
    sample_request: {
      message: 'Quelles technologies tu maîtrises ?',
      history: []
    },
    features: [
      'Multilingual support (FR/EN)',
      'Intelligent section loading',
      'Token optimization (20-70% savings)',
      'Comprehensive knowledge base'
    ]
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};