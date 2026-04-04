import { c as createComponent, h as renderComponent, d as renderTemplate, g as createAstro, m as maybeRenderHead, j as renderSlot, k as mergeSlots, e as defineScriptVars, r as renderHead, f as addAttribute } from "../chunks/astro/server_B9s7nlmx.mjs";
import "kleur/colors";
/* empty css                                 */
import "clsx";
import { $ as $$InternalUIComponentRenderer } from "../chunks/InternalUIComponentRenderer_Bk0wuhUs.mjs";
import { renderers } from "../renderers.mjs";
const $$Astro$8 = createAstro();
const $$ShowCSR = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$ShowCSR;
  const { when, class: className } = Astro2.props;
  const isStringWhen = typeof when === "string";
  const whenCondition = isStringWhen ? when : null;
  const role = !isStringWhen && typeof when === "object" ? when.role : void 0;
  const permission = !isStringWhen && typeof when === "object" ? when.permission : void 0;
  const feature = !isStringWhen && typeof when === "object" ? when.feature : void 0;
  const plan = !isStringWhen && typeof when === "object" ? when.plan : void 0;
  return renderTemplate`${renderComponent($$result, "clerk-show", "clerk-show", { "data-when": whenCondition, "data-role": role, "data-permission": permission, "data-feature": feature, "data-plan": plan, "class": className }, { "default": () => renderTemplate` ${maybeRenderHead()}<div hidden data-clerk-control-slot-default> ${renderSlot($$result, $$slots["default"])} </div> <div hidden data-clerk-control-slot-fallback> ${renderSlot($$result, $$slots["fallback"])} </div> ` })} `;
}, "/Users/steolly/Desktop/Gemini/Antigravity/my-gallery/node_modules/@clerk/astro/components/control/ShowCSR.astro", void 0);
const $$Astro$7 = createAstro();
const $$ShowSSR = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$ShowSSR;
  const { has, userId } = Astro2.locals.auth();
  const { when } = Astro2.props;
  const showContent = (() => {
    if (when === "signed-in") return !!userId;
    if (when === "signed-out") return !userId;
    if (typeof when === "function") return !!userId && when(has);
    if (typeof when === "object" && when !== null) {
      if (!userId) return false;
      return has(when);
    }
    return !!userId;
  })();
  const hasShowFallback = Astro2.slots.has("show-fallback");
  return renderTemplate`${showContent ? renderTemplate`${renderSlot($$result, $$slots["default"])}` : hasShowFallback ? renderTemplate`${renderSlot($$result, $$slots["show-fallback"])}` : renderTemplate`${renderSlot($$result, $$slots["fallback"])}`}`;
}, "/Users/steolly/Desktop/Gemini/Antigravity/my-gallery/node_modules/@clerk/astro/components/control/ShowSSR.astro", void 0);
const configOutput = "hybrid";
function isStaticOutput(forceStatic) {
  if (forceStatic === void 0) {
    return true;
  }
  if (forceStatic !== void 0) {
    return forceStatic;
  }
  return configOutput === "static";
}
const $$Astro$6 = createAstro();
const $$Show = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Show;
  const { isStatic, when, ...rest } = Astro2.props;
  if (typeof when === "undefined") {
    throw new Error("@clerk/astro: <Show /> requires a `when` prop.");
  }
  const props = { ...rest, when };
  const shouldUseCSR = isStatic !== void 0 ? isStaticOutput(isStatic) : !Astro2.locals?.auth;
  const ShowComponent = shouldUseCSR ? $$ShowCSR : $$ShowSSR;
  const hasShowFallback = Astro2.slots.has("show-fallback");
  return renderTemplate`${renderComponent($$result, "ShowComponent", ShowComponent, { ...props }, mergeSlots({ "default": ($$result2) => renderTemplate` ${renderSlot($$result2, $$slots["default"])} ` }, hasShowFallback ? { "show-fallback": () => renderTemplate`${renderSlot($$result, $$slots["show-fallback"])}` } : { "fallback": () => renderTemplate`${renderSlot($$result, $$slots["fallback"])}` }))}`;
}, "/Users/steolly/Desktop/Gemini/Antigravity/my-gallery/node_modules/@clerk/astro/components/control/Show.astro", void 0);
const $$Astro$5 = createAstro();
const $$UserButton = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$UserButton;
  return renderTemplate`${renderComponent($$result, "InternalUIComponentRenderer", $$InternalUIComponentRenderer, { ...Astro2.props, "component": "user-button" })} ${renderSlot($$result, $$slots["default"])}`;
}, "/Users/steolly/Desktop/Gemini/Antigravity/my-gallery/node_modules/@clerk/astro/components/interactive/UserButton/UserButton.astro", void 0);
var __freeze$2 = Object.freeze;
var __defProp$2 = Object.defineProperty;
var __template$2 = (cooked, raw) => __freeze$2(__defProp$2(cooked, "raw", { value: __freeze$2(raw || cooked.slice()) }));
var _a$2;
const $$Astro$4 = createAstro();
const $$MenuItemRenderer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$MenuItemRenderer;
  const { label, href, open, clickIdentifier, parent } = Astro2.props;
  let labelIcon = "";
  if (Astro2.slots.has("label-icon")) {
    labelIcon = await Astro2.slots.render("label-icon");
  }
  const isDevMode = false;
  return renderTemplate(_a$2 || (_a$2 = __template$2(["<script>(function(){", "\n  const parentElement = document.currentScript.parentElement;\n\n  // We used a web component in the `<UserButton.MenuItems>` component.\n  const hasParentMenuItem = parentElement.tagName.toLowerCase() === 'clerk-user-button-menu-items';\n  if (!hasParentMenuItem) {\n    if (isDevMode) {\n      throw new Error(\n        `Clerk: <UserButton.MenuItems /> component can only accept <UserButton.Action /> and <UserButton.Link /> as its children. Any other provided component will be ignored.`,\n      );\n    }\n    return;\n  }\n\n  // Get the user button map from window that we set in the `<InternalUIComponentRenderer />`.\n  const userButtonComponentMap = window.__astro_clerk_component_props.get('user-button');\n\n  let userButton;\n  if (parent) {\n    userButton = document.querySelector(`[data-clerk-id=\"clerk-user-button-${parent}\"]`);\n  } else {\n    userButton = document.querySelector('[data-clerk-id^=\"clerk-user-button\"]');\n  }\n\n  const safeId = userButton.getAttribute('data-clerk-id');\n  const currentOptions = userButtonComponentMap.get(safeId);\n\n  const reorderItemsLabels = ['manageAccount', 'signOut'];\n  const isReorderItem = reorderItemsLabels.includes(label);\n\n  let newMenuItem = {\n    label,\n  };\n\n  if (!isReorderItem) {\n    newMenuItem = {\n      ...newMenuItem,\n      mountIcon: el => {\n        el.innerHTML = labelIcon;\n      },\n      unmountIcon: () => {\n        /* What to clean up? */\n      },\n    };\n\n    if (href) {\n      newMenuItem.href = href;\n    } else if (open) {\n      newMenuItem.open = open.startsWith('/') ? open : `/${open}`;\n    } else if (clickIdentifier) {\n      const clickEvent = new CustomEvent('clerk:menu-item-click', { detail: clickIdentifier });\n      newMenuItem.onClick = () => {\n        document.dispatchEvent(clickEvent);\n      };\n    }\n  }\n\n  userButtonComponentMap.set(safeId, {\n    ...currentOptions,\n    customMenuItems: [...(currentOptions?.customMenuItems ?? []), newMenuItem],\n  });\n})();<\/script>"], ["<script>(function(){", "\n  const parentElement = document.currentScript.parentElement;\n\n  // We used a web component in the \\`<UserButton.MenuItems>\\` component.\n  const hasParentMenuItem = parentElement.tagName.toLowerCase() === 'clerk-user-button-menu-items';\n  if (!hasParentMenuItem) {\n    if (isDevMode) {\n      throw new Error(\n        \\`Clerk: <UserButton.MenuItems /> component can only accept <UserButton.Action /> and <UserButton.Link /> as its children. Any other provided component will be ignored.\\`,\n      );\n    }\n    return;\n  }\n\n  // Get the user button map from window that we set in the \\`<InternalUIComponentRenderer />\\`.\n  const userButtonComponentMap = window.__astro_clerk_component_props.get('user-button');\n\n  let userButton;\n  if (parent) {\n    userButton = document.querySelector(\\`[data-clerk-id=\"clerk-user-button-\\${parent}\"]\\`);\n  } else {\n    userButton = document.querySelector('[data-clerk-id^=\"clerk-user-button\"]');\n  }\n\n  const safeId = userButton.getAttribute('data-clerk-id');\n  const currentOptions = userButtonComponentMap.get(safeId);\n\n  const reorderItemsLabels = ['manageAccount', 'signOut'];\n  const isReorderItem = reorderItemsLabels.includes(label);\n\n  let newMenuItem = {\n    label,\n  };\n\n  if (!isReorderItem) {\n    newMenuItem = {\n      ...newMenuItem,\n      mountIcon: el => {\n        el.innerHTML = labelIcon;\n      },\n      unmountIcon: () => {\n        /* What to clean up? */\n      },\n    };\n\n    if (href) {\n      newMenuItem.href = href;\n    } else if (open) {\n      newMenuItem.open = open.startsWith('/') ? open : \\`/\\${open}\\`;\n    } else if (clickIdentifier) {\n      const clickEvent = new CustomEvent('clerk:menu-item-click', { detail: clickIdentifier });\n      newMenuItem.onClick = () => {\n        document.dispatchEvent(clickEvent);\n      };\n    }\n  }\n\n  userButtonComponentMap.set(safeId, {\n    ...currentOptions,\n    customMenuItems: [...(currentOptions?.customMenuItems ?? []), newMenuItem],\n  });\n})();<\/script>"])), defineScriptVars({ label, href, open, clickIdentifier, labelIcon, isDevMode, parent }));
}, "/Users/steolly/Desktop/Gemini/Antigravity/my-gallery/node_modules/@clerk/astro/components/interactive/UserButton/MenuItemRenderer.astro", void 0);
const $$Astro$3 = createAstro();
const $$UserButtonLink = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$UserButtonLink;
  const { label, href, parent } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "MenuItemRenderer", $$MenuItemRenderer, { "label": label, "href": href, "parent": parent }, { "label-icon": ($$result2) => renderTemplate`${renderSlot($$result2, $$slots["label-icon"])}` })}`;
}, "/Users/steolly/Desktop/Gemini/Antigravity/my-gallery/node_modules/@clerk/astro/components/interactive/UserButton/UserButtonLink.astro", void 0);
const $$Astro$2 = createAstro();
const $$UserButtonAction = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$UserButtonAction;
  const { label, open, clickIdentifier, parent } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "MenuItemRenderer", $$MenuItemRenderer, { "label": label, "open": open, "clickIdentifier": clickIdentifier, "parent": parent }, { "label-icon": ($$result2) => renderTemplate`${renderSlot($$result2, $$slots["label-icon"])}` })}`;
}, "/Users/steolly/Desktop/Gemini/Antigravity/my-gallery/node_modules/@clerk/astro/components/interactive/UserButton/UserButtonAction.astro", void 0);
const $$UserButtonMenuItems = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "clerk-user-button-menu-items", "clerk-user-button-menu-items", {}, { "default": () => renderTemplate` ${renderSlot($$result, $$slots["default"])} ` })} `;
}, "/Users/steolly/Desktop/Gemini/Antigravity/my-gallery/node_modules/@clerk/astro/components/interactive/UserButton/UserButtonMenuItems.astro", void 0);
var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(raw || cooked.slice()) }));
var _a$1;
const $$Astro$1 = createAstro();
const $$UserButtonUserProfilePage = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$UserButtonUserProfilePage;
  const { url, label, parent } = Astro2.props;
  let labelIcon = "";
  let content = "";
  if (Astro2.slots.has("label-icon")) {
    labelIcon = await Astro2.slots.render("label-icon");
  }
  if (Astro2.slots.has("default")) {
    content = await Astro2.slots.render("default");
  }
  return renderTemplate(_a$1 || (_a$1 = __template$1(["<script>(function(){", "\n  // Get the user button map from window that we set in the `<InternalUIComponentRenderer />`.\n  const userButtonComponentMap = window.__astro_clerk_component_props.get('user-button');\n\n  let userButton;\n  if (parent) {\n    userButton = document.querySelector(`[data-clerk-id=\"clerk-user-button-${parent}\"]`);\n  } else {\n    userButton = document.querySelector('[data-clerk-id^=\"clerk-user-button\"]');\n  }\n\n  const safeId = userButton.getAttribute('data-clerk-id');\n  const currentOptions = userButtonComponentMap.get(safeId);\n\n  const newCustomPage = {\n    label,\n    url,\n    mountIcon: el => {\n      el.innerHTML = labelIcon;\n    },\n    unmountIcon: () => {\n      /* What to clean up? */\n    },\n    mount: el => {\n      el.innerHTML = content;\n    },\n    unmount: () => {\n      /* What to clean up? */\n    },\n  };\n\n  userButtonComponentMap.set(safeId, {\n    ...currentOptions,\n    userProfileProps: {\n      customPages: [...(currentOptions?.userProfileProps?.customPages ?? []), newCustomPage],\n    },\n  });\n})();<\/script>"], ["<script>(function(){", "\n  // Get the user button map from window that we set in the \\`<InternalUIComponentRenderer />\\`.\n  const userButtonComponentMap = window.__astro_clerk_component_props.get('user-button');\n\n  let userButton;\n  if (parent) {\n    userButton = document.querySelector(\\`[data-clerk-id=\"clerk-user-button-\\${parent}\"]\\`);\n  } else {\n    userButton = document.querySelector('[data-clerk-id^=\"clerk-user-button\"]');\n  }\n\n  const safeId = userButton.getAttribute('data-clerk-id');\n  const currentOptions = userButtonComponentMap.get(safeId);\n\n  const newCustomPage = {\n    label,\n    url,\n    mountIcon: el => {\n      el.innerHTML = labelIcon;\n    },\n    unmountIcon: () => {\n      /* What to clean up? */\n    },\n    mount: el => {\n      el.innerHTML = content;\n    },\n    unmount: () => {\n      /* What to clean up? */\n    },\n  };\n\n  userButtonComponentMap.set(safeId, {\n    ...currentOptions,\n    userProfileProps: {\n      customPages: [...(currentOptions?.userProfileProps?.customPages ?? []), newCustomPage],\n    },\n  });\n})();<\/script>"])), defineScriptVars({ url, label, content, labelIcon, parent }));
}, "/Users/steolly/Desktop/Gemini/Antigravity/my-gallery/node_modules/@clerk/astro/components/interactive/UserButton/UserButtonUserProfilePage.astro", void 0);
const UserButton = Object.assign($$UserButton, {
  MenuItems: $$UserButtonMenuItems,
  Link: $$UserButtonLink,
  Action: $$UserButtonAction,
  UserProfilePage: $$UserButtonUserProfilePage
});
var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const auth = Astro2.locals.auth();
  const currentUserId = auth?.userId || null;
  let isCurrentUserAdmin = false;
  if (currentUserId) {
    const { isAdmin } = await import("../chunks/auth_BwoPjZN5.mjs");
    isCurrentUserAdmin = await isAdmin(currentUserId);
  }
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><meta name="generator"', '><title>THE GALLERY BY F.Y.</title><!-- PhotoSwipe CSS --><link rel="stylesheet" href="https://unpkg.com/photoswipe@5.4.3/dist/photoswipe.css"><!-- Mixed Typography: Montserrat (UI) & Cormorant Garamond (Editorial) --><link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Montserrat:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">', '</head> <body> <!-- Transparent Minimalist Navigation --> <nav class="minimal-nav"> <div class="nav-brand">THE GALLERY</div> <div class="nav-links"> <a href="#contact" class="nav-link">Contact</a> ', " ", ' </div> </nav> <!-- Full-Screen Hero Section --> <header class="hero-section"> <img src="/images/hero_background.jpg" alt="Hero Photography" class="hero-bg"> <div class="hero-content"> <h1 class="hero-title">Selected Works</h1> <p class="hero-subtitle">Visual exploration and storytelling.</p> </div> <div class="scroll-indicator"> <span>SCROLL</span> <svg class="scroll-arrow-full" width="40" height="50" viewBox="0 0 40 50" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> <!-- Stem connected to tip, 33px long --> <line x1="20" y1="0" x2="20" y2="33"></line> <!-- Widened tip based on 33px vertex --> <polyline points="5 18 20 33 35 18"></polyline> </svg> </div> <div class="gallery-divider hero-divider"></div> </header> <main class="gallery-grid" id="gallery"> <!-- Gallery items rendered dynamically by client JS --> <div class="gallery-loading" id="gallery-loading"> <div class="loading-spinner"></div> </div> </main> <div class="gallery-bottom-bar" id="gallery-bottom-bar" style="display: none;"> <div class="edit-controls"> <button class="action-btn" id="open-edit-mode">Edit</button> <div id="edit-actions" class="hidden"> <button class="action-btn" id="cancel-edits">Cancel</button> <button class="action-btn confirm" id="add-new-post">Import</button> <button class="action-btn confirm" id="save-edits">Done</button> </div> </div> </div> <div class="gallery-divider"></div> <section id="contact" class="contact-section"> <div class="contact-container"> <h2 class="contact-title">Contact</h2> <div class="contact-list"> <div class="contact-item"> <svg class="contact-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> <a href="mailto:SMYFY1@OUTLOOK.COM">SMYFY1@OUTLOOK.COM</a> </div> <div class="contact-item"> <svg class="contact-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg> <a href="https://instagram.com/theonlyyff" target="_blank">@THEONLYYFF</a> </div> </div> </div> </section> <footer style="padding: 2rem 0 1rem; text-align: center; color: rgba(255,255,255,0.3); font-size: 0.8rem; letter-spacing: 0.1rem;">\n&copy; 2026 THE GALLERY BY F.Y. | v1.1.0\n</footer> <!-- Import Modal --> <div class="modal-overlay" id="import-modal"> <div class="modal-content"> <h3 class="modal-title" style="margin-bottom: 3rem; letter-spacing: 0.2em;">IMPORT NEW WORK</h3> <div id="local-tab" class="tab-content active"> <div class="modal-input-group"> <label class="modal-caption" style="margin-bottom: 1.5rem; display: block;">SELECT IMAGES</label> <div style="display: flex; align-items: center; justify-content: flex-start; gap: 1rem; margin-bottom: 2.5rem;"> <label for="local-file-input" class="action-btn confirm" style="cursor: pointer; display: inline-block;">Choose Files</label> <span id="file-name-display" style="color: rgba(255,255,255,0.5); font-size: 0.8rem; letter-spacing: 0.1em; font-weight: 300;">No file chosen</span> </div> <label class="modal-caption" style="margin-top: 1rem; margin-bottom: 0.5rem; display: block;">ADD A CAPTION</label> <textarea id="local-caption-input" class="mini-caption-textarea" placeholder="Say Something?" rows="2"></textarea> <div class="mini-author-group"> <span class="mini-author-label">BY</span> <input type="text" id="local-author-input" class="mini-author-input" placeholder="J. Doe"> </div> </div> </div> <div class="modal-actions" style="margin-top: 1rem; justify-content: center; gap: 1.5rem;"> <button class="action-btn" id="close-import-modal">Cancel</button> <button class="action-btn confirm" id="confirm-import">Confirm</button> </div> </div> </div> <!-- Mini Gallery Edit Modal --> <div class="modal-overlay" id="mini-gallery-modal"> <div class="modal-content"> <h3 class="modal-title">Edit Stack</h3> <p class="modal-caption" style="margin-bottom: 0;">Drag to reorder, click × to delete</p> <div id="mini-gallery-grid" class="mini-gallery-grid"></div> <textarea id="mini-caption-input" class="mini-caption-textarea" placeholder="Say Something?" rows="2"></textarea> <div class="mini-author-group"> <span class="mini-author-label">BY</span> <input type="text" id="mini-author-input" class="mini-author-input" placeholder="J. Doe"> </div> <div class="modal-actions" style="margin-top: 2rem; justify-content: flex-end; gap: 1.5rem;"> <button class="action-btn" id="close-mini-gallery">Cancel</button> <button class="action-btn confirm" id="mini-import-btn" style="color: black;">Import</button> <button class="action-btn confirm" id="confirm-mini-gallery">Done</button> </div> </div> </div> <!-- Confirm Discard Modal --> <div class="modal-overlay" id="confirm-discard-modal" style="z-index: 2000;"> <div class="modal-content"> <h3 class="modal-title">Discard Changes</h3> <p class="modal-caption" style="margin-bottom: 2rem;">All unsaved changes will be discarded. Are you sure you want to cancel?</p> <div class="modal-actions" style="justify-content: center; gap: 2rem; margin-top: 2rem;"> <button class="action-btn" id="cancel-discard-btn">No</button> <button class="action-btn confirm" id="confirm-discard-btn" style="color: #e11d48;">Yes, Discard</button> </div> </div> </div> <!-- Confirm Delete Modal --> <div class="modal-overlay" id="confirm-delete-modal" style="z-index: 2000;"> <div class="modal-content"> <h3 class="modal-title">Delete Stack</h3> <p class="modal-caption" style="margin-bottom: 2rem;">Are you sure you want to delete this stack? This action cannot be undone.</p> <div class="modal-actions" style="justify-content: center; gap: 2rem; margin-top: 2rem;"> <button class="action-btn" id="cancel-delete-btn">Cancel</button> <button class="action-btn confirm" id="confirm-delete-btn" style="color: #e11d48;">Delete</button> </div> </div> </div> <!-- Progress Modal --> <div class="modal-overlay" id="progress-modal"> <div class="modal-content"> <h3 class="modal-title" id="progress-title">Importing...</h3> <div class="progress-container"> <div class="progress-bar" id="progress-bar-inner"></div> </div> <p class="progress-status" id="progress-status-text">Preparing...</p> <div class="modal-actions" style="justify-content: center; margin-top: 0.5rem;"> <button class="refresh-btn" id="refresh-page-btn">Refresh</button> </div> </div> </div> <!-- File inputs OUTSIDE all modals to prevent file picker from closing modals --> <input type="file" id="local-file-input" multiple accept="image/*" style="position: absolute; width: 1px; height: 1px; opacity: 0; overflow: hidden; clip: rect(0,0,0,0);"> <input type="file" id="mini-file-input" multiple accept="image/*" style="position: absolute; width: 1px; height: 1px; opacity: 0; overflow: hidden; clip: rect(0,0,0,0);">  <script>(function(){', "\n      window.__AUTH__ = {\n        userId: currentUserId,\n        isAdmin: isCurrentUserAdmin,\n      };\n    })();<\/script>  </body> </html>"])), addAttribute(Astro2.generator, "content"), renderHead(), renderComponent($$result, "Show", $$Show, { "when": "signedOut" }, { "default": async ($$result2) => renderTemplate` <a href="/sign-in" class="nav-link">Login</a> <a href="/sign-up" class="nav-link">Register</a> ` }), renderComponent($$result, "Show", $$Show, { "when": "signedIn" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "UserButton", UserButton, {})} ` }), defineScriptVars({ currentUserId, isCurrentUserAdmin }));
}, "/Users/steolly/Desktop/Gemini/Antigravity/my-gallery/src/pages/index.astro", void 0);
const $$file = "/Users/steolly/Desktop/Gemini/Antigravity/my-gallery/src/pages/index.astro";
const $$url = "";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  renderers
};
