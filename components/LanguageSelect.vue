<script setup lang="ts">
defineProps({
  open: Boolean,
});
defineEmits(["close"]);

const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();
</script>

<template>
  <div class="langsel language-select-menu" :class="{ open }">
    <NuxtLink
      v-for="i in locales"
      :key="i.code"
      :to="switchLocalePath(i.code)"
      :class="{ active: i.code === locale }"
      @click="$emit('close')"
      >{{ i.name }}</NuxtLink
    >
  </div>
</template>

<style scoped>
div.langsel {
  pointer-events: none;
  position: absolute;
  top: 100%;
  right: 0;
  margin: var(--main-margin);
  border-radius: var(--main-margin);
  overflow: hidden;
  z-index: 10;
  opacity: 0;
  transition: opacity var(--transition-speed) ease-in-out,
    transform var(--transition-speed) ease-in-out,
    border var(--transition-speed-out-full) ease-in-out;
  background-color: var(--bg-menu);
  border: 1px solid var(--border-menu-hover);
  padding: var(--main-margin);
}

div.langsel.open {
  pointer-events: auto;
  opacity: 1;
  transform: translateY(0);
}

div.langsel > a {
  display: block;
  margin: calc(var(--main-margin) * 2);
  margin-left: calc(var(--main-margin) * 4);
  margin-right: calc(var(--main-margin) * 4);
}

div.langsel > a.active {
  color: var(--accent);
}

/* Desktop-only effects */
@media (hover: hover) {
  div.langsel {
    border: 1px solid var(--border-menu);
    opacity: 0;
  }

  div.langsel:hover {
    border: 1px solid var(--border-menu-hover);
    transition: border var(--transition-speed) ease-in-out;
  }
}
</style>
