/**
 * API Route - Chat avec le jumeau numérique de Jules
 * Endpoint: POST /api/chat
 */

import type { APIRoute } from 'astro';

// Force le rendu côté serveur pour cette API
export const prerender = false;

// Mock responses directement dans l'API
const mockResponses = {
  technologies: "Je maîtrise JavaScript, TypeScript, React, Node.js, Astro, Tailwind CSS, HTML5, CSS3, Git, MySQL, APIs REST, Next.js, Vue.js. Mon expertise se concentre particulièrement sur le développement web moderne.",
  projects: "Actuellement, je travaille sur plusieurs projets passionnants. KodeME est une plateforme de code participatif au tour par tour que je développe avec Astro. J'ai aussi créé le site web mcboutin.fr pour une cliente.",
  default: "Je peux vous parler de mes compétences techniques, mes projets, ou mon expérience. Que souhaitez-vous savoir ?"
};

function getResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('techno') || lowerMessage.includes('compétence') || lowerMessage.includes('langage')) {
    return mockResponses.technologies;
  }
  
  if (lowerMessage.includes('projet') || lowerMessage.includes('réalisation')) {
    return mockResponses.projects;
  }
  
  return mockResponses.default;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    // Vérification du Content-Type
    if (!request.headers.get('content-type')?.includes('application/json')) {
      return new Response(JSON.stringify({ 
        error: 'Content-Type must be application/json' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Parse du body
    const body = await request.json();
    const { message, history = [] } = body;

    // Validation des données
    if (!message || typeof message !== 'string') {
      return new Response(JSON.stringify({ 
        error: 'Message is required and must be a string' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!Array.isArray(history)) {
      return new Response(JSON.stringify({ 
        error: 'History must be an array' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Traitement avec l'IA mock
    console.log(`[Chat] User message: ${message}`);
    
    const aiResponse = getResponse(message);
    
    console.log(`[Chat] AI response: ${aiResponse}`);

    // Réponse structurée
    return new Response(JSON.stringify({
      success: true,
      message: aiResponse,
      timestamp: new Date().toISOString(),
      metadata: {
        model: 'jules-mock-ai-v1',
        tokens: message.length + aiResponse.length, // Simulation
        processing_time: Math.random() * 500 + 200 // 200-700ms simulé
      }
    }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Pour les tests locaux
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });

  } catch (error) {
    console.error('[Chat API Error]:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Internal server error',
      message: 'Désolé, je rencontre un problème technique. Pouvez-vous réessayer ?'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// Gestion des requêtes OPTIONS pour CORS
export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
};

// Endpoint de debug pour tester l'API
export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({
    message: 'Chat API is running!',
    status: 'operational',
    ai_model: 'jules-mock-ai-v1',
    endpoints: {
      chat: 'POST /api/chat',
      debug: 'GET /api/chat'
    },
    sample_request: {
      message: 'Quelles technologies tu maîtrises ?',
      history: []
    },
    available_responses: {
      technologies: "Triggered by: techno, compétence, langage",
      projects: "Triggered by: projet, réalisation",
      default: "Fallback response"
    }
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};