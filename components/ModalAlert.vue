<script setup lang="ts">
import { VueFinalModal } from "vue-final-modal";

defineProps<{
  title?: string;
}>();

const emit = defineEmits<{
  (e: "confirm"): void;
}>();
</script>

<template>
  <VueFinalModal
    class="modal"
    content-class="popup modalcontent"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
  >
    <h3 class="title">{{ title }}</h3>
    <slot />
    <div class="button-row">
      <EffectButton
        :text="$t('tuble.modal.confirm')"
        colour="--accent"
        mini
        @click="emit('confirm')"
      ></EffectButton>
    </div>
  </VueFinalModal>
</template>
