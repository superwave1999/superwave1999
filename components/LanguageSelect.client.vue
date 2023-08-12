<script setup lang="ts">
defineProps({
  open: Boolean,
});
const emit = defineEmits(["close"]);

const { locale, locales, setLocale } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const route = useRoute();
const getRouteBaseName = useRouteBaseName();
const baseRouteName = computed(() => {
  return getRouteBaseName(route);
});

const isTuble = computed(() => {
  return baseRouteName.value === "tuble";
});

function doClick(code: string) {
  if (isTuble.value) {
    setLocale(code);
    history.pushState({}, "", `${window.location.origin}/${code}/tuble`);
  }
  emit("close");
}
</script>

<template>
  <div class="popup langsel language-select-menu" :class="{ open }">
    <NuxtLink
      v-for="i in locales"
      :key="i.code"
      :to="!isTuble ? switchLocalePath(i.code) : undefined"
      :class="{ active: i.code === locale }"
      @click="() => doClick(i.code)"
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
  transform: translateY(-6px);
  transition: opacity var(--transition-speed) ease-in-out,
    transform var(--transition-speed) ease-in-out;
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
  cursor: pointer;
}

div.langsel > a.active {
  color: var(--accent);
  pointer-events: none;
}
</style>
