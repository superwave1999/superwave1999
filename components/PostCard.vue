<script setup lang="ts">
const props = defineProps({
  post: { type: Object, default: null },
});

const localeRoute = useLocaleRoute();
const localePath = useLocalePath();
const { locale } = useI18n();
const route = useRoute();
const url = computed(() => {
  if (!props.post) {
    return "";
  }
  const contentPaths = props.post._path
    .split("/")
    .filter((entry: string) => entry !== "");
  const localizedRoute = localeRoute(route.path, locale.value);
  const routeSanitized = localizedRoute != null ? localizedRoute.path : "/";
  return routeSanitized + "/" + contentPaths[contentPaths.length - 1];
});
</script>

<template>
  <NuxtLink class="post" :to="localePath(url)">
    <img :src="post.previewImage" :alt="post.title" />
    <div class="post-text">
      <h2>{{ post.title }}</h2>
      <p>{{ post.description }}</p>
    </div>
  </NuxtLink>
</template>

<style scoped>
.post {
  margin: 0 auto calc(var(--main-margin) * 3);
  width: 100%;
}

@media (min-width: 576px) {
  .post {
    width: 47%;
  }
}

.post img {
  aspect-ratio: 21 / 9;
  object-fit: cover;
  border: 1px solid transparent;
  border-radius: var(--main-margin);
  transition: border var(--transition-speed) ease-in-out;
}

.post .post-text {
  padding: var(--main-margin);
}

.post .post-text h2 {
  text-decoration: underline;
  transition: color var(--transition-speed) ease-in-out;
}

.post:hover .post-text h2 {
  color: var(--accent);
}

.post:hover img {
  border: 1px solid var(--accent);
}
</style>
