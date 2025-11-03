// Fonction Netlify native pour le chat
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
        message: 'Chat API is running via Netlify Function!',
        status: 'operational',
        ai_model: 'jules-mock-ai-v1',
        endpoints: {
          chat: 'POST /.netlify/functions/chat',
          debug: 'GET /.netlify/functions/chat'
        },
        sample_request: {
          message: 'Quelles technologies tu maîtrises ?',
          history: []
        },
        available_responses: {
          technologies: 'Triggered by: techno, compétence, langage',
          projects: 'Triggered by: projet, réalisation',
          default: 'Fallback response'
        }
      })
    };
  }

  // POST pour le chat
  if (event.httpMethod === 'POST') {
    try {
      console.log('📨 POST Body:', event.body);
      
      const body = JSON.parse(event.body);
      const { message, history = [] } = body;

      console.log('💬 User message:', message);

      // Mock responses
      const mockResponses = {
        technologies: "Je maîtrise JavaScript, TypeScript, React, Node.js, Astro, Tailwind CSS, HTML5, CSS3, Git, MySQL, APIs REST, Next.js, Vue.js. Mon expertise se concentre particulièrement sur le développement web moderne.",
        projects: "Actuellement, je travaille sur plusieurs projets passionnants. KodeME est une plateforme de code participatif au tour par tour que je développe avec Astro. J'ai aussi créé le site web mcboutin.fr pour une cliente.",
        default: "Je peux vous parler de mes compétences techniques, mes projets, ou mon expérience. Que souhaitez-vous savoir ?"
      };

      function getResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('techno') || lowerMessage.includes('compétence') || lowerMessage.includes('langage')) {
          return mockResponses.technologies;
        }
        
        if (lowerMessage.includes('projet') || lowerMessage.includes('réalisation')) {
          return mockResponses.projects;
        }
        
        return mockResponses.default;
      }

      const aiResponse = getResponse(message);
      console.log('🤖 AI Response:', aiResponse);

      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({
          success: true,
          message: aiResponse,
          timestamp: new Date().toISOString(),
          metadata: {
            model: 'jules-mock-ai-v1',
            tokens: message.length + aiResponse.length,
            processing_time: Math.random() * 500 + 200
          }
        })
      };

    } catch (error) {
      console.error('❌ Function Error:', error);
      
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({
          success: false,
          error: 'Internal server error',
          message: 'Désolé, je rencontre un problème technique. Pouvez-vous réessayer ?'
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