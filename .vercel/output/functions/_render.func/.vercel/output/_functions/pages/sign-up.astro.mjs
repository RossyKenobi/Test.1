import { c as createComponent, h as renderComponent, d as renderTemplate, g as createAstro, r as renderHead } from "../chunks/astro/server_B9s7nlmx.mjs";
import "kleur/colors";
/* empty css                                   */
import { $ as $$InternalUIComponentRenderer } from "../chunks/InternalUIComponentRenderer_Bk0wuhUs.mjs";
import { renderers } from "../renderers.mjs";
const $$Astro = createAstro();
const $$SignUp$1 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SignUp$1;
  return renderTemplate`${renderComponent($$result, "InternalUIComponentRenderer", $$InternalUIComponentRenderer, { ...Astro2.props, "component": "sign-up" })}`;
}, "/Users/steolly/Desktop/Gemini/Antigravity/my-gallery/node_modules/@clerk/astro/components/interactive/SignUp.astro", void 0);
const prerender = false;
const $$SignUp = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en" data-astro-cid-eti64xk7> <head><title>Register - THE GALLERY</title><meta name="viewport" content="width=device-width, initial-scale=1.0"><link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">${renderHead()}</head> <body data-astro-cid-eti64xk7> <a href="/" class="back-link" data-astro-cid-eti64xk7>← Back to Gallery</a> <div id="invite-form" data-astro-cid-eti64xk7> <h3 style="margin-top: 0; letter-spacing: 0.25em; font-weight: 300;" data-astro-cid-eti64xk7>INVITATION</h3> <input type="text" id="invite-input" placeholder="ENTER CODE" data-astro-cid-eti64xk7> <button id="verify-btn" data-astro-cid-eti64xk7>Verify</button> <div id="error-msg" data-astro-cid-eti64xk7>Invalid Code</div> </div> <div id="sign-up-container" data-astro-cid-eti64xk7> ${renderComponent($$result, "SignUp", $$SignUp$1, { "routing": "hash", "fallbackRedirectUrl": "/finalize", "data-astro-cid-eti64xk7": true })} </div>  </body> </html>`;
}, "/Users/steolly/Desktop/Gemini/Antigravity/my-gallery/src/pages/sign-up.astro", void 0);
const $$file = "/Users/steolly/Desktop/Gemini/Antigravity/my-gallery/src/pages/sign-up.astro";
const $$url = "/sign-up";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$SignUp,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  renderers
};
