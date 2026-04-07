import { c as createComponent, d as renderTemplate, e as defineScriptVars, f as addAttribute, m as maybeRenderHead, g as createAstro } from "./astro/server_B9s7nlmx.mjs";
import "kleur/colors";
import "clsx";
import "@clerk/shared/underscore";
import { customAlphabet, urlAlphabet } from "nanoid";
var generateSafeId = (defaultSize = 10) => customAlphabet(urlAlphabet, defaultSize)();
var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$InternalUIComponentRenderer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$InternalUIComponentRenderer;
  const { component, id, ...props } = Astro2.props;
  const safeId = id || generateSafeId();
  return renderTemplate(_a || (_a = __template(["", "<div", "></div> <script>(function(){", "\n  /**\n   * Store the id and the props for the Astro component in order to mount the correct UI component once clerk is loaded.\n   * The above is handled by `mountAllClerkAstroJSComponents`.\n   */\n  const setOrCreatePropMap = ({ category, id, props }) => {\n    if (!window.__astro_clerk_component_props) {\n      window.__astro_clerk_component_props = new Map();\n    }\n\n    if (!window.__astro_clerk_component_props.has(category)) {\n      const _ = new Map();\n      _.set(id, props);\n      window.__astro_clerk_component_props.set(category, _);\n    }\n\n    window.__astro_clerk_component_props.get(category)?.set(id, props);\n  };\n\n  setOrCreatePropMap({\n    category: component,\n    id: `clerk-${component}-${safeId}`,\n    props,\n  });\n})();<\/script>"], ["", "<div", "></div> <script>(function(){", "\n  /**\n   * Store the id and the props for the Astro component in order to mount the correct UI component once clerk is loaded.\n   * The above is handled by \\`mountAllClerkAstroJSComponents\\`.\n   */\n  const setOrCreatePropMap = ({ category, id, props }) => {\n    if (!window.__astro_clerk_component_props) {\n      window.__astro_clerk_component_props = new Map();\n    }\n\n    if (!window.__astro_clerk_component_props.has(category)) {\n      const _ = new Map();\n      _.set(id, props);\n      window.__astro_clerk_component_props.set(category, _);\n    }\n\n    window.__astro_clerk_component_props.get(category)?.set(id, props);\n  };\n\n  setOrCreatePropMap({\n    category: component,\n    id: \\`clerk-\\${component}-\\${safeId}\\`,\n    props,\n  });\n})();<\/script>"])), maybeRenderHead(), addAttribute(`clerk-${component}-${safeId}`, "data-clerk-id"), defineScriptVars({ props, component, safeId }));
}, "/Users/steolly/Desktop/Gemini/Antigravity/my-gallery/node_modules/@clerk/astro/components/interactive/InternalUIComponentRenderer.astro", void 0);
export {
  $$InternalUIComponentRenderer as $
};
