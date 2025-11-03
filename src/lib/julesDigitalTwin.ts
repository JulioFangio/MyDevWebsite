/**
 * Service IA - Jumeau numérique de Jules
 * Utilise LangChain avec une base de connaissances JSON
 */

import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
import julesKnowledge from '../data/jules-knowledge.json';

/**
 * Configuration du modèle IA
 */
const model = new ChatOpenAI({
  model: "gpt-3.5-turbo", // Ou "gpt-4" si tu as accès
  temperature: 0.7, // Créativité modérée
  maxTokens: 500, // Réponses concises
  // apiKey sera pris depuis process.env.OPENAI_API_KEY
});

/**
 * Template de prompt système pour définir la personnalité de Jules
 */
const systemPromptTemplate = PromptTemplate.fromTemplate(`
Tu es Jules, un développeur web passionné de 20 ans. Tu réponds comme si tu étais Jules lui-même, en première personne.

## Ton profil :
{profile}

## Tes technologies :
{technologies}

## Tes projets :
{projects}

## Ta personnalité :
{personality}

## Instructions importantes :
- Réponds toujours en français
- Sois naturel et authentique, comme si tu parlais en personne
- Utilise "je", "mon", "mes" car tu ES Jules
- Reste humble mais confiant
- N'hésite pas à partager des détails techniques si demandé
- Si on te demande quelque chose que tu ne sais pas, dis-le honnêtement

## Message utilisateur :
{question}

## Ta réponse (comme Jules) :
`);

/**
 * Fonction utilitaire pour formater les données de la base de connaissances
 */
function formatKnowledgeForPrompt() {
  return {
    profile: `Je suis ${julesKnowledge.profile.name}, ${julesKnowledge.profile.role} de ${julesKnowledge.profile.age} ans basé en ${julesKnowledge.profile.location}. ${julesKnowledge.profile.passion}.`,
    
    technologies: julesKnowledge.technologies.frontend
      .concat(julesKnowledge.technologies.backend)
      .map(tech => `${tech.name} (${tech.level}) - ${tech.description}`)
      .join('\n'),
    
    projects: julesKnowledge.projects
      .map(project => `${project.name}: ${project.description} (Technologies: ${project.technologies.join(', ')})`)
      .join('\n'),
    
    personality: `Traits: ${julesKnowledge.personality.traits.join(', ')}. 
Style: ${julesKnowledge.personality.communication_style}.
Intérêts: ${julesKnowledge.personality.interests.join(', ')}.`
  };
}

/**
 * Classe principale du jumeau numérique de Jules
 */
export class JulesDigitalTwin {
  private chain: RunnableSequence;
  
  constructor() {
    // Création de la chaîne LangChain
    this.chain = RunnableSequence.from([
      systemPromptTemplate,
      model,
      new StringOutputParser()
    ]);
  }

  /**
   * Méthode principale pour chatter avec Jules
   */
  async chat(message: string, history: any[] = []): Promise<string> {
    try {
      console.log(`[Jules AI] Processing message: ${message}`);
      
      // Préparation du contexte
      const knowledgeContext = formatKnowledgeForPrompt();
      
      // Génération de la réponse
      const response = await this.chain.invoke({
        ...knowledgeContext,
        question: message,
        history: history.length > 0 ? `Historique de conversation: ${JSON.stringify(history.slice(-3))}` : ''
      });
      
      console.log(`[Jules AI] Generated response: ${response}`);
      return response;
      
    } catch (error) {
      console.error('[Jules AI Error]:', error);
      
      // Fallback en cas d'erreur
      return "Désolé, je rencontre un petit problème technique. Peux-tu reformuler ta question ?";
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
}

// Instance singleton
export const julesAI = new JulesDigitalTwin();