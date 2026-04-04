import { c as createComponent, r as renderHead, d as renderTemplate } from "../chunks/astro/server_B9s7nlmx.mjs";
import "kleur/colors";
import "clsx";
/* empty css                                    */
import { renderers } from "../renderers.mjs";
const prerender = false;
const $$Finalize = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en" data-astro-cid-o45hbvcr> <head><title>Finalizing via Auth...</title>${renderHead()}</head> <body data-astro-cid-o45hbvcr> <div id="status" data-astro-cid-o45hbvcr>Finalizing...</div>  </body> </html>`;
}, "/Users/steolly/Desktop/Gemini/Antigravity/my-gallery/src/pages/finalize.astro", void 0);
const $$file = "/Users/steolly/Desktop/Gemini/Antigravity/my-gallery/src/pages/finalize.astro";
const $$url = "/finalize";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Finalize,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  renderers
};
