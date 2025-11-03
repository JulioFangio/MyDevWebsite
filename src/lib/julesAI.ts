/**
 * Mock AI Service - Jumeau Numérique de Jules Duval
 * Simule un LLM avec des réponses pré-définies pour tester LangChain
 */

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export class JulesMockAI {
  private knowledge = {
    // Profil général
    name: "Jules Duval-Giard",
    role: "Développeur Logiciel & Web",
    location: "France",
    
    // Technologies maîtrisées
    technologies: [
      "JavaScript", "TypeScript", "React", "Node.js", 
      "Astro", "Tailwind CSS", "HTML5", "CSS3", 
      "Git", "MySQL", "APIs REST", "Next.js", "Vue.js"
    ],
    
    // Projets
    projects: [
      {
        name: "KodeME",
        description: "Plateforme de code participatif au tour par tour",
        status: "En développement",
        technologies: ["Astro", "Tailwind CSS", "JavaScript", "APIs"]
      },
      {
        name: "Site Web Cliente (mcboutin.fr)",
        description: "Site web moderne et responsive pour une cliente",
        status: "En ligne",
        technologies: ["Astro", "Tailwind CSS", "JavaScript", "APIs"]
      }
    ],
    
    // Valeurs & philosophie
    values: [
      "Code propre et maintenable",
      "Performance et accessibilité", 
      "Veille technologique constante",
      "Travail d'équipe et communication",
      "Conception centrée utilisateur"
    ],
    
    // Personnalité
    personality: {
      style: "passionné par l'innovation technologique",
      approach: "combinaison d'innovation technique, développement durable et collaboration",
      mindset: "toujours en quête d'apprentissage et d'amélioration"
    }
  };

  private responses = {
    greeting: [
      "Salut ! Je suis le jumeau numérique de Jules. Comment puis-je vous aider ?",
      "Bonjour ! Je représente Jules Duval-Giard. Que souhaitez-vous savoir ?",
      "Hello ! Je suis là pour répondre à vos questions sur Jules et son parcours !"
    ],
    
    technologies: [
      `Je maîtrise plusieurs technologies : ${this.knowledge.technologies.join(', ')}. Mon expertise se concentre particulièrement sur le développement web moderne avec JavaScript, React, et Astro.`,
      `Mes compétences techniques incluent ${this.knowledge.technologies.slice(0, 6).join(', ')} et bien d'autres. Je suis passionné par les technologies émergentes !`
    ],
    
    projects: [
      `Actuellement, je travaille sur plusieurs projets passionnants. KodeME est une plateforme de code participatif au tour par tour que je développe avec Astro. J'ai aussi créé le site web mcboutin.fr pour une cliente.`,
      `Mes projets principaux incluent KodeME (en développement) et le site mcboutin.fr (en ligne). Chaque projet me permet d'explorer de nouvelles technologies !`
    ],
    
    experience: [
      `Je suis développeur logiciel & web, passionné par l'innovation technologique. Mon approche combine innovation technique, développement durable et collaboration.`,
      `Mon expérience se concentre sur la création d'expériences numériques modernes et performantes. Je privilégie le code propre et la conception centrée utilisateur.`
    ],
    
    values: [
      `Mes valeurs principales sont : ${this.knowledge.values.join(', ')}. Je crois en un développement responsable et collaboratif.`,
      `Ce qui me motive : l'innovation technique, le développement durable, et le travail d'équipe. Je suis toujours en quête d'amélioration continue.`
    ],
    
    default: [
      "C'est une question intéressante ! Pouvez-vous être plus précis ?",
      "Je ne suis pas sûr de comprendre. Voulez-vous en savoir plus sur mes compétences, mes projets ou mon parcours ?",
      "Hmm, pouvez-vous reformuler ? Je peux vous parler de mes technologies, projets, ou expériences !"
    ]
  };

  /**
   * Analyse une question et retourne une réponse appropriée
   */
  public async chat(message: string, history: ChatMessage[] = []): Promise<string> {
    const lowerMessage = message.toLowerCase();
    
    // Détection de l'intention
    if (this.isGreeting(lowerMessage)) {
      return this.getRandomResponse('greeting');
    }
    
    if (this.isTechnologyQuestion(lowerMessage)) {
      return this.getRandomResponse('technologies');
    }
    
    if (this.isProjectQuestion(lowerMessage)) {
      return this.getRandomResponse('projects');
    }
    
    if (this.isExperienceQuestion(lowerMessage)) {
      return this.getRandomResponse('experience');
    }
    
    if (this.isValuesQuestion(lowerMessage)) {
      return this.getRandomResponse('values');
    }
    
    return this.getRandomResponse('default');
  }

  private isGreeting(message: string): boolean {
    const greetings = ['salut', 'bonjour', 'hello', 'hi', 'hey', 'bonsoir'];
    return greetings.some(greeting => message.includes(greeting));
  }

  private isTechnologyQuestion(message: string): boolean {
    const techKeywords = ['technos', 'technologies', 'compétences', 'langages', 'outils', 'stack', 'javascript', 'react', 'astro'];
    return techKeywords.some(keyword => message.includes(keyword));
  }

  private isProjectQuestion(message: string): boolean {
    const projectKeywords = ['projets', 'réalisations', 'kodeme', 'mcboutin', 'portfolio', 'travaux'];
    return projectKeywords.some(keyword => message.includes(keyword));
  }

  private isExperienceQuestion(message: string): boolean {
    const expKeywords = ['expérience', 'parcours', 'cv', 'travail', 'métier', 'développeur'];
    return expKeywords.some(keyword => message.includes(keyword));
  }

  private isValuesQuestion(message: string): boolean {
    const valueKeywords = ['valeurs', 'philosophie', 'approche', 'motivation', 'pourquoi'];
    return valueKeywords.some(keyword => message.includes(keyword));
  }

  private getRandomResponse(category: keyof typeof this.responses): string {
    const responses = this.responses[category];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  /**
   * Retourne des informations structurées pour debug
   */
  public getKnowledge() {
    return this.knowledge;
  }
}

// Export de l'instance singleton
export const julesAI = new JulesMockAI();