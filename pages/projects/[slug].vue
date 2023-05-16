<script setup lang="ts">
import { Link } from "@iconoir/vue";
import Viewer from "viewerjs";
import "viewerjs/dist/viewer.css";

defineI18nRoute({
  paths: {
    en: "/projects/[slug]",
    es: "/proyectos/[slug]",
  },
});

const { locale } = useI18n();
const route = useRoute();
const section = "projects-" + locale.value;
const path = `/${section}/${route.params.slug}`;
const page = await queryContent(section).where({ _path: path }).findOne();

const hasAnyMeta =
  page.infoWebsite ||
  page.infoPlatform ||
  page.infoStack ||
  (page.links && page.links.length);

let imageViewer: Viewer;

onMounted(() => {
  nextTick(() => {
    const domContentElement = document.getElementById("nuxt-content");
    if (!domContentElement) {
      return;
    }
    imageViewer = new Viewer(domContentElement, {
      inline: false,
      loading: true,
      loop: true,
      movable: true,
      rotatable: false,
      scalable: false,
      zoomable: true,
      fullscreen: true,
      zIndex: 3000,
    });
  });
});

onUnmounted(() => {
  if (imageViewer) {
    imageViewer.destroy();
  }
});
</script>

<template>
  <article>
    <div class="w-100">
      <h1 class="w-auto-inline">{{ page.title }}</h1>
      <span v-if="page.startDate || page.endDate">
        &nbsp;
        <TextSeparator />
        {{ page.startDate || ""
        }}{{ page.startDate && page.endDate ? " - " : ""
        }}{{ page.endDate ?? "" }}
      </span>
    </div>
    <ContentRenderer id="nuxt-content" :value="page" class="nuxt-content" />
    <HorizontalDivider v-if="hasAnyMeta" />
    <div v-if="hasAnyMeta" class="post-meta">
      <div v-if="page.infoPlatform">
        <h4>Platform: <TextSeparator />{{ page.infoPlatform }}</h4>
      </div>
      <div v-if="page.infoStack" class="stack-box">
        <h4>
          Stack:
          <TextSeparator />{{ page.infoStack }}
        </h4>
      </div>
      <div v-if="page.infoWebsite" class="link-box">
        <h4>
          <a :href="page.infoWebsite" target="_blank"
            ><Link />&nbsp;{{ page.infoWebsite }}</a
          >
        </h4>
      </div>
      <div v-if="page.links && page.links.length" class="link-box">
        <h4 v-for="link of page.links" :key="link.href">
          <a :href="link.href" target="_blank"
            ><Link />&nbsp;{{ link.title }}</a
          >
        </h4>
      </div>
    </div>
    <!-- TODO: Prev/next -->
  </article>
</template>

<style scoped>
article {
  margin: 0 auto;
  max-width: 72ch;
}

div.post-meta {
  margin-top: 5ch;
}

.link-box a {
  white-space: normal;
  word-break: break-word;
}
</style>
