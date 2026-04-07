import { renderers } from "./renderers.mjs";
import { c as createExports } from "./chunks/entrypoint_DZRZYzz1.mjs";
import { manifest } from "./manifest_CKlfamP8.mjs";
const _page0 = () => import("./pages/_image.astro.mjs");
const _page1 = () => import("./pages/api/finalize-registration.astro.mjs");
const _page2 = () => import("./pages/api/migrate.astro.mjs");
const _page3 = () => import("./pages/api/posts.astro.mjs");
const _page4 = () => import("./pages/api/stacks/_id_.astro.mjs");
const _page5 = () => import("./pages/api/stacks.astro.mjs");
const _page6 = () => import("./pages/api/upload.astro.mjs");
const _page7 = () => import("./pages/api/verify-invite.astro.mjs");
const _page8 = () => import("./pages/finalize.astro.mjs");
const _page9 = () => import("./pages/sign-in.astro.mjs");
const _page10 = () => import("./pages/sign-up.astro.mjs");
const _page11 = () => import("./pages/index.astro.mjs");
const pageMap = /* @__PURE__ */ new Map([
  ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
  ["src/pages/api/finalize-registration.ts", _page1],
  ["src/pages/api/migrate.ts", _page2],
  ["src/pages/api/posts.ts", _page3],
  ["src/pages/api/stacks/[id].ts", _page4],
  ["src/pages/api/stacks.ts", _page5],
  ["src/pages/api/upload.ts", _page6],
  ["src/pages/api/verify-invite.ts", _page7],
  ["src/pages/finalize.astro", _page8],
  ["src/pages/sign-in.astro", _page9],
  ["src/pages/sign-up.astro", _page10],
  ["src/pages/index.astro", _page11]
]);
const serverIslandMap = /* @__PURE__ */ new Map();
const _manifest = Object.assign(manifest, {
  pageMap,
  serverIslandMap,
  renderers,
  middleware: () => import("./_astro-internal_middleware.mjs")
});
const _args = {
  "middlewareSecret": "4e3b1d79-3a1b-44ca-b6df-0d27d26eaf13",
  "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
export {
  __astrojsSsrVirtualEntry as default,
  pageMap
};
