<script setup lang="ts">
const localePath = useLocalePath();

const props = defineProps({
  iconRight: { type: Boolean, default: false },
  href: { type: String, default: null },
  to: { type: String, default: null },
  text: { type: String, default: "" },
  colour: { type: String, default: "" },
  mini: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
});

const cssBtnSize = computed(() => {
  return props.mini ? `var(--btn-height-mini)` : "var(--btn-height)";
});

const cssVarColour = computed(() => {
  return props.colour ? `var(${props.colour})` : "var(--accent)";
});

const cssVarColourHover = computed(() => {
  return props.colour
    ? `var(${props.colour}-border-hover)`
    : "var(--accent-border-hover)";
});

const cssVarColourActive = computed(() => {
  return props.colour
    ? `var(${props.colour}-border-active)`
    : "var(--accent-border-active)";
});

const getLink = computed(() => {
  let link = props.href;
  if (props.to) {
    link = localePath(props.to);
  }
  return link;
});

const getTarget = computed(() => {
  let target = "_blank";
  if (props.to) {
    target = "_self";
  }
  return target;
});

const shadowEffect = (e: MouseEvent) => {
  if (!e.target) {
    return false;
  }
  const link = (e.target as HTMLElement).closest("a.link");
  if (!link) {
    return false;
  }
  const dimensions = link.getBoundingClientRect();

  const mouseBoxL = e.clientX - dimensions.left;
  const mouseBoxT = e.clientY - dimensions.top;

  const l = dimensions.width - mouseBoxL;
  const t = dimensions.height - mouseBoxT;
  const blur = dimensions.width / 2.5;

  const linkElement = link.querySelector("svg.decoration");
  if (!linkElement) {
    return;
  }
  (
    linkElement as HTMLElement
  ).style.cssText = `left: ${l}px; top: ${t}px; filter: blur(${blur}px); color: ${cssVarColour.value}`;
};
</script>

<template>
  <NuxtLink
    :to="getLink"
    :target="getTarget"
    class="link"
    :class="{
      mini,
      text: Boolean(text),
      'icon-right': iconRight,
      noclick: disabled,
    }"
    @mouseenter="shadowEffect"
    @mousemove="shadowEffect"
    @mouseup="shadowEffect"
  >
    <svg
      class="decoration"
      xmlns="http://www.w3.org/2000/svg"
      xml:space="preserve"
      viewBox="0 0 1000 1000"
    >
      <path
        fill="currentColor"
        d="M10 500a490 490 0 1 0 980 0 490 490 0 0 0-980 0z"
      />
      <path
        fill="currentColor"
        d="m572 502 227-227a45 45 0 1 0-64-64L508 438 281 211a45 45 0 1 0-64 64l227 227-227 227a45 45 0 1 0 64 64l227-227 227 227a45 45 0 0 0 64 0c18-17 18-46 0-64L572 502z"
      />
    </svg>
    <div class="logo" :class="{ solo: !text }"><slot /></div>
    <span v-if="Boolean(text)">{{ text }}</span>
  </NuxtLink>
</template>

<style scoped>
.link {
  border: 1px solid transparent;
  border-radius: var(--main-margin);
  height: 0;
  position: relative;
  overflow: hidden;
  transition: border var(--transition-speed-out-full) ease-in-out;
  width: v-bind(cssBtnSize);
  padding-bottom: v-bind(cssBtnSize);
}

.link.noclick {
  pointer-events: none;
}

.link svg.decoration {
  z-index: 1;
  width: 150%;
  position: absolute;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity var(--transition-speed-out-mid) ease-in-out;
  color: transparent; /* avoid uglies before full load */
}

.link.text {
  height: v-bind(cssBtnSize);
  width: auto;
  padding: 2ch 3ch;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
}

.link.text.mini {
  padding: 1ch 1.5ch;
}

.link span {
  display: inline;
  z-index: 2;
  font-family: var(--typeface-mono);
  font-size: var(--highlight-size);
  font-weight: var(--font-thicc);
  margin: 0 var(--main-margin);
  padding: 0;
}

.link div.logo {
  z-index: 2;
  display: flex;
  align-items: center;
  font-size: 1.2em;
}

.link div.logo.solo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2em;
}

a {
  text-decoration: none;
  cursor: pointer;
  color: var(--text);
}

.link:active {
  color: unset;
  transition: unset;
  border: 1px solid v-bind(cssVarColourActive);
}

.link.icon-right div.logo {
  order: 3;
}

/* Desktop-only effects */
@media (hover: hover) {
  .link {
    transition: border var(--transition-speed-out-full) ease-in-out;
  }

  .link:hover,
  .link:active {
    transition: border var(--transition-speed) ease-in-out;
  }

  .link:hover {
    border: 1px solid v-bind(cssVarColourHover);
  }

  .link:hover svg.decoration {
    opacity: 0.3;
    transition: opacity var(--transition-speed) ease-in-out;
  }
}
</style>
