<script setup lang="ts">
const props = defineProps({
  post: { type: Object, default: null },
});

const route = useRoute();

const url = computed(() => {
  if (!props.post) {
    return "";
  }
  return `${route.path}/${props.post.slug}`;
});
</script>

<template>
  <NuxtLink class="post" :to="url">
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
