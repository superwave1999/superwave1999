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
  modules: ["@nuxtjs/i18n", "@nuxt/content", "@nuxtjs/color-mode"],
  colorMode: {
    preference: "system",
    fallback: "dark",
  },
  // @ts-ignore - Typescript doesn't like this variable
  css: [
    "@/assets/css/global.css",
    "@fontsource/mulish/latin.css",
    "@fontsource/courier-prime/latin.css",
  ],
  i18n: {
    vueI18n: "./i18n.config.ts",
    locales: [
      {
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
    lazy: false,
    langDir: "i18n",
    strategy: "prefix",
    detectBrowserLanguage: {
      useCookie: false,
      redirectOn: "root",
    },
    differentDomains: false,
  },
  router: {
    prefetchPayloads: false,
    prefetchLinks: false,
  },
});
