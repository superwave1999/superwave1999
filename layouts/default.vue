<script setup lang="ts">
import { IconoirProvider } from "@iconoir/vue";
</script>

<template>
  <IconoirProvider
    :icon-props="{ color: 'currentColor', width: '1em', height: '1em' }"
  >
    <EffectHeader />
    <AppHeader />
    <div class="container">
      <NuxtPage />
      <HorizontalDivider />
      <AppFooter />
    </div>
  </IconoirProvider>
</template>

<style scoped>
div.container {
  width: 100%;
  max-width: 100ch;
  margin: 0 auto;
  padding-left: 2ch;
  padding-right: 2ch;
  padding-top: var(--top-space);
}
</style>
