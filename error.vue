<script setup lang="ts">
import { ArrowLeft } from "@iconoir/vue";
defineProps({
  error: { type: Object, default: null },
});
const localePath = useLocalePath();
const handleError = () => clearError({ redirect: localePath("/") });
</script>

<template>
  <div class="fade-in">
    <ErrorCode :code="error?.statusCode || 404" />
    <br />
    <h2>{{ $t ? $t("err.top") : "" }}</h2>
    <ButtonRow>
      <EffectButton
        :text="$t ? $t('err.button') : ''"
        colour="--error"
        @click="handleError"
        ><ArrowLeft
      /></EffectButton>
    </ButtonRow>
  </div>
</template>

<style scoped>
h2 {
  text-align: center;
}

div.fade-in {
  padding-top: var(--top-space);
  animation: fade-in 4s;
  animation-iteration-count: 1;
  overflow: hidden;
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
