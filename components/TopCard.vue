<template>
  <div class="card">
    <div class="text">
      <h1>{{ $t("topcard.name") }}</h1>
      <h2>{{ $t("topcard.short") }}</h2>
    </div>
    <img
      src="https://avatars.githubusercontent.com/u/37277561"
      :alt="$t('topcard.name')"
    />
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
  animation-duration: 30s;
  animation-name: animimg;
  animation-direction: normal;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

@keyframes animimg {
  0% {
    border-radius: 40% 60% 70% 30% / 46% 30% 70% 54%;
  }
  20% {
    border-radius: 66% 34% 53% 47% / 44% 59% 41% 56%;
  }
  40% {
    border-radius: 56% 44% 44% 56% / 68% 49% 51% 32%;
  }
  60% {
    border-radius: 50% 50% 48% 52% / 48% 61% 39% 52%;
  }
  80% {
    border-radius: 61% 39% 27% 73% / 67% 40% 60% 33%;
  }
  100% {
    border-radius: 40% 60% 70% 30% / 46% 30% 70% 54%;
  }
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
