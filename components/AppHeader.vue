<script setup lang="ts">
import { PhArrowLeft, PhTranslate, PhMoon, PhSun } from "@phosphor-icons/vue";

const { locale } = useI18n();
const route = useRoute();
const colorMode = useColorMode();
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

const previousRoute = computed(() => {
  if (route.path === `/${locale.value}` || route.path === "/") {
    return "";
  }
  const newpath = route.path.substring(0, route.path.lastIndexOf("/"));
  return newpath || "/";
});

const themeIconColour = computed(() => {
  return colorMode.value === "dark" ? "--enable-light" : "--enable-dark";
});

function toggleColorMode() {
  if (colorMode.value === "light") {
    colorMode.preference = "dark";
  } else {
    colorMode.preference = "light";
  }
}
</script>

<template>
  <nav class="navbar">
    <div class="items" :class="{ shift: !previousRoute }">
      <EffectButton class="back-arrow" :to="previousRoute"
        ><PhArrowLeft size="1em" color="currentColor"
      /></EffectButton>
      <h1>IR<span>_</span></h1>
    </div>
    <div class="spacer" />
    <EffectButton :colour="themeIconColour" @click="toggleColorMode">
      <PhMoon
        v-if="colorMode.value === 'light'"
        size="1em"
        color="currentColor"
      />
      <PhSun
        v-if="colorMode.value === 'dark'"
        size="1em"
        color="currentColor"
      />
    </EffectButton>
    <div class="spacer-mini" />
    <EffectButton
      :disabled="languageSelector"
      @click="languageSelector = !languageSelector"
      ><PhTranslate size="1em" color="currentColor"
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
  bottom: 14px;
  animation: terminal-flash 1s infinite;
}

div.spacer {
  margin: 0 auto;
}

div.spacer-mini {
  width: var(--main-margin);
}
</style>
