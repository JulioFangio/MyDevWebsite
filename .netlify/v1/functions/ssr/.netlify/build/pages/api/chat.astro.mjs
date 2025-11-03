export { renderers } from '../../renderers.mjs';

const prerender = false;
const mockResponses = {
  technologies: "Je maîtrise JavaScript, TypeScript, React, Node.js, Astro, Tailwind CSS, HTML5, CSS3, Git, MySQL, APIs REST, Next.js, Vue.js. Mon expertise se concentre particulièrement sur le développement web moderne.",
  projects: "Actuellement, je travaille sur plusieurs projets passionnants. KodeME est une plateforme de code participatif au tour par tour que je développe avec Astro. J'ai aussi créé le site web mcboutin.fr pour une cliente.",
  default: "Je peux vous parler de mes compétences techniques, mes projets, ou mon expérience. Que souhaitez-vous savoir ?"
};
function getResponse(message) {
  const lowerMessage = message.toLowerCase();
  if (lowerMessage.includes("techno") || lowerMessage.includes("compétence") || lowerMessage.includes("langage")) {
    return mockResponses.technologies;
  }
  if (lowerMessage.includes("projet") || lowerMessage.includes("réalisation")) {
    return mockResponses.projects;
  }
  return mockResponses.default;
}
const POST = async ({ request }) => {
  try {
    if (!request.headers.get("content-type")?.includes("application/json")) {
      return new Response(JSON.stringify({
        error: "Content-Type must be application/json"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const body = await request.json();
    const { message, history = [] } = body;
    if (!message || typeof message !== "string") {
      return new Response(JSON.stringify({
        error: "Message is required and must be a string"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    if (!Array.isArray(history)) {
      return new Response(JSON.stringify({
        error: "History must be an array"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    console.log(`[Chat] User message: ${message}`);
    const aiResponse = getResponse(message);
    console.log(`[Chat] AI response: ${aiResponse}`);
    return new Response(JSON.stringify({
      success: true,
      message: aiResponse,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      metadata: {
        model: "jules-mock-ai-v1",
        tokens: message.length + aiResponse.length,
        // Simulation
        processing_time: Math.random() * 500 + 200
        // 200-700ms simulé
      }
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        // Pour les tests locaux
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type"
      }
    });
  } catch (error) {
    console.error("[Chat API Error]:", error);
    return new Response(JSON.stringify({
      success: false,
      error: "Internal server error",
      message: "Désolé, je rencontre un problème technique. Pouvez-vous réessayer ?"
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
const OPTIONS = async () => {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
};
const GET = async () => {
  return new Response(JSON.stringify({
    message: "Chat API is running!",
    status: "operational",
    ai_model: "jules-mock-ai-v1",
    endpoints: {
      chat: "POST /api/chat",
      debug: "GET /api/chat"
    },
    sample_request: {
      message: "Quelles technologies tu maîtrises ?",
      history: []
    },
    available_responses: {
      technologies: "Triggered by: techno, compétence, langage",
      projects: "Triggered by: projet, réalisation",
      default: "Fallback response"
    }
  }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  OPTIONS,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
