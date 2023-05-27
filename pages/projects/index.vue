<script setup lang="ts">
defineI18nRoute({
  paths: {
    en: "/projects",
    es: "/proyectos",
  },
});

const { locale } = useI18n();
const section = `projects-${locale.value}`;
const fields = ["title", "description", "previewImage", "_path"];
const posts = await queryContent(section)
  .only(fields)
  .sort({ endDate: -1 })
  .find();
</script>

<template>
  <section>
    <SectionTitle :name="$t('p_projects.heading')" />
    <div class="posts">
      <PostCard v-for="post of posts" :key="post._path" :post="post" />
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
