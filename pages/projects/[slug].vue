<script setup lang="ts">
import { PhLink, PhArrowLeft, PhArrowRight } from "@phosphor-icons/vue";
import Viewer from "viewerjs";
import "viewerjs/dist/viewer.css";
import ContentLoader from "assets/js/content-loader";
import type ContentExcerpt from "~/assets/js/types/content-excerpt";
import type Content from "~/assets/js/types/content";
import type ContentSurrounding from "~/assets/js/types/content-surrounding";

defineI18nRoute({
  paths: {
    en: "/projects/[slug]",
    es: "/proyectos/[slug]",
  },
});

const { locale, t } = useI18n();
const route = useRoute();

const content = new ContentLoader(locale.value);
const post: Ref<Content> = ref(
  await content.single(route.params.slug as string),
);
const surrounding: Ref<ContentSurrounding> = ref(
  await content.surrounding(route.params.slug as string),
);

watch(locale, async (newLocale) => {
  const content = new ContentLoader(newLocale);
  post.value = await content.single(route.params.slug as string);
  surrounding.value = await content.surrounding(route.params.slug as string);
  if (import.meta.client) {
    window.scrollTo(0, 0);
  }
});

onMounted(refreshImageViewer);

watch(post, async () => {
  await nextTick(() => {
    refreshImageViewer();
  });
});

const hasAnyMeta = computed(() => {
  if (!post.value) {
    return false;
  }
  return (
    post.value.infoWebsite ||
    post.value.infoPlatform ||
    post.value.infoStack ||
    (post.value.links && post.value.links.length)
  );
});

useHead({
  title: `${post.value!.title}${t("p_project.headTitleSuffix")}`,
  meta: [{ name: "description", content: post.value!.description }],
});

function url(post: ContentExcerpt) {
  if (!post) {
    return "";
  }
  const prevRoute = route.path.substring(0, route.path.lastIndexOf("/"));
  return `${prevRoute}/${post.slug}`;
}

onMounted(refreshImageViewer);

let imageViewer: Viewer;
function refreshImageViewer() {
  if (imageViewer) {
    imageViewer.destroy();
  }
  imageViewer = new Viewer(document.getElementById("nuxt-content")!, {
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
}
</script>

<template>
  <article>
    <div class="w-100">
      <h1 class="w-auto-inline">{{ post.title }}</h1>
      <span v-if="post.startDate || post.endDate">
        <TextSeparator class="space-before" />
        {{ post.startDate || ""
        }}{{ post.startDate && post.endDate ? " - " : ""
        }}{{ post.endDate ?? "" }}
      </span>
    </div>
    <!-- eslint-disable vue/no-v-html -->
    <div id="nuxt-content" class="nuxt-content" v-html="post.content" />
    <!-- eslint-enable -->
    <HorizontalDivider v-if="hasAnyMeta" />
    <div v-if="hasAnyMeta" class="post-meta">
      <div v-if="post.infoPlatform">
        <h4>
          {{ $t("p_project.platform") }} <TextSeparator />{{
            post.infoPlatform
          }}
        </h4>
      </div>
      <div v-if="post.infoStack" class="stack-box">
        <h4>
          {{ $t("p_project.stack") }}
          <TextSeparator />{{ post.infoStack }}
        </h4>
      </div>
      <div v-if="post.infoWebsite" class="link-box">
        <h4>
          <a :href="post.infoWebsite" target="_blank"
            ><PhLink size="1em" color="currentColor" class="space-after" />{{
              $t("p_project.website")
            }}</a
          >
        </h4>
      </div>
      <div v-if="post.links && post.links.length" class="link-box">
        <h4 v-for="link of post.links" :key="link.href">
          <a :href="link.href" target="_blank"
            ><PhLink size="1em" color="currentColor" class="space-after" />{{
              link.title
            }}</a
          >
        </h4>
      </div>
    </div>
    <div v-if="surrounding.prev || surrounding.next" class="prevnext">
      <NuxtLink
        v-if="surrounding.prev"
        class="post prev"
        :to="url(surrounding.prev)"
        ><h2>
          <PhArrowLeft size="1em" color="currentColor" class="space-after" />{{
            surrounding.prev.title
          }}
        </h2></NuxtLink
      >
      <NuxtLink
        v-if="surrounding.next"
        class="post next"
        :to="url(surrounding.next)"
        ><h2>
          {{ surrounding.next.title
          }}<PhArrowRight
            size="1em"
            color="currentColor"
            class="space-before"
          /></h2
      ></NuxtLink>
    </div>
  </article>
</template>

<style>
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

.prevnext {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: var(--section-size);
}

.prevnext > * {
  margin: var(--mid-margin);
}

.prevnext h2 {
  text-decoration: underline;
  transition: color var(--transition-speed) ease-in-out;
}

.prevnext .next {
  margin-left: auto;
  margin-right: 0;
  text-align: right;
}

.prevnext a:hover {
  color: var(--accent);
}

/* Blog post styles */
.nuxt-content {
  font-family: var(--font-thin);
  font-size: 0.9em;
}

.nuxt-content a {
  color: var(--accent);
}

.nuxt-content a:hover {
  text-decoration: underline;
}

.nuxt-content p {
  margin-top: var(--main-margin);
  margin-bottom: var(--main-margin);
}

.nuxt-content img {
  border-radius: var(--main-margin);
  cursor: zoom-in;
  transition: transform 0.2s;
  aspect-ratio: 21 / 9;
  object-fit: cover;
}

.nuxt-content img:hover {
  transform: scale(1.01);
}

.nuxt-content video {
  border-radius: var(--main-margin);
  aspect-ratio: 16 / 9;
}

.nuxt-content.colour-dark a {
  color: rgb(125 177 255);
}

.nuxt-content code {
  font-family: monospace;
  text-shadow: none;
}

.nuxt-content p code {
  color: rgb(202 86 78);
  padding: 0.2em;
}

.nuxt-content pre code {
  color: rgb(174 190 86);
  padding: 0.1em;
}

.nuxt-content pre,
.nuxt-content p code {
  background-color: rgb(38 40 45);
  border-radius: 0.4em;
}

/* Override image viewer padding */
body {
  padding: 0 !important;
}
</style>
