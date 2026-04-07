import { c as createComponent, h as renderComponent, d as renderTemplate, g as createAstro, r as renderHead } from "../chunks/astro/server_B9s7nlmx.mjs";
import "kleur/colors";
/* empty css                                   */
import { $ as $$InternalUIComponentRenderer } from "../chunks/InternalUIComponentRenderer_Bk0wuhUs.mjs";
import { renderers } from "../renderers.mjs";
const $$Astro = createAstro();
const $$SignIn$1 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SignIn$1;
  return renderTemplate`${renderComponent($$result, "InternalUIComponentRenderer", $$InternalUIComponentRenderer, { ...Astro2.props, "component": "sign-in" })}`;
}, "/Users/steolly/Desktop/Gemini/Antigravity/my-gallery/node_modules/@clerk/astro/components/interactive/SignIn.astro", void 0);
const prerender = false;
const $$SignIn = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en" data-astro-cid-4d26bl7g> <head><title>Sign In - THE GALLERY</title><meta name="viewport" content="width=device-width, initial-scale=1.0"><link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">${renderHead()}</head> <body data-astro-cid-4d26bl7g> <a href="/" class="back-link" data-astro-cid-4d26bl7g>← Back to Gallery</a> <div id="sign-in-container" data-astro-cid-4d26bl7g> ${renderComponent($$result, "SignIn", $$SignIn$1, { "routing": "hash", "data-astro-cid-4d26bl7g": true })} </div> </body></html>`;
}, "/Users/steolly/Desktop/Gemini/Antigravity/my-gallery/src/pages/sign-in.astro", void 0);
const $$file = "/Users/steolly/Desktop/Gemini/Antigravity/my-gallery/src/pages/sign-in.astro";
const $$url = "/sign-in";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$SignIn,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  renderers
};
