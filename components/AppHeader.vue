<script setup lang="ts">
import { ArrowLeft, Globe, HalfMoon, SunLight } from "@iconoir/vue";

const colorMode = useColorMode();

const themeIconColour = computed(() => {
  return colorMode.value === "dark" ? "--enable-light" : "--enable-dark";
});

const languageSelector = ref(false);
onMounted(() => {
  document.addEventListener("mousedown", (e) => {
    const containers = document.getElementsByClassName("language-select-menu");
    const max = containers.length;
    let count = 0;
    for (const c of containers) {
      if (!c.contains(e.target as Node)) {
        count++;
      }
    }
    if (max === count) {
      languageSelector.value = false;
    }
  });
});

const localeRoute = useLocaleRoute();
const { locale } = useI18n();
const route = useRoute();

const previousRoute = computed(() => {
  const localizedRoute = localeRoute(route.path, locale.value);
  const routeSanitized = localizedRoute != null ? localizedRoute.path : "/";
  return routeSanitized.substring(0, routeSanitized.lastIndexOf("/"));
});

function toggleColorMode() {
  colorMode.value === "light"
    ? (colorMode.preference = "dark")
    : (colorMode.preference = "light");
}
</script>

<template>
  <nav class="navbar">
    <div class="items" :class="{ shift: !previousRoute }">
      <EffectButton class="back-arrow" :to="previousRoute"
        ><ArrowLeft
      /></EffectButton>
      <h1>IR<span>_</span></h1>
    </div>
    <div class="spacer" />
    <EffectButton :colour="themeIconColour" @click="toggleColorMode">
      <HalfMoon v-if="colorMode.value === 'light'" />
      <SunLight v-if="colorMode.value === 'dark'" />
    </EffectButton>
    <div class="spacer-mini" />
    <EffectButton
      :disabled="languageSelector"
      @click="languageSelector = !languageSelector"
      ><Globe
    /></EffectButton>
    <LanguageSelect
      :open="languageSelector"
      @close="languageSelector = false"
    />
  </nav>
</template>

<style scoped>
@keyframes terminal-flash {
  0% {
    color: var(--accent);
  }

  49% {
    color: var(--accent);
  }

  60% {
    color: transparent;
  }

  99% {
    color: transparent;
  }

  100% {
    color: var(--accent);
  }
}

.navbar {
  position: fixed;

  top: 0;
  width: 100%;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;

  padding: var(--main-margin);
  z-index: 1000;
}

.navbar h1 {
  font-size: var(--section-size);
  margin: 0.4ch 2ch 0;
  position: relative;
}

.navbar .items {
  display: flex;
  transition: margin-left var(--transition-speed) ease-in-out;
}

.navbar .items.shift {
  margin-left: calc(0ch - (var(--btn-height) + var(--main-margin) + 1px));
}

.navbar h1 span {
  color: var(--accent);
  position: absolute;
  bottom: 0.155ch;
  right: -0.799ch;
  animation: terminal-flash 1s infinite;
}

div.spacer {
  margin: 0 auto;
}

div.spacer-mini {
  width: var(--main-margin);
}
</style>
