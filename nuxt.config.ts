// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  app: {
    head: {
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "icon", type: "image/png", href: "/favicon.png" },
      ],
    },
  },
  // @ts-ignore - Typescript doesn't like this variable
  modules: [
    "@nuxtjs/i18n",
    "@nuxtjs/color-mode",
    "nuxt-simple-sitemap",
    "nuxt-simple-robots",
  ],
  plugins: ["@/plugins/vue-final-modal.ts"],
  colorMode: {
    preference: "system",
    fallback: "dark",
  },
  // @ts-ignore - Typescript doesn't like this variable
  css: [
    "vue-final-modal/style.css",
    "@/assets/css/global.css",
    "@fontsource/mulish/latin.css",
    "@fontsource/courier-prime/latin.css",
  ],
  i18n: {
    vueI18n: "./i18n.config.ts",
    locales: [
      {
        isCatchallLocale: true,
        code: "en",
        iso: "en-GB",
        file: "en.json",
        name: "English",
      },
      {
        code: "es",
        iso: "es-ES",
        file: "es.json",
        name: "Español",
      },
    ],
    defaultLocale: "en",
    lazy: true,
    langDir: "i18n",
    strategy: "prefix",
    detectBrowserLanguage: {
      useCookie: false,
      redirectOn: "root",
    },
    differentDomains: false,
  },
  sitemap: {
    cacheTtl: 1000 * 60 * 60 * 24 * 7, // 7 day - content is very static
  },
  nitro: {
    prerender: {
      crawlLinks: true, // Add dynamic urls to sitemap.xml automatically
      routes: ["/"],
    },
  },
});
