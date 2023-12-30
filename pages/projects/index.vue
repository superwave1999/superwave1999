<script setup lang="ts">
import ContentLoader from "assets/js/content-loader";

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

const posts = ref(await new ContentLoader(locale.value).list());
watch(locale, async (newLocale) => {
  posts.value = await new ContentLoader(newLocale).list();
  if (process.client) {
    window.scrollTo(0, 0);
  }
});
</script>

<template>
  <section>
    <SectionTitle :name="$t('p_projects.heading')" />
    <div class="posts">
      <PostCard v-for="post in posts" :key="post.slug" :post="post" />
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
