import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import { n as NOOP_MIDDLEWARE_HEADER, o as decodeKey } from './chunks/astro/server_BqLRg3Np.mjs';
import 'clsx';
import 'cookie';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/Duv/DEV/MyDevWebsite/","cacheDir":"file:///C:/Users/Duv/DEV/MyDevWebsite/node_modules/.astro/","outDir":"file:///C:/Users/Duv/DEV/MyDevWebsite/dist/","srcDir":"file:///C:/Users/Duv/DEV/MyDevWebsite/src/","publicDir":"file:///C:/Users/Duv/DEV/MyDevWebsite/public/","buildClientDir":"file:///C:/Users/Duv/DEV/MyDevWebsite/dist/","buildServerDir":"file:///C:/Users/Duv/DEV/MyDevWebsite/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/chat","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/chat\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"chat","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/chat.ts","pathname":"/api/chat","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.D4nuGuG7.css"},{"type":"inline","content":"#mobile-menu[data-astro-cid-uhbxme6p]{transition:all .3s ease-in-out}html{scroll-behavior:smooth}:root{--background: #101010;--sec: #a476ff;--white: #dfdfdf;--white-icon: #f3f3f398;--white-icon-tr: #f3f3f310}*{font-family:montserrat,-apple-system,system-ui,sans-serif;box-sizing:border-box;padding:0;margin:0}*::-moz-selection{background-color:var(--sec);color:var(--background)}*::selection{background-color:var(--sec);color:var(--background)}.shiny-sec{background:linear-gradient(135deg,#a476ff 25%,#eee5ff,#a476ff 75%);background-size:400% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:shine 3s linear infinite}@keyframes shine{0%{background-position:100% 50%}30%,70%{background-position:0% 50%}}\n"}],"routeData":{"route":"/fr","isIndex":true,"type":"page","pattern":"^\\/fr\\/?$","segments":[[{"content":"fr","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/fr/index.astro","pathname":"/fr","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.D4nuGuG7.css"},{"type":"inline","content":"#mobile-menu[data-astro-cid-dmqpwcec]{transition:all .3s ease-in-out}html{scroll-behavior:smooth}:root{--background: #101010;--sec: #a476ff;--white: #dfdfdf;--white-icon: #f3f3f398;--white-icon-tr: #f3f3f310}*{font-family:montserrat,-apple-system,system-ui,sans-serif;box-sizing:border-box;padding:0;margin:0}*::-moz-selection{background-color:var(--sec);color:var(--background)}*::selection{background-color:var(--sec);color:var(--background)}.shiny-sec{background:linear-gradient(135deg,#a476ff 25%,#eee5ff,#a476ff 75%);background-size:400% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:shine 3s linear infinite}@keyframes shine{0%{background-position:100% 50%}30%,70%{background-position:0% 50%}}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/Duv/DEV/MyDevWebsite/src/pages/fr/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/Duv/DEV/MyDevWebsite/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/api/chat@_@ts":"pages/api/chat.astro.mjs","\u0000@astro-page:src/pages/fr/index@_@astro":"pages/fr.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_DmfAkKmG.mjs","C:/Users/Duv/DEV/MyDevWebsite/node_modules/unstorage/drivers/netlify-blobs.mjs":"chunks/netlify-blobs_DM36vZAS.mjs","C:/Users/Duv/DEV/MyDevWebsite/src/components/Nav-fr.astro?astro&type=script&index=0&lang.ts":"_astro/Nav-fr.astro_astro_type_script_index_0_lang.CZRSj8HQ.js","C:/Users/Duv/DEV/MyDevWebsite/src/components/Chat.astro?astro&type=script&index=0&lang.ts":"_astro/Chat.astro_astro_type_script_index_0_lang.CbsU9cYA.js","C:/Users/Duv/DEV/MyDevWebsite/src/components/Nav.astro?astro&type=script&index=0&lang.ts":"_astro/Nav.astro_astro_type_script_index_0_lang.BBr_ouqU.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Users/Duv/DEV/MyDevWebsite/src/components/Nav-fr.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",function(){const d=document.getElementById(\"mobile-menu-button\"),n=document.getElementById(\"mobile-menu\");d&&n&&d.addEventListener(\"click\",function(){n.classList.toggle(\"hidden\")});const a=document.getElementById(\"lang-en\"),l=document.getElementById(\"lang-fr\"),r=document.getElementById(\"lang-en-mobile\"),f=document.getElementById(\"lang-fr-mobile\");function i(o){o===\"en\"?window.location.href=\"/\":window.location.href=\"/fr/\"}a&&a.addEventListener(\"click\",()=>i(\"en\")),l&&l.addEventListener(\"click\",()=>i(\"fr\")),r&&r.addEventListener(\"click\",()=>i(\"en\")),f&&f.addEventListener(\"click\",()=>i(\"fr\"));const u=document.querySelectorAll(\".nav-link\");u.forEach(o=>{o.addEventListener(\"click\",function(c){c.preventDefault();const e=c.target.getAttribute(\"href\"),t=document.querySelector(e||\"\");if(t){const s=t.getBoundingClientRect().top+window.pageYOffset-80;window.scrollTo({top:s,behavior:\"smooth\"}),n&&!n.classList.contains(\"hidden\")&&n.classList.add(\"hidden\")}})});function m(){const o=[\"home\",\"about\",\"projects\"];let c=\"\";o.forEach(e=>{const t=document.getElementById(e);if(t){const s=t.getBoundingClientRect();s.top<=100&&s.bottom>=100&&(c=e)}}),u.forEach(e=>{e.getAttribute(\"href\")===`#${c}`?(e.classList.add(\"text-[var(--sec)]\"),e.classList.remove(\"text-[var(--white-icon)]\")):(e.classList.remove(\"text-[var(--sec)]\"),e.classList.add(\"text-[var(--white-icon)]\"))})}window.addEventListener(\"scroll\",m),m()});"],["C:/Users/Duv/DEV/MyDevWebsite/src/components/Nav.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",function(){const f=document.getElementById(\"mobile-menu-button\"),d=document.getElementById(\"mobile-menu\");f&&d&&f.addEventListener(\"click\",function(){d.classList.toggle(\"hidden\")});let u=\"en\";const i=document.getElementById(\"lang-en\"),s=document.getElementById(\"lang-fr\"),c=document.getElementById(\"lang-en-mobile\"),o=document.getElementById(\"lang-fr-mobile\");function m(){[i,s,c,o].forEach(e=>{e&&(e.classList.remove(\"text-[var(--sec)]\"),e.classList.add(\"text-[var(--white-icon)]\"))}),u===\"en\"?(i&&(i.classList.remove(\"text-[var(--white-icon)]\"),i.classList.add(\"text-[var(--sec)]\")),c&&(c.classList.remove(\"text-[var(--white-icon)]\"),c.classList.add(\"text-[var(--sec)]\"))):(s&&(s.classList.remove(\"text-[var(--white-icon)]\"),s.classList.add(\"text-[var(--sec)]\")),o&&(o.classList.remove(\"text-[var(--white-icon)]\"),o.classList.add(\"text-[var(--sec)]\")))}function r(n){u=n,m(),n===\"fr\"?window.location.href=\"/fr/\":window.location.href=\"/\"}i&&i.addEventListener(\"click\",()=>r(\"en\")),s&&s.addEventListener(\"click\",()=>r(\"fr\")),c&&c.addEventListener(\"click\",()=>r(\"en\")),o&&o.addEventListener(\"click\",()=>r(\"fr\"));const v=document.querySelectorAll(\".nav-link\");v.forEach(n=>{n.addEventListener(\"click\",function(e){e.preventDefault();const t=e.target.getAttribute(\"href\"),a=document.querySelector(t||\"\");if(a){const l=a.getBoundingClientRect().top+window.pageYOffset-80;window.scrollTo({top:l,behavior:\"smooth\"}),d&&!d.classList.contains(\"hidden\")&&d.classList.add(\"hidden\")}})});function g(){const n=[\"home\",\"about\",\"projects\"];let e=\"\";n.forEach(t=>{const a=document.getElementById(t);if(a){const l=a.getBoundingClientRect();l.top<=100&&l.bottom>=100&&(e=t)}}),v.forEach(t=>{t.getAttribute(\"href\")===`#${e}`?(t.classList.add(\"text-[var(--sec)]\"),t.classList.remove(\"text-[var(--white-icon)]\")):(t.classList.remove(\"text-[var(--sec)]\"),t.classList.add(\"text-[var(--white-icon)]\"))})}window.addEventListener(\"scroll\",g),g(),m()});"]],"assets":["/_astro/index.D4nuGuG7.css","/favicon.svg","/GIF.mp4","/svg/astro.svg","/svg/bash.svg","/svg/bootstrap.svg","/svg/C++.svg","/svg/C.svg","/svg/computer.svg","/svg/CSS3.svg","/svg/django.svg","/svg/git.svg","/svg/HTML5.svg","/svg/javaScript.svg","/svg/linux.svg","/svg/mysql.svg","/svg/next.svg","/svg/nodejs.svg","/svg/python.svg","/svg/react.svg","/svg/rest-api.svg","/svg/tailwindcss.svg","/svg/typeScript.svg","/svg/vercel.svg","/svg/vue.svg","/svg/windows.svg","/images/JulesAvatar-square.png","/images/JulesAvatarIA.png","/images/KodeME.png","/images/README.md","/_astro/Chat.astro_astro_type_script_index_0_lang.CbsU9cYA.js"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"s8OXoeZ7zAKOSMiDQyRXMrvEzILBa30wXd3fNNaROpU=","sessionConfig":{"driver":"netlify-blobs","options":{"name":"astro-sessions","consistency":"strong"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/netlify-blobs_DM36vZAS.mjs');

export { manifest };
