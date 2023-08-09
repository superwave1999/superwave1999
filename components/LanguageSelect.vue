<script setup lang="ts">
defineProps({
  open: Boolean,
});
defineEmits(["close"]);

const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();
</script>

<template>
  <div class="popup langsel language-select-menu" :class="{ open }">
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
  overflow: hidden;
  opacity: 0;
  transition: opacity var(--transition-speed) ease-in-out,
    transform var(--transition-speed) ease-in-out,
    border var(--transition-speed-out-full) ease-in-out;
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
  pointer-events: none;
}
</style>
