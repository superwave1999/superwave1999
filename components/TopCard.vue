<template>
  <div class="card">
    <div class="text">
      <h1>{{ $t("topcard.name") }}</h1>
      <h2>{{ $t("topcard.short") }}</h2>
    </div>
    <img
      src="https://avatars.githubusercontent.com/u/37277561"
      :alt="$t('topcard.name')"
    >
  </div>
</template>

<style scoped>
div.card {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
}

img {
  margin: 2em auto;
  width: 100%;
  max-width: 160px;
  object-fit: contain;
  border: 3px solid var(--text);
  border-radius: 999vw;
}

@media (min-width: 576px) {
  div.text {
    width: 50%;
  }

  h2 {
    margin-right: 6ch;
  }

  img {
    width: 33%;
    max-width: 260px;
  }
}
</style>
