/**
 * Service IA - Jumeau numérique de Jules
 * Utilise LangChain avec Gemini 2.5 Flash et une base de connaissances JSON
 */

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
import julesKnowledge from '../data/jules-knowledge.json';

/**
 * 🔑 Configuration sécurisée de la clé API Google
 */
function getGoogleApiKey(): string {
  // Variables d'environnement pour production
  const apiKey = process.env.GOOGLE_API_KEY || 
                 process.env.GOOGLE_AI_API_KEY;
  
  if (!apiKey) {
    console.error('🚨 Google API Key not found in environment variables');
    console.log('🔍 Available env vars:', Object.keys(process.env).filter(key => key.includes('GOOGLE')));
    throw new Error('Google API Key is required. Please set GOOGLE_API_KEY in Netlify environment variables');
  }
  
  console.log('✅ Google API Key found:', apiKey.substring(0, 10) + '...');
  return apiKey;
}

/**
 * Configuration du modèle Gemini 2.5 Flash Lite
 */
let model: ChatGoogleGenerativeAI;

function initializeModel() {
  if (!model) {
    try {
      const apiKey = getGoogleApiKey();
      model = new ChatGoogleGenerativeAI({
        model: "gemini-2.5-flash-lite",
        temperature: 0.7,
        maxOutputTokens: 500,
        apiKey: apiKey
      });
      console.log('✅ Gemini 2.5 Flash Lite initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize Gemini model:', error);
      throw error;
    }
  }
  return model;
}

/**
 * 🎯 Template de prompt système optimisé pour les 4 GRANDES SECTIONS
 */
const systemPromptTemplate = PromptTemplate.fromTemplate(`
Tu es Jules, un développeur web passionné de 30 ans. Tu réponds comme si tu étais Jules lui-même, en première personne.

## 📋 MON PROFIL COMPLET :
{profil}

## 🛠️ MES TECHNOLOGIES :
{technologies}

## 🚀 MES PROJETS & EXPÉRIENCE :
{projets_experience}

## 🎓 MA FORMATION & ACTIVITÉS :
{formation_activites}

## Instructions importantes :
- Réponds dans la langue demandée : {language}
- Si la langue est "en", réponds en anglais. Si "fr", réponds en français
- Sois naturel et authentique, comme si tu parlais en personne
- Utilise "je/I", "mon/my", "mes/my" car tu ES Jules
- Reste humble mais confiant
- N'hésite pas à partager des détails techniques si demandé
- Si on te demande quelque chose que tu ne sais pas, dis-le honnêtement
- Utilise les informations fournies ci-dessus selon leur pertinence à la question

## Message utilisateur :
{question}

## Ta réponse (comme Jules) :
`);

/**
 * 🎯 Mots-clés pour identifier les 4 GRANDES SECTIONS pertinentes (FR/EN)
 */
const SECTION_KEYWORDS = {
  // 📋 PROFIL ÉLARGI (profile + contact + langues + personality + values + goals + soft_skills + outdoor_activities)
  profil: [
    // Français - Identité & Profil
    'qui', 'tu es', 'toi', 'présente', 'présentation', 'profil', 'personne', 'personnalité', 'caractère',
    'nom', 'âge', 'localisation', 'ville', 'pays basque', 'saint jean de luz', 'passion', 'valeurs',
    // Français - Contact & Communication  
    'contact', 'téléphone', 'email', 'linkedin', 'entreprise', 'société', 'compagnie', 'freelance',
    // Français - Langues & Soft Skills
    'langue', 'langues', 'anglais', 'espagnol', 'français', 'communication', 'soft skills', 'qualités',
    'autonome', 'organisé', 'adaptable', 'polyvalent', 'équipe', 'collaboration',
    // Français - Objectifs & Activités
    'objectif', 'objectifs', 'but', 'buts', 'ambition', 'futur', 'sport', 'loisir', 'loisirs', 
    'surf', 'randonnée', 'voyage', 'voyages', 'culture', 'hobbies', 'activités', 'plein air',
    
    // Anglais - Identity & Profile
    'who', 'you are', 'about', 'profile', 'introduce', 'introduction', 'person', 'personality', 'character',
    'name', 'age', 'location', 'city', 'basque', 'passion', 'values', 'traits',
    // Anglais - Contact & Communication
    'contact', 'phone', 'email', 'company', 'business', 'freelance',
    // Anglais - Languages & Soft Skills  
    'language', 'languages', 'english', 'spanish', 'french', 'communication', 'soft skills', 'qualities',
    'autonomous', 'organized', 'adaptable', 'versatile', 'team', 'collaboration',
    // Anglais - Goals & Activities
    'goal', 'goals', 'objective', 'objectives', 'ambition', 'future', 'sport', 'sports', 'hobby', 'hobbies',
    'surf', 'hiking', 'travel', 'culture', 'activities', 'outdoor'
  ],

  // 🛠️ TECHNOLOGIES (toutes catégories tech)
  technologies: [
    // Français
    'techno', 'technos', 'technologies', 'technologie', 'langage', 'langages', 'programmation', 'framework',
    'librairie', 'bibliothèque', 'outil', 'outils', 'compétences techniques', 'stack', 'dev', 'développement',
    'frontend', 'backend', 'fullstack', 'base de données', 'bdd', 'mobile', 'web', 'logiciel',
    'ia', 'intelligence artificielle', 'machine learning', 'ai', 'langchain', 'openai', 'gemini',
    'javascript', 'typescript', 'react', 'astro', 'python', 'node', 'sql', 'docker',
    // Anglais
    'tech', 'technology', 'technologies', 'language', 'languages', 'programming', 'framework', 'frameworks',
    'library', 'libraries', 'tool', 'tools', 'technical skills', 'stack', 'development', 'coding',
    'frontend', 'backend', 'fullstack', 'database', 'databases', 'mobile', 'web', 'software',
    'artificial intelligence', 'machine learning', 'ai', 'ml', 'llm'
  ],

  // 🚀 PROJETS & EXPÉRIENCE (projects + experience pro + associative experience) 
  projets_experience: [
    // Français - Projets
    'projet', 'projets', 'réalisation', 'réalisations', 'portfolio', 'création', 'développement',
    'application', 'site', 'plateforme', 'kodeme', 'jumeau numérique', 'chatbot', 'ia conversationnelle',
    // Français - Expérience professionnelle
    'expérience', 'expériences', 'travail', 'emploi', 'poste', 'carrière', 'professionnel', 'stage',
    'entreprise', 'société', 'job', 'boulot', 'mission', 'missions', 'alter watt', 'jdg freelance',
    'ministère', 'bellastock', 'startup', 'énergie', 'transition écologique',
    // Français - Expérience associative
    'association', 'bénévole', 'engagement', 'associatif', 'vice-président', 'co-fondateur',
    
    // Anglais - Projects
    'project', 'projects', 'work', 'portfolio', 'creation', 'development', 'achievement', 'accomplishment',
    'application', 'app', 'website', 'site', 'platform', 'digital twin', 'chatbot', 'conversational ai',
    // Anglais - Professional Experience
    'experience', 'job', 'career', 'professional', 'internship', 'company', 'position', 'role', 
    'employment', 'startup', 'energy', 'ecological transition',
    // Anglais - Associative Experience
    'association', 'volunteer', 'community', 'vice-president', 'co-founder'
  ],

  // 🎓 FORMATION & ACTIVITÉS (education + travel + faqs)
  formation_activites: [
    // Français - Formation
    'formation', 'formations', 'étude', 'études', 'diplôme', 'diplômes', 'école', 'université', 'cursus',
    'apprentissage', 'éducation', 'parcours scolaire', 'école 42', 'master', 'licence', 'kaplan',
    'autodidacte', 'auto-formation', 'caen', 'nantes', 'paris', 'plymouth', 'cáceres',
    // Français - Voyages & Expérience internationale
    'voyage', 'voyages', 'international', 'étranger', 'erasmus', 'écosse', 'espagne', 'angleterre',
    'édimbourg', 'immersion', 'interculturel', 'académique',
    // Français - Questions fréquentes
    'question', 'questions', 'faq', 'pourquoi', 'comment', 'combien', 'quand', 'où',
    
    // Anglais - Education
    'education', 'study', 'studies', 'degree', 'degrees', 'school', 'university', 'learning', 'academic',
    'training', 'self-taught', 'autodidact', 'college', 'course', 'program',
    // Anglais - Travel & International Experience  
    'travel', 'international', 'abroad', 'erasmus', 'scotland', 'spain', 'england', 'edinburgh',
    'immersion', 'intercultural', 'exchange',
    // Anglais - Frequently Asked Questions
    'question', 'questions', 'faq', 'why', 'how', 'when', 'where', 'what'
  ]
};

/**
 * 🎯 Analyse le message pour identifier les 4 GRANDES SECTIONS pertinentes
 */
function getRelevantSections(message: string): string[] {
  const lowerMessage = message.toLowerCase();
  const relevantSections = new Set(['profil']); // Toujours inclure le profil élargi
  
  // Vérifier chaque grande section
  for (const [section, keywords] of Object.entries(SECTION_KEYWORDS)) {
    if (keywords.some(keyword => lowerMessage.includes(keyword))) {
      relevantSections.add(section);
    }
  }
  
  // Si aucune section spécifique détectée, inclure technologies par défaut
  if (relevantSections.size === 1) {
    relevantSections.add('technologies');
  }
  
  console.log(`[Jules AI] 🎯 Grandes sections détectées: ${Array.from(relevantSections).join(', ')}`);
  return Array.from(relevantSections);
}

/**
 * 📦 Fonction pour formater les données selon les 4 GRANDES SECTIONS
 */
function formatKnowledgeForPrompt(relevantSections: string[] = []) {
  const formattedData: any = {};
  
  // 📋 SECTION 1: PROFIL ÉLARGI (toujours incluse)
  if (relevantSections.includes('profil')) {
    // Profile de base
    let profilContent = `Je suis ${julesKnowledge.profile.fullName} (${julesKnowledge.profile.name}), ${julesKnowledge.profile.role}.
Spécialisation: ${julesKnowledge.profile.specialization}
Localisation: ${julesKnowledge.profile.location} - ${julesKnowledge.profile.location_appreciation}
Passion: ${julesKnowledge.profile.passion}
Motto: ${julesKnowledge.profile.motto}
Traits de personnalité: ${julesKnowledge.profile.personality_traits.join(', ')}`;

    // Contact
    profilContent += `\n\n🔗 CONTACT:
Entreprise: ${julesKnowledge.profile.company} (fondée en ${julesKnowledge.profile.company_founded})
Description: ${julesKnowledge.profile.company_description}
Email: ${julesKnowledge.profile.contact.email}
Téléphone: ${julesKnowledge.profile.contact.phone}
LinkedIn: ${julesKnowledge.profile.contact.linkedin}
Adresse: ${julesKnowledge.contact?.adress || 'N/A'}
Spécialités: ${julesKnowledge.contact?.specialties?.join(', ') || 'N/A'}`;

    // Langues  
    profilContent += `\n\n🌍 LANGUES:
Français: ${julesKnowledge.languages?.french?.level} - ${julesKnowledge.languages?.french?.description}
Anglais: ${julesKnowledge.languages?.english?.level} - ${julesKnowledge.languages?.english?.description}
Espagnol: ${julesKnowledge.languages?.spanish?.level} - ${julesKnowledge.languages?.spanish?.description}`;

    // Personality
    if (julesKnowledge.personality) {
      profilContent += `\n\n🧠 PERSONNALITÉ:
Traits: ${julesKnowledge.personality.traits?.join(', ') || 'N/A'}
Style de communication: ${julesKnowledge.personality.communication_style || 'N/A'}
Intérêts: ${julesKnowledge.personality.interests?.join(', ') || 'N/A'}
Valeurs: ${julesKnowledge.personality.values?.join(', ') || 'N/A'}`;
    }

    // Values and sustainability
    if (julesKnowledge.values_and_sustainability) {
      profilContent += `\n\n🌱 VALEURS & DURABILITÉ:
Valeurs fondamentales: ${julesKnowledge.values_and_sustainability.core_values?.join(', ') || 'N/A'}
Approche durabilité: ${julesKnowledge.values_and_sustainability.sustainability_approach || 'N/A'}
Équilibre vie-travail: ${julesKnowledge.values_and_sustainability.work_life_balance || 'N/A'}`;
    }

    // Goals
    if (julesKnowledge.goals) {
      profilContent += `\n\n🎯 OBJECTIFS:
Court terme: ${julesKnowledge.goals.short_term?.join(', ') || 'N/A'}
Long terme: ${julesKnowledge.goals.long_term?.join(', ') || 'N/A'}`;
    }

    // Soft skills
    if (julesKnowledge.soft_skills) {
      const softSkillsFormatted = julesKnowledge.soft_skills
        .map(category => `${category.category}: ${category.skills.join(', ')}`)
        .join('\n');
      profilContent += `\n\n💡 SOFT SKILLS:\n${softSkillsFormatted}`;
    }

    // Outdoor activities
    if (julesKnowledge.outdoor_activities) {
      profilContent += `\n\n🏄 ACTIVITÉS & LOISIRS:
Sports: ${julesKnowledge.outdoor_activities.sports?.join(', ') || 'N/A'}
Hobbies: ${julesKnowledge.outdoor_activities.hobbies?.join(', ') || 'N/A'}
Philosophie: ${julesKnowledge.outdoor_activities.philosophy || 'N/A'}`;
    }

    formattedData.profil = profilContent;
  }
  
  // 🛠️ SECTION 2: TECHNOLOGIES
  if (relevantSections.includes('technologies')) {
    const allTechnologies = [
      ...(julesKnowledge.technologies.frontend || []),
      ...(julesKnowledge.technologies.backend || []),
      ...(julesKnowledge.technologies.mobile || []),
      ...(julesKnowledge.technologies.cloud_devops || []),
      ...(julesKnowledge.technologies.ai_machine_learning || []),
      ...(julesKnowledge.technologies.databases || [])
    ].map(tech => `${tech.name} (${tech.level}) - ${tech.description}`)
     .concat(
       (julesKnowledge.technologies.tools || []).map(tool => `${tool.name} (${tool.level}) - ${tool.description}`)
     );
    
    formattedData.technologies = `🛠️ MES TECHNOLOGIES:\n${allTechnologies.join('\n')}`;
  } else {
    formattedData.technologies = "Technologies disponibles sur demande.";
  }
  
  // 🚀 SECTION 3: PROJETS & EXPÉRIENCE
  if (relevantSections.includes('projets_experience')) {
    let projetsExpContent = '';
    
    // Projects
    if (julesKnowledge.projects) {
      const projectsFormatted = julesKnowledge.projects
        .map(project => `📁 ${project.name} (${project.status}): ${project.description}
Technologies: ${project.technologies ? project.technologies.join(', ') : 'N/A'}
Type: ${project.type || 'N/A'}`)
        .join('\n\n');
      projetsExpContent += `🚀 MES PROJETS:\n${projectsFormatted}`;
    }

    // Experience professionnelle
    if (julesKnowledge.experience) {
      const experienceFormatted = julesKnowledge.experience
        .map(exp => `🏢 ${exp.company || exp.institution}: ${exp.role} (${exp.period})
${exp.description}
Technologies: ${exp.technologies ? exp.technologies.join(', ') : 'N/A'}
Réalisations: ${exp.achievements ? exp.achievements.join(', ') : 'N/A'}`)
        .join('\n\n');
      projetsExpContent += `\n\n💼 EXPÉRIENCE PROFESSIONNELLE:\n${experienceFormatted}`;
    }

    // Associative experience
    if (julesKnowledge.associative_experience) {
      const associativeFormatted = julesKnowledge.associative_experience
        .map(exp => `🤝 ${exp.organization} (${exp.location}): ${exp.role}
${exp.description}`)
        .join('\n');
      projetsExpContent += `\n\n🤝 EXPÉRIENCE ASSOCIATIVE:\n${associativeFormatted}`;
    }

    formattedData.projets_experience = projetsExpContent;
  } else {
    formattedData.projets_experience = "Projets et expérience disponibles sur demande.";
  }

  // 🎓 SECTION 4: FORMATION & ACTIVITÉS
  if (relevantSections.includes('formation_activites')) {
    let formationContent = '';
    
    // Education
    if (julesKnowledge.education) {
      const educationFormatted = julesKnowledge.education
        .map(edu => `🎓 ${edu.institution || edu.title}: ${edu.title || edu.type} (${edu.period})
${edu.description || edu.focus || ''}
Compétences: ${edu.skills_acquired ? edu.skills_acquired.join(', ') : 'N/A'}`)
        .join('\n\n');
      formationContent += `🎓 FORMATION:\n${educationFormatted}`;
    }

    // Travel experience
    if (julesKnowledge.travel_experience) {
      let travelContent = '';
      if (julesKnowledge.travel_experience.erasmus_programs) {
        travelContent += julesKnowledge.travel_experience.erasmus_programs
          .map(prog => `✈️ ${prog.location} (${prog.university}): ${prog.benefits}`)
          .join('\n');
      }
      if (julesKnowledge.travel_experience.language_immersion) {
        const immersion = julesKnowledge.travel_experience.language_immersion;
        travelContent += `\n✈️ ${immersion.location} (${immersion.institution}): ${immersion.focus}`;
      }
      formationContent += `\n\n🌍 EXPÉRIENCE INTERNATIONALE:\n${travelContent}`;
    }

    // FAQs
    if (julesKnowledge.faqs) {
      const faqsFormatted = julesKnowledge.faqs
        .map(faq => `❓ ${faq.question}\n💬 ${faq.answer}`)
        .join('\n\n');
      formationContent += `\n\n❓ FAQ:\n${faqsFormatted}`;
    }

    formattedData.formation_activites = formationContent;
  } else {
    formattedData.formation_activites = "Formation et activités disponibles sur demande.";
  }
  
  return formattedData;
}

/**
 * Classe principale du jumeau numérique de Jules
 */
export class JulesDigitalTwin {
  private chain: RunnableSequence | null = null;
  
  constructor() {
    // L'initialisation se fait de façon paresseuse
  }
  
  private getChain() {
    if (!this.chain) {
      try {
        const modelInstance = initializeModel();
        this.chain = RunnableSequence.from([
          systemPromptTemplate,
          modelInstance,
          new StringOutputParser()
        ]);
        console.log('✅ LangChain pipeline initialized');
      } catch (error) {
        console.error('❌ Failed to initialize LangChain pipeline:', error);
        throw error;
      }
    }
    return this.chain;
  }

  /**
   * Méthode principale pour chatter avec Jules (optimisée avec recherche sélective)
   */
  async chat(message: string, history: any[] = [], language: string = 'fr'): Promise<string> {
    try {
      console.log(`[Jules AI] Processing message: ${message}`);
      
      // 🔍 ANALYSE INTELLIGENTE : Identifier les sections pertinentes
      const relevantSections = getRelevantSections(message);
      
      // 📦 CONTEXTE OPTIMISÉ : Ne charger que ce qui est nécessaire
      const knowledgeContext = formatKnowledgeForPrompt(relevantSections);
      
      console.log(`[Jules AI] Sections chargées: ${relevantSections.join(', ')}`);
      console.log(`[Jules AI] Tokens économisés: ~${Math.round((6 - relevantSections.length) * 150)} tokens`);
      
      // Génération de la réponse avec langue
      const chain = this.getChain();
      const response = await chain.invoke({
        ...knowledgeContext,
        question: message,
        language: language === 'en' ? 'anglais (English)' : 'français',
        history: history.length > 0 ? `Historique de conversation: ${JSON.stringify(history.slice(-3))}` : ''
      });
      
      console.log(`[Jules AI] Generated response: ${response}`);
      return response;
      
    } catch (error) {
      console.error('[Jules AI Error]:', error);
      
      // Fallback en cas d'erreur (adapté à la langue)
      const fallbackMessage = language === 'en'
        ? "Sorry, I'm experiencing a small technical issue. Can you rephrase your question?"
        : "Désolé, je rencontre un petit problème technique. Peux-tu reformuler ta question ?";
        
      return fallbackMessage;
    }
  }

  /**
   * Méthode pour obtenir des informations spécifiques
   */
  getKnowledge() {
    return julesKnowledge;
  }

  /**
   * Recherche dans la base de connaissances
   */
  searchKnowledge(query: string) {
    const lowerQuery = query.toLowerCase();
    
    // Recherche dans les technologies
    const relevantTechs = julesKnowledge.technologies.frontend
      .concat(julesKnowledge.technologies.backend)
      .filter(tech => 
        tech.name.toLowerCase().includes(lowerQuery) ||
        tech.description.toLowerCase().includes(lowerQuery)
      );
    
    // Recherche dans les projets  
    const relevantProjects = julesKnowledge.projects
      .filter(project =>
        project.name.toLowerCase().includes(lowerQuery) ||
        project.description.toLowerCase().includes(lowerQuery) ||
        project.technologies.some(tech => tech.toLowerCase().includes(lowerQuery))
      );
    
    return {
      technologies: relevantTechs,
      projects: relevantProjects
    };
  }

  /**
   * 🧪 Méthode de test pour analyser l'optimisation des 4 GRANDES SECTIONS
   */
  analyzeMessage(message: string) {
    const relevantSections = getRelevantSections(message);
    const totalSections = ['profil', 'technologies', 'projets_experience', 'formation_activites'];
    const tokensEstimate: Record<string, number> = {
      profil: 500,                  // Profile élargi (base + contact + langues + personality + values + goals + soft_skills + outdoor)
      technologies: 500,            // Toutes les technologies (frontend, backend, mobile, cloud, AI, DB, tools)
      projets_experience: 500,      // Projets + expérience pro + associative
      formation_activites: 500      // Education + travel + FAQs
    };
    
    const usedTokens = relevantSections.reduce((sum, section) => sum + (tokensEstimate[section] || 0), 0);
    const totalTokens = Object.values(tokensEstimate).reduce((sum, tokens) => sum + tokens, 0);
    const savedTokens = totalTokens - usedTokens;
    const savedPercentage = Math.round((savedTokens / totalTokens) * 100);
    
    return {
      message,
      relevantSections,
      allSections: totalSections,
      sectionsDescription: {
        profil: '📋 Profile + Contact + Langues + Personality + Values + Goals + Soft Skills + Outdoor',
        technologies: '🛠️ Toutes les technologies (Frontend, Backend, Mobile, Cloud, AI, DB, Tools)', 
        projets_experience: '🚀 Projets + Expérience professionnelle + Associative',
        formation_activites: '🎓 Formation + Expérience internationale + FAQs'
      },
      tokensUsed: usedTokens,
      totalTokens,
      tokensSaved: savedTokens,
      savedPercentage: `${savedPercentage}%`,
      efficiency: savedPercentage > 40 ? '🟢 Excellent' : savedPercentage > 20 ? '🟡 Bon' : '🔴 Peu optimisé',
      optimizationLevel: savedPercentage > 40 ? 'Très optimisé' : savedPercentage > 20 ? 'Bien optimisé' : 'Peu optimisé'
    };
  }
}

// Instance singleton
export const julesAI = new JulesDigitalTwin();