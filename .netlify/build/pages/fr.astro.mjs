/* empty css                                 */
import { c as createComponent, m as maybeRenderHead, i as renderScript, r as renderTemplate, d as createAstro, j as renderHead, k as renderComponent, l as renderSlot, f as addAttribute } from '../chunks/astro/server_BqLRg3Np.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                                 */
import { $ as $$Chat, a as $$Techs } from '../chunks/Techs_DvVSNXVB.mjs';
export { renderers } from '../renderers.mjs';

const $$NavFr = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<nav class="fixed top-0 left-0 right-0 z-50 bg-[var(--background)]/80 backdrop-blur-md border-b border-[var(--white-icon-tr)]" data-astro-cid-uhbxme6p> <div class="max-w-6xl mx-auto px-6 md:px-12 lg:px-20" data-astro-cid-uhbxme6p> <div class="flex items-center justify-between h-16" data-astro-cid-uhbxme6p> <!-- Logo/Name --> <a href="#home" class="text-xl font-semibold text-[var(--white)] hover:text-[var(--sec)] transition-colors" data-astro-cid-uhbxme6p>
Jules Duval
</a> <!-- Desktop Navigation --> <div class="hidden md:flex items-center space-x-8" data-astro-cid-uhbxme6p> <a href="#home" class="nav-link text-[var(--white-icon)] hover:text-[var(--sec)] transition-colors font-medium" data-astro-cid-uhbxme6p>
Accueil
</a> <a href="#about" class="nav-link text-[var(--white-icon)] hover:text-[var(--sec)] transition-colors font-medium" data-astro-cid-uhbxme6p>
À propos
</a> <!-- Projects Dropdown --> <div class="relative group" data-astro-cid-uhbxme6p> <button class="nav-link text-[var(--white-icon)] hover:text-[var(--sec)] transition-colors font-medium flex items-center gap-1" data-astro-cid-uhbxme6p>
Projets
<svg class="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-uhbxme6p> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-astro-cid-uhbxme6p></path> </svg> </button> <div class="absolute top-full left-0 mt-2 w-32 bg-[var(--background)] border border-[var(--white-icon-tr)] rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50" data-astro-cid-uhbxme6p> <a href="#projects-web" class="block px-4 py-2 text-[var(--white-icon)] hover:text-[var(--sec)] hover:bg-[var(--white-icon-tr)] transition-colors" data-astro-cid-uhbxme6p>
Web
</a> <a href="#projects-ai" class="block px-4 py-2 text-[var(--white-icon)] hover:text-[var(--sec)] hover:bg-[var(--white-icon-tr)] transition-colors" data-astro-cid-uhbxme6p>
IA
</a> </div> </div> <!-- Language Switcher --> <div class="flex items-center space-x-2 ml-4 pl-4 border-l border-[var(--white-icon-tr)]" data-astro-cid-uhbxme6p> <button id="lang-en" class="lang-btn text-[var(--white-icon)] hover:text-[var(--sec)] font-medium px-2 py-1 rounded transition-colors" data-astro-cid-uhbxme6p>
EN
</button> <span class="text-[var(--white-icon)]" data-astro-cid-uhbxme6p>|</span> <button id="lang-fr" class="lang-btn text-[var(--sec)] font-medium px-2 py-1 rounded transition-colors" data-astro-cid-uhbxme6p>
FR
</button> </div> </div> <!-- Mobile Menu Button --> <button id="mobile-menu-button" class="md:hidden flex items-center justify-center w-10 h-10 text-[var(--white-icon)] hover:text-[var(--sec)] transition-colors" aria-label="Toggle mobile menu" data-astro-cid-uhbxme6p> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-uhbxme6p> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-astro-cid-uhbxme6p></path> </svg> </button> </div> <!-- Mobile Navigation --> <div id="mobile-menu" class="md:hidden hidden border-t border-[var(--white-icon-tr)] mt-2 py-4" data-astro-cid-uhbxme6p> <div class="flex flex-col space-y-4" data-astro-cid-uhbxme6p> <a href="#home" class="nav-link text-[var(--white-icon)] hover:text-[var(--sec)] transition-colors font-medium" data-astro-cid-uhbxme6p>
Accueil
</a> <a href="#about" class="nav-link text-[var(--white-icon)] hover:text-[var(--sec)] transition-colors font-medium" data-astro-cid-uhbxme6p>
À propos
</a> <!-- Mobile Projects Dropdown --> <div class="space-y-2" data-astro-cid-uhbxme6p> <span class="text-[var(--white-icon)] font-medium" data-astro-cid-uhbxme6p>Projets</span> <div class="pl-4 space-y-2" data-astro-cid-uhbxme6p> <a href="#projects-web" class="nav-link block text-[var(--white-icon)] hover:text-[var(--sec)] transition-colors" data-astro-cid-uhbxme6p>
Web
</a> <a href="#projects-ai" class="nav-link block text-[var(--white-icon)] hover:text-[var(--sec)] transition-colors" data-astro-cid-uhbxme6p>
IA
</a> </div> </div> <!-- Mobile Language Switcher --> <div class="flex items-center space-x-2 pt-2 border-t border-[var(--white-icon-tr)]" data-astro-cid-uhbxme6p> <span class="text-[var(--white-icon)] text-sm" data-astro-cid-uhbxme6p>Langue:</span> <button id="lang-en-mobile" class="lang-btn text-[var(--white-icon)] hover:text-[var(--sec)] font-medium px-2 py-1 rounded transition-colors" data-astro-cid-uhbxme6p>
EN
</button> <span class="text-[var(--white-icon)]" data-astro-cid-uhbxme6p>|</span> <button id="lang-fr-mobile" class="lang-btn text-[var(--sec)] font-medium px-2 py-1 rounded transition-colors" data-astro-cid-uhbxme6p>
FR
</button> </div> </div> </div> </div> </nav> <!-- Spacer to prevent content from being hidden behind fixed navbar --> <div class="h-16" data-astro-cid-uhbxme6p></div> ${renderScript($$result, "C:/Users/Duv/DEV/MyDevWebsite/src/components/Nav-fr.astro?astro&type=script&index=0&lang.ts")} `;
}, "C:/Users/Duv/DEV/MyDevWebsite/src/components/Nav-fr.astro", void 0);

const $$Astro$1 = createAstro();
const $$LayoutFr = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$LayoutFr;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="fr"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}</title><link rel="icon" type="image/svg+xml" href="/svg/computer.svg"><!-- Google Fonts --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" media="print" onload="this.media='all'">${maybeRenderHead()}<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"></noscript>${renderHead()}</head> <body class="bg-[--background] md:px-48 lg:px-20 px-9"> ${renderComponent($$result, "Nav", $$NavFr, {})} ${renderSlot($$result, $$slots["default"])} <footer> <p>&copy; 2025 Jules Duval-Giard</p> </footer> ${renderComponent($$result, "Chat", $$Chat, { "lang": "fr" })} </body></html>`;
}, "C:/Users/Duv/DEV/MyDevWebsite/src/layouts/Layout-fr.astro", void 0);

const $$AboutFr = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="text-[var(--white)] py-8" id="about"> <div class="max-w-5xl mx-auto space-y-8"> <div class="text-center space-y-4"> <h2 class="text-3xl md:text-4xl font-medium text-[var(--white)]">
À propos de moi
</h2> <div class="w-20 h-1 bg-[var(--sec)] mx-auto rounded-full"></div> </div> <div class="grid md:grid-cols-2 gap-12 items-center"> <div class="space-y-6"> <p class="text-lg text-[var(--white-icon)] leading-relaxed text-justify">
Passionné par le développement web et les nouvelles technologies, je me spécialise dans la création d'expériences numériques modernes et performantes.
</p> <p class="text-lg text-[var(--white-icon)] leading-relaxed text-justify">
Mon approche combine <span class="text-[var(--sec)] font-medium">innovation technique</span>,
<span class="text-[var(--sec)] font-medium">développement durable</span> et
<span class="text-[var(--sec)] font-medium">collaboration</span> pour créer des solutions qui font la différence.
</p> <p class="text-lg text-[var(--white-icon)] leading-relaxed text-justify">
Toujours en quête d'apprentissage et d'amélioration, j'aime relever de nouveaux défis et transformer les idées en réalités digitales.
</p> </div> <div class="space-y-6"> <div class="bg-gradient-to-br from-[var(--sec)]/10 to-transparent p-6 rounded-xl border border-[var(--sec)]/20"> <h3 class="text-xl font-medium text-[var(--white)] mb-4">Mes Valeurs</h3> <ul class="space-y-3"> <li class="flex items-center gap-3"> <div class="w-2 h-2 bg-[var(--sec)] rounded-full"></div> <span class="text-[var(--white-icon)]">Code propre et maintenable</span> </li> <li class="flex items-center gap-3"> <div class="w-2 h-2 bg-[var(--sec)] rounded-full"></div> <span class="text-[var(--white-icon)]">Performance et accessibilité</span> </li> <li class="flex items-center gap-3"> <div class="w-2 h-2 bg-[var(--sec)] rounded-full"></div> <span class="text-[var(--white-icon)]">Veille technologique constante</span> </li> <li class="flex items-center gap-3"> <div class="w-2 h-2 bg-[var(--sec)] rounded-full"></div> <span class="text-[var(--white-icon)]">Travail d'équipe et communication</span> </li> <li class="flex items-center gap-3"> <div class="w-2 h-2 bg-[var(--sec)] rounded-full"></div> <span class="text-[var(--white-icon)]">Conception centrée utilisateur</span> </li> </ul> </div> </div> </div> </div> </section>`;
}, "C:/Users/Duv/DEV/MyDevWebsite/src/components/About-fr.astro", void 0);

const $$Astro = createAstro();
const $$ProjectsFr = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ProjectsFr;
  const projects = [
    {
      id: 1,
      title: "Portfolio avec Jumeau Num\xE9rique IA",
      description: "CV interactif r\xE9volutionnaire int\xE9grant un jumeau num\xE9rique IA capable de r\xE9pondre aux questions sur mon profil en temps r\xE9el. D\xE9monstration concr\xE8te de l'int\xE9gration LangChain + OpenAI dans une application web moderne.",
      image: "/images/JulesAvatarIA.png",
      url: "#",
      technologies: ["Astro", "TypeScript", "LangChain", "OpenAI API", "Tailwind CSS"],
      status: "En d\xE9veloppement",
      category: "ai"
    },
    {
      id: 2,
      title: "KodeME",
      description: "KodeMe est une plateforme de code participatif au tour par tour.",
      image: "/images/KodeME.png",
      url: "https://kodeme.example.com",
      technologies: ["TypeScript", "Tailwind CSS", "Web Sockets", "APIs"],
      status: "En d\xE9veloppement",
      category: "web"
    },
    {
      id: 3,
      title: "Site Cliente",
      description: "Cr\xE9ation d'un site web moderne et responsive pour une cliente, avec un design personnalis\xE9 et une exp\xE9rience utilisateur optimis\xE9e.",
      image: "/GIF.mp4",
      url: "https://mcboutin.fr/",
      technologies: ["Astro", "Tailwind CSS", "JavaScript", "APIs"],
      status: "En ligne",
      category: "web"
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section class="text-[var(--white)] py-16" id="projects"> <div class="max-w-6xl mx-auto space-y-12"> <div class="text-center space-y-4"> <h2 class="text-3xl md:text-4xl font-medium text-[var(--white)]">
Mes Projets
</h2> <div class="w-20 h-1 bg-[var(--sec)] mx-auto rounded-full"></div> <p class="text-lg text-[var(--white-icon)] max-w-2xl mx-auto">
Découvrez mes réalisations et les projets sur lesquels j'ai travaillé
</p> </div> <!-- Web projects --> <div class="pt-8" id="projects-web"> <h3 class="text-2xl font-semibold text-[var(--white)] mb-4">Web</h3> <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6"> ${projects.filter((p) => p.category === "web").map((project) => renderTemplate`<div class="group bg-gradient-to-br from-[var(--white-icon-tr)] to-transparent rounded-lg overflow-hidden border border-[var(--white-icon-tr)] hover:border-[var(--sec)]/50 transition-all duration-300 hover:scale-[1.02]"> <div class="relative overflow-hidden"> <a${addAttribute(project.url, "href")} target="_blank" rel="noopener noreferrer" class="block relative"> ${project.image && project.image.toLowerCase().endsWith(".mp4") ? renderTemplate`<div class="aspect-[4/3] bg-gradient-to-br from-[var(--sec)]/20 to-[var(--sec)]/5 flex items-center justify-center overflow-hidden"> <video${addAttribute(project.image, "src")} class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" autoplay muted loop playsinline></video> </div>` : renderTemplate`<div class="aspect-[4/3] bg-gradient-to-br from-[var(--sec)]/20 to-[var(--sec)]/5 flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"${addAttribute(`background-image: url('${project.image}');`, "style")}>  <div class="absolute inset-0 bg-black/20"></div> </div>`}  <div class="absolute inset-0 bg-[var(--sec)]/0 group-hover:bg-[var(--sec)]/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100"> <div class="bg-[var(--white)] text-[var(--background)] px-3 py-1.5 rounded-full font-medium flex items-center gap-1.5 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 text-sm"> <span>Voir le projet</span> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"> <path d="M7 17L17 7"></path> <path d="M7 7h10v10"></path> </svg> </div> </div> </a> </div> <div class="p-4 space-y-3"> <div class="flex items-start justify-between"> <h3 class="text-lg font-semibold text-[var(--white)] group-hover:text-[var(--sec)] transition-colors"> ${project.title} </h3> <span${addAttribute(`text-xs px-2 py-1 rounded-full font-medium ${project.status === "En ligne" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`, "class")}> ${project.status} </span> </div> <p class="text-sm text-[var(--white-icon)] leading-relaxed"> ${project.description} </p> <div class="flex flex-wrap gap-1.5"> ${project.technologies.map((tech) => renderTemplate`<span class="text-xs bg-[var(--sec)]/20 text-[var(--sec)] px-2 py-0.5 rounded-full font-medium"> ${tech} </span>`)} </div> </div> </div>`)} </div> </div> <!-- AI projects --> <div class="pt-12" id="projects-ai"> <h3 class="text-2xl font-semibold text-[var(--white)] mb-4">IA</h3> <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6"> ${projects.filter((p) => p.category === "ai").map((project) => renderTemplate`<div class="group bg-gradient-to-br from-[var(--white-icon-tr)] to-transparent rounded-lg overflow-hidden border border-[var(--white-icon-tr)] hover:border-[var(--sec)]/50 transition-all duration-300 hover:scale-[1.02]"> <div class="relative overflow-hidden"> <a${addAttribute(project.url, "href")} target="_blank" rel="noopener noreferrer" class="block relative"> ${project.image && project.image.toLowerCase().endsWith(".mp4") ? renderTemplate`<div class="aspect-[4/3] bg-gradient-to-br from-[var(--sec)]/20 to-[var(--sec)]/5 flex items-center justify-center overflow-hidden"> <video${addAttribute(project.image, "src")} class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" autoplay muted loop playsinline></video> </div>` : renderTemplate`<div class="aspect-[4/3] bg-gradient-to-br from-[var(--sec)]/20 to-[var(--sec)]/5 flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"${addAttribute(`background-image: url('${project.image}');`, "style")}>  <div class="absolute inset-0 bg-black/30"></div> </div>`} <div class="absolute inset-0 bg-[var(--sec)]/0 group-hover:bg-[var(--sec)]/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100"> <div class="bg-[var(--white)] text-[var(--background)] px-3 py-1.5 rounded-full font-medium flex items-center gap-1.5 text-sm"> <span>Voir le projet</span> </div> </div> </a> </div> <div class="p-4 space-y-3"> <div class="flex items-start justify-between"> <h3 class="text-lg font-semibold text-[var(--white)] group-hover:text-[var(--sec)] transition-colors">${project.title}</h3> <span${addAttribute(`text-xs px-2 py-1 rounded-full font-medium ${project.status === "En ligne" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`, "class")}>${project.status}</span> </div> <p class="text-sm text-[var(--white-icon)] leading-relaxed">${project.description}</p> </div> </div>`)} </div> </div> </div> </section>`;
}, "C:/Users/Duv/DEV/MyDevWebsite/src/components/Projects-fr.astro", void 0);

const $$HomeFr = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="text-[var(--white)] mt-12 md:mt-0" id="home"> <div class="max-w-5xl mx-auto space-y-8 md:py-36 pb-14"> <div class="text-left space-y-4"> <p class="text-md md:text-lg text-[var(--white-icon)] shiny-white">
Salut, je suis Jules
</p> <div class="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-8 md:gap-4"> <h1 class="text-[var(--white)] text-5xl md:text-6xl font-medium text-pretty leading-none">
Développeur <br> Logiciel & Web
</h1> <p class="text-md md:text-2xl text-[var(--white-icon)]">
animé par <span class="text-[var(--sec)] shiny-sec">l'innovation technologique</span>, le <span class="text-[var(--sec)] shiny-sec">développement durable</span>, et le <span class="text-[var(--sec)] shiny-sec">travail d'équipe</span>.
</p> </div> </div> ${renderComponent($$result, "Techs", $$Techs, {})} </div> </section> ${renderComponent($$result, "About", $$AboutFr, {})} ${renderComponent($$result, "Projects", $$ProjectsFr, {})} `;
}, "C:/Users/Duv/DEV/MyDevWebsite/src/components/Home-fr.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$LayoutFr, { "title": "Jules Duval-Giard | D\xE9veloppeur" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Home", $$HomeFr, {})} ` })}`;
}, "C:/Users/Duv/DEV/MyDevWebsite/src/pages/fr/index.astro", void 0);

const $$file = "C:/Users/Duv/DEV/MyDevWebsite/src/pages/fr/index.astro";
const $$url = "/fr";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
