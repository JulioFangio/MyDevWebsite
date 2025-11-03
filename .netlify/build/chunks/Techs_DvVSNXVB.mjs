import { c as createComponent, d as createAstro, m as maybeRenderHead, f as addAttribute, i as renderScript, r as renderTemplate } from './astro/server_BqLRg3Np.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                         */

const $$Astro = createAstro();
const $$Chat = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Chat;
  const { lang = "en" } = Astro2.props;
  const content = {
    fr: {
      subtitle: "Jumeau num\xE9rique",
      placeholder: "Posez votre question...",
      sendButton: "Envoyer",
      enterHint: "Appuyez sur Entr\xE9e pour envoyer",
      typingIndicator: "Jules \xE9crit...",
      welcomeMessage: "Salut ! Je suis le jumeau num\xE9rique de Jules. Posez-moi des questions sur ses comp\xE9tences, projets ou exp\xE9riences ! \u{1F60A}",
      chatLabel: "Chat avec Jules"
    },
    en: {
      subtitle: "Digital Twin",
      placeholder: "Ask your question...",
      sendButton: "Send",
      enterHint: "Press Enter to send",
      typingIndicator: "Jules is typing...",
      welcomeMessage: "Hi! I'm Jules' digital twin. Ask me questions about his skills, projects, or experiences! \u{1F60A}",
      chatLabel: "Chat with Jules"
    }
  };
  const t = content[lang];
  return renderTemplate`${maybeRenderHead()}<div id="chat-container" class="fixed bottom-6 right-6 z-50" data-astro-cid-cexstz2y> <!-- Chat Button --> <button id="chat-toggle" class="bg-[var(--sec)] hover:bg-[var(--sec)]/80 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 p-2 border-2 border-white/20"${addAttribute(t.chatLabel, "aria-label")} data-astro-cid-cexstz2y> <div class="w-12 h-12 rounded-full overflow-hidden avatar-optimized" style="background-image: url('/images/JulesAvatar-square.png');" data-astro-cid-cexstz2y></div> </button> <!-- Chat Modal --> <div id="chat-modal" class="absolute bottom-16 right-0 w-80 h-96 bg-[var(--background)] border border-[var(--white-icon-tr)] rounded-lg shadow-2xl hidden flex-col overflow-hidden" data-astro-cid-cexstz2y> <!-- Header --> <div class="flex items-center justify-between p-4 border-b border-[var(--white-icon-tr)] bg-gradient-to-r from-[var(--sec)]/10 to-transparent" data-astro-cid-cexstz2y> <div class="flex items-center gap-3" data-astro-cid-cexstz2y> <div class="w-9 h-9 rounded-full overflow-hidden avatar-optimized" style="background-image: url('/images/JulesAvatar-square.png');" data-astro-cid-cexstz2y></div> <div data-astro-cid-cexstz2y> <h3 class="text-[var(--white)] font-medium" data-astro-cid-cexstz2y>Jules</h3> <p class="text-[var(--white-icon)] text-xs" data-astro-cid-cexstz2y>${t.subtitle}</p> </div> </div> <div class="flex items-center gap-2" data-astro-cid-cexstz2y> <button id="chat-minimize" class="text-[var(--white-icon)] hover:text-[var(--sec)] transition-colors" title="Réduire" data-astro-cid-cexstz2y> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-cexstz2y> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" data-astro-cid-cexstz2y></path> </svg> </button> <button id="chat-close" class="text-[var(--white-icon)] hover:text-red-400 transition-colors" title="Fermer" data-astro-cid-cexstz2y> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-cexstz2y> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-astro-cid-cexstz2y></path> </svg> </button> </div> </div> <!-- Messages Container --> <div id="messages-container" class="flex-1 p-4 overflow-y-auto space-y-3 bg-[var(--background)]" data-astro-cid-cexstz2y> <!-- Les messages seront ajoutés dynamiquement par JavaScript --> </div> <!-- Input Area --> <div class="p-4 border-t border-[var(--white-icon-tr)] bg-[var(--background)]" data-astro-cid-cexstz2y> <div class="flex gap-2" data-astro-cid-cexstz2y> <input id="chat-input" type="text"${addAttribute(t.placeholder, "placeholder")} class="flex-1 bg-[var(--white-icon-tr)] text-[var(--white)] px-3 py-2 rounded-lg text-sm border border-transparent focus:border-[var(--sec)] focus:outline-none" maxlength="200" data-astro-cid-cexstz2y> <button id="chat-send" class="bg-[var(--sec)] hover:bg-[var(--sec)]/80 text-white px-3 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled data-astro-cid-cexstz2y> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-cexstz2y> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" data-astro-cid-cexstz2y></path> </svg> </button> </div> <div class="flex justify-between items-center mt-2" data-astro-cid-cexstz2y> <p class="text-[var(--white-icon)] text-xs" data-astro-cid-cexstz2y>${t.enterHint}</p> <div id="typing-indicator" class="text-[var(--sec)] text-xs hidden" data-astro-cid-cexstz2y>${t.typingIndicator}</div> </div> </div> </div> </div> ${renderScript($$result, "C:/Users/Duv/DEV/MyDevWebsite/src/components/Chat.astro?astro&type=script&index=0&lang.ts")} `;
}, "C:/Users/Duv/DEV/MyDevWebsite/src/components/Chat.astro", void 0);

const $$Techs = createComponent(($$result, $$props, $$slots) => {
  const technologies = [
    "astro",
    // "vue",
    "react",
    "typeScript",
    "tailwindcss",
    // "next",
    "nodejs",
    "HTML5",
    "CSS3",
    "javaScript",
    "git",
    "mysql",
    "bash",
    "python",
    "bootstrap",
    "C",
    "C++",
    "django",
    "linux",
    "windows",
    "rest-api"
  ];
  return renderTemplate`${maybeRenderHead()}<div class="relative overflow-x-hidden py-8"> <div class="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--background)] to-transparent z-20"></div> <div class="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[var(--background)] to-transparent z-20"></div> <div class="flex animate-scroll hover:animate-paused gap-12 md:gap-20 w-max"> ${[...technologies, ...technologies, ...technologies].map((tech) => renderTemplate`<div class="flex items-center gap-2 group transition-all duration-300"> <img${addAttribute(`/svg/${tech}.svg`, "src")}${addAttribute(tech, "alt")} class="h-7 w-auto object-contain transition-transform group-hover:scale-110 opacity-60" width="30" height="30" loading="lazy"> <span class="text-lg font-medium text-[var(--white-icon)]"> ${tech.charAt(0).toUpperCase() + tech.slice(1)} </span> </div>`)} </div> </div> `;
}, "C:/Users/Duv/DEV/MyDevWebsite/src/components/Techs.astro", void 0);

export { $$Chat as $, $$Techs as a };
