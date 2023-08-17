<script lang="ts" setup>
definePageMeta({
  title: 'tuble.headTitle',
  description: 'tuble.headDescription'
})
</script>

<template>
  <section class="game-container">
    <TubleGame />
  </section>
</template>

<style scoped>
section.game-container {
  max-width: var(--tuble-max-width);
  margin: calc(-0.5 * var(--top-space)) auto 0;
}

@media (min-width: 576px) {
  section.game-container {
    margin: calc(-1 * var(--top-space) + var(--main-margin)) auto 0;
  }
}
</style>
