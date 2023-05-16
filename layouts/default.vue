<script setup lang="ts">
import { ArrowLeft, IconoirProvider } from "@iconoir/vue";
</script>

<template>
  <div>
    <IconoirProvider
      :icon-props="{ color: 'currentColor', width: '1em', height: '1em' }"
    >
      <EffectHeader />
      <AppHeader />
      <div class="container">
        <NuxtPage />
        <NuxtErrorBoundary>
          <template #error="{ error, clearError }">
            <div class="fade-in">
              <ErrorCode :code="error.statusCode" />
              <br />
              <h2>Error inesperado</h2>
              <ButtonRow>
                <EffectButton
                  :text="'return home'"
                  colour="--error"
                  @click="clearError"
                  ><ArrowLeft
                /></EffectButton>
              </ButtonRow>
            </div>
          </template>
        </NuxtErrorBoundary>
        <HorizontalDivider />
        <AppFooter />
      </div>
    </IconoirProvider>
  </div>
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

h2 {
  text-align: center;
}

div.fade-in {
  animation: fade-in 4s;
  animation-iteration-count: 1;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
