import "cookie";
import "kleur/colors";
import "./chunks/astro-designed-error-pages_BARxK2nT.mjs";
import "es-module-lexer";
import { i as decodeKey } from "./chunks/astro/server_B9s7nlmx.mjs";
import "clsx";
import { N as NOOP_MIDDLEWARE_FN } from "./chunks/noop-middleware_DXuYGa_W.mjs";
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
    isIndex: rawRouteData.isIndex
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
const manifest = deserializeManifest({"hrefRoot":"file:///Users/steolly/Desktop/Gemini/Antigravity/my-gallery/","adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.DPr3Zkfv.js"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.DPr3Zkfv.js"}],"styles":[],"routeData":{"route":"/api/finalize-registration","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/finalize-registration\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"finalize-registration","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/finalize-registration.ts","pathname":"/api/finalize-registration","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.DPr3Zkfv.js"}],"styles":[],"routeData":{"route":"/api/migrate","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/migrate\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"migrate","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/migrate.ts","pathname":"/api/migrate","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.DPr3Zkfv.js"}],"styles":[],"routeData":{"route":"/api/posts","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/posts\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"posts","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/posts.ts","pathname":"/api/posts","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.DPr3Zkfv.js"}],"styles":[],"routeData":{"route":"/api/stacks/[id]","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/stacks\\/([^/]+?)\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"stacks","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/api/stacks/[id].ts","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.DPr3Zkfv.js"}],"styles":[],"routeData":{"route":"/api/stacks","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/stacks\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"stacks","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/stacks.ts","pathname":"/api/stacks","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.DPr3Zkfv.js"}],"styles":[],"routeData":{"route":"/api/upload","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/upload\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"upload","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/upload.ts","pathname":"/api/upload","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.DPr3Zkfv.js"}],"styles":[],"routeData":{"route":"/api/verify-invite","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/verify-invite\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"verify-invite","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/verify-invite.ts","pathname":"/api/verify-invite","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"const n=new URLSearchParams(window.location.search),t=n.get(\"inviteId\")||localStorage.getItem(\"clerk_invite_id\");async function i(){if(t)try{const a=await(await fetch(\"/api/finalize-registration\",{method:\"POST\",headers:{\"Content-Type\":\"application/json\"},body:JSON.stringify({inviteId:t})})).json();window.location.href=\"/\"}catch{document.getElementById(\"status\").innerText=\"Registration error. Please contact admin.\"}else window.location.href=\"/\"}i();\n"},{"type":"external","value":"/_astro/page.DPr3Zkfv.js"}],"styles":[{"type":"inline","content":"body{background:#0a0a0a;color:#fff;font-family:sans-serif;display:flex;justify-content:center;align-items:center;height:100vh;margin:0}\n"}],"routeData":{"route":"/finalize","isIndex":false,"type":"page","pattern":"^\\/finalize\\/?$","segments":[[{"content":"finalize","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/finalize.astro","pathname":"/finalize","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.Ct32LO-g.js"},{"type":"external","value":"/_astro/page.DPr3Zkfv.js"}],"styles":[{"type":"inline","content":"body{background:#0a0a0a;color:#fff;font-family:Montserrat,sans-serif;display:flex;justify-content:center;align-items:center;height:100vh;margin:0}.back-link[data-astro-cid-4d26bl7g]{position:absolute;top:2rem;left:2rem;color:#ffffff80;text-decoration:none;font-size:.8rem;letter-spacing:.15em;text-transform:uppercase;transition:color .3s}.back-link[data-astro-cid-4d26bl7g]:hover{color:#fff}\n"}],"routeData":{"route":"/sign-in","isIndex":false,"type":"page","pattern":"^\\/sign-in\\/?$","segments":[[{"content":"sign-in","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/sign-in.astro","pathname":"/sign-in","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.CXV2xmvw.js"},{"type":"external","value":"/_astro/page.DPr3Zkfv.js"}],"styles":[{"type":"inline","content":"body{background:#0a0a0a;color:#fff;font-family:Montserrat,sans-serif;display:flex;justify-content:center;align-items:center;height:100vh;margin:0}.back-link[data-astro-cid-eti64xk7]{position:absolute;top:2rem;left:2rem;color:#ffffff80;text-decoration:none;font-size:.8rem;letter-spacing:.15em;text-transform:uppercase;transition:color .3s}.back-link[data-astro-cid-eti64xk7]:hover{color:#fff}#invite-form[data-astro-cid-eti64xk7]{background:#ffffff08;padding:3rem;border-radius:24px;border:1px solid rgba(255,255,255,.08);text-align:center;width:90%;max-width:400px}input[data-astro-cid-eti64xk7]{background:transparent;border:none;border-bottom:1px solid rgba(255,255,255,.2);color:#fff;padding:.75rem 0;width:100%;margin:1.5rem 0;text-align:center;font-size:1rem;letter-spacing:.15em;outline:none;transition:border-color .3s}input[data-astro-cid-eti64xk7]:focus{border-bottom-color:#fffc}button[data-astro-cid-eti64xk7]{background:#fff;color:#000;border:none;padding:.75rem 2rem;border-radius:40px;font-size:.75rem;letter-spacing:.15em;text-transform:uppercase;cursor:pointer;font-weight:500}button[data-astro-cid-eti64xk7]:hover{background:#fffc}#error-msg[data-astro-cid-eti64xk7]{color:#e11d48;font-size:.8rem;margin-top:1rem;height:1rem;opacity:0}#error-msg[data-astro-cid-eti64xk7].show{opacity:1}#sign-up-container[data-astro-cid-eti64xk7]{display:none}\n"}],"routeData":{"route":"/sign-up","isIndex":false,"type":"page","pattern":"^\\/sign-up\\/?$","segments":[[{"content":"sign-up","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/sign-up.astro","pathname":"/sign-up","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.PxEEoGTt.js"},{"type":"external","value":"/_astro/page.DPr3Zkfv.js"}],"styles":[{"type":"external","src":"/_astro/index.DnEcuHS5.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/steolly/Desktop/Gemini/Antigravity/my-gallery/src/pages/finalize.astro",{"propagation":"none","containsHead":true}],["/Users/steolly/Desktop/Gemini/Antigravity/my-gallery/src/pages/sign-in.astro",{"propagation":"none","containsHead":true}],["/Users/steolly/Desktop/Gemini/Antigravity/my-gallery/src/pages/sign-up.astro",{"propagation":"none","containsHead":true}],["/Users/steolly/Desktop/Gemini/Antigravity/my-gallery/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/api/finalize-registration@_@ts":"pages/api/finalize-registration.astro.mjs","\u0000@astro-page:src/pages/api/migrate@_@ts":"pages/api/migrate.astro.mjs","\u0000@astro-page:src/pages/api/posts@_@ts":"pages/api/posts.astro.mjs","\u0000@astro-page:src/pages/api/stacks/[id]@_@ts":"pages/api/stacks/_id_.astro.mjs","\u0000@astro-page:src/pages/api/stacks@_@ts":"pages/api/stacks.astro.mjs","\u0000@astro-page:src/pages/api/upload@_@ts":"pages/api/upload.astro.mjs","\u0000@astro-page:src/pages/api/verify-invite@_@ts":"pages/api/verify-invite.astro.mjs","\u0000@astro-page:src/pages/finalize@_@astro":"pages/finalize.astro.mjs","\u0000@astro-page:src/pages/sign-in@_@astro":"pages/sign-in.astro.mjs","\u0000@astro-page:src/pages/sign-up@_@astro":"pages/sign-up.astro.mjs","\u0000astro-internal:middleware":"_astro-internal_middleware.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","/Users/steolly/Desktop/Gemini/Antigravity/my-gallery/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_hR0vcEol.mjs","/Users/steolly/Desktop/Gemini/Antigravity/my-gallery/src/lib/auth.ts":"chunks/auth_BwoPjZN5.mjs","\u0000@astrojs-manifest":"manifest_CKlfamP8.mjs","astro:scripts/before-hydration.js":"_astro/astro_scripts/before-hydration.js.Yy83tgZC.js","/astro/hoisted.js?q=0":"_astro/hoisted.DBr0TFjE.js","/astro/hoisted.js?q=1":"_astro/hoisted.CXV2xmvw.js","astro:scripts/page.js":"_astro/page.DPr3Zkfv.js","/astro/hoisted.js?q=2":"_astro/hoisted.PxEEoGTt.js","\u0000astro:transitions/client":"_astro/client.CHLTc0Tl.js","/astro/hoisted.js?q=3":"_astro/hoisted.Ct32LO-g.js"},"inlinedScripts":[],"assets":["/_astro/index.DnEcuHS5.css","/_astro/chunk-IFEBM3MJ.C_I9GLFJ.js","/_astro/client.CHLTc0Tl.js","/_astro/hoisted.CXV2xmvw.js","/_astro/hoisted.Ct32LO-g.js","/_astro/hoisted.PxEEoGTt.js","/_astro/index.dW5huTcI.js","/_astro/page.DPr3Zkfv.js","/admin/config.yml","/admin/index.html","/images/hero_background.jpg","/_astro/astro_scripts/before-hydration.js.Yy83tgZC.js","/images/posts/p1_1.jpg","/images/posts/p1_2.jpg","/images/posts/p1_3.jpg","/images/posts/p1_4.jpg","/images/posts/p1_5.jpg","/images/posts/p1_6.jpg","/images/posts/p1_7.jpg","/images/posts/p2_1.jpg","/images/posts/p2_2.jpg","/images/posts/p2_3.jpg","/images/posts/p2_4.jpg","/images/posts/p3_1.jpg","/images/posts/p3_2.jpg","/images/posts/p3_3.jpg","/images/posts/p3_4.jpg","/images/posts/p3_5.jpg","/images/posts/p3_6.jpg","/images/posts/p3_7.jpg","/images/posts/p4_1.jpg","/images/posts/p4_2.jpg","/images/posts/p4_3.jpg","/images/posts/p4_4.jpg","/images/posts/p4_5.jpg","/images/posts/p4_6.jpg","/images/posts/p4_7.jpg","/images/posts/p_4_add_1774198679062_0.jpg","/images/posts/p_4_add_1774199446301_0.jpg","/images/posts/p_local_1774196343380_0.jpg","/images/posts/p_local_1774196839061_0.jpg","/_astro/page.DPr3Zkfv.js"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"k85bdKV2ZnaVfUCWhw+kYMlxM9sKh3wJEXYgctUZjtw=","experimentalEnvGetSecretEnabled":false});
export {
  manifest
};
