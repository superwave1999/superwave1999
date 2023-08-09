<script setup lang="ts">
import { ModalsContainer } from "vue-final-modal";
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
    <ModalsContainer />
  </IconoirProvider>
</template>

<style scoped>
div.container {
  width: 100%;
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding-left: var(--container-padding);
  padding-right: var(--container-padding);
  padding-top: var(--top-space);
}
</style>
