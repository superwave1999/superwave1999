<script setup lang="ts">
import { ModalsContainer } from "vue-final-modal";
import { IconoirProvider } from "@iconoir/vue";

const route = useRoute();
const { t } = useI18n();
useSeoMeta({
  description: t(route.meta.description),
});

const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: "id",
  addSeoAttributes: true,
});
const title = computed(() => t(route.meta.title ?? ""));
</script>

<template>
  <div>
    <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
      <Head>
        <Title>{{ title }}</Title>
        <template v-for="link in head.link" :key="link.id">
          <Link
            :id="link.id"
            :rel="link.rel"
            :href="link.href"
            :hreflang="link.hreflang"
          />
        </template>
        <template v-for="meta in head.meta" :key="meta.id">
          <Meta
            :id="meta.id"
            :property="meta.property"
            :content="meta.content"
          />
        </template>
      </Head>
      <Body>
        <IconoirProvider
          :icon-props="{ color: 'currentColor', width: '1em', height: '1em' }"
        >
          <EffectHeader />
          <AppHeader />
          <div class="container">
            <NuxtPage />
            <HorizontalDivider />
            <AppFooter />
          </div>
          <ModalsContainer />
        </IconoirProvider>
      </Body>
    </Html>
  </div>
</template>

<style scoped>
div.container {
  width: 100%;
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding-left: var(--container-padding);
  padding-right: var(--container-padding);
  padding-top: var(--top-space);
}
</style>
