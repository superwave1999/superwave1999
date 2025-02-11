<script setup lang="ts">
import { ModalsContainer } from "vue-final-modal";
const { finalizePendingLocaleChange } = useI18n();

const head = useLocaleHead({
  dir: true,
  key: "id",
  seo: true,
});

const onBeforeEnter = async () => {
  await finalizePendingLocaleChange();
};
</script>

<template>
  <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
    <Head>
      <Title />
      <template v-for="link in head.link" :key="link.id">
        <Link
          :id="link.id"
          :rel="link.rel"
          :href="link.href"
          :hreflang="link.hreflang"
        />
      </template>
      <template v-for="meta in head.meta" :key="meta.id">
        <Meta :id="meta.id" :property="meta.property" :content="meta.content" />
      </template>
    </Head>
    <Body>
      <EffectHeader />
      <AppHeader />
      <div class="container">
        <NuxtPage
          :transition="{
            name: 'page',
            mode: 'out-in',
            onBeforeEnter,
          }"
        />
      </div>
      <div class="bottom">
        <HorizontalDivider />
        <AppFooter />
      </div>
      <ModalsContainer />
    </Body>
  </Html>
</template>

<style scoped>
div.container,
div.bottom {
  width: 100%;
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding-left: var(--container-padding);
  padding-right: var(--container-padding);
}

div.container {
  padding-top: var(--top-space);
}
</style>
