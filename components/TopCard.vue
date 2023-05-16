<template>
  <div class="card">
    <div class="text">
      <h1>{{ $t("topcard.name") }}</h1>
      <h2>{{ $t("topcard.short") }}</h2>
    </div>
    <img src="https://avatars.githubusercontent.com/u/37277561" alt="me" />
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
  width: 100%;
  object-fit: contain;
}

@media (min-width: 576px) {
  div.text {
    width: 50%;
  }

  h2 {
    margin-right: 6ch;
  }

  img {
    margin-left: auto;
    width: 50%;
    max-width: 44ch;
    object-fit: contain;
  }
}
</style>
