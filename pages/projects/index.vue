<script setup lang="ts">
defineI18nRoute({
  paths: {
    en: "/projects",
    es: "/proyectos",
  },
});

const { locale, t } = useI18n();
useHead({
  title: t("p_projects.headTitle"),
});
const { data: posts } = await useFetch(`/api/index/${locale.value}`);
</script>

<template>
  <section>
    <SectionTitle :name="$t('p_projects.heading')" />
    <div class="posts">
      <PostCard v-for="post of posts" :key="post.slug" :post="post" />
    </div>
  </section>
</template>

<style scoped>
.posts {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
</style>
