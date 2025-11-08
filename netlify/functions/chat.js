// Fonction Netlify native pour le chat avec Gemini 2.5 Flash Lite
import { julesAI } from '../../src/lib/julesDigitalTwin.js';

export async function handler(event, context) {
  console.log('🚀 Netlify Function called:', event.httpMethod);
  console.log('🌐 Headers:', JSON.stringify(event.headers, null, 2));
  
  // Headers CORS
  const corsHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  // Gestion OPTIONS (CORS)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: ''
    };
  }

  // GET pour debug
  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        message: 'Jules Digital Twin API is running!',
        status: 'operational',
        ai_model: 'gemini-2.5-flash-lite',
        powered_by: 'LangChain + Google Gemini',
        endpoints: {
          chat: 'POST /.netlify/functions/chat',
          debug: 'GET /.netlify/functions/chat'
        },
        sample_request: {
          message: 'Quelles technologies tu maîtrises ?',
          history: []
        },
        knowledge_base: 'Comprehensive Jules profile with skills, projects & personality'
      })
    };
  }

  // POST pour le chat avec Gemini
  if (event.httpMethod === 'POST') {
    try {
      console.log('📨 POST Body:', event.body);
      
      const body = JSON.parse(event.body);
      const { message, history = [] } = body;

      console.log('💬 User message:', message);
      console.log('🔗 History length:', history.length);

      // Détection de langue améliorée
      const lowerMessage = message.toLowerCase();
      
      // Mots-clés français explicites
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

      // Validation
      if (!message || typeof message !== 'string') {
        const errorMessage = language === 'en' 
          ? 'Message is required to continue the conversation.'
          : 'Message requis pour continuer la conversation.';
          
        return {
          statusCode: 400,
          headers: corsHeaders,
          body: JSON.stringify({
            success: false,
            error: 'Message is required',
            message: errorMessage
          })
        };
      }

      // Appel à Gemini via LangChain avec langue détectée
      const startTime = Date.now();
      console.log('🤖 Calling Gemini 2.5 Flash Lite...');
      
      const aiResponse = await julesAI.chat(message, history, language);
      
      const processingTime = Date.now() - startTime;
      console.log(`✅ Gemini response received in ${processingTime}ms:`, aiResponse);

      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({
          success: true,
          message: aiResponse,
          timestamp: new Date().toISOString(),
          metadata: {
            model: 'gemini-2.5-flash-lite',
            powered_by: 'LangChain + Google Gemini',
            processing_time: processingTime,
            tokens: {
              input: message.length,
              output: aiResponse.length
            }
          }
        })
      };

    } catch (error) {
      console.error('❌ Gemini Function Error:', error);
      console.error('❌ Error details:', error.message, error.stack);
      
      const errorMessage = language === 'en'
        ? 'Sorry, I\'m experiencing a technical issue. Can you rephrase your question?'
        : 'Désolé, je rencontre un problème technique. Peux-tu reformuler ta question ?';
        
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({
          success: false,
          error: 'Internal server error',
          message: errorMessage,
          debug: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
      };
    }
  }

  // Méthode non supportée
  return {
    statusCode: 405,
    headers: corsHeaders,
    body: JSON.stringify({
      error: 'Method not allowed'
    })
  };
}