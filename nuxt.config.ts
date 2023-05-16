// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/i18n", "@nuxt/content", "@nuxtjs/color-mode"],
  colorMode: {
    preference: "system",
    fallback: "dark",
  },
  // @ts-ignore TODO: Typescript doesn't like this variable
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
    lazy: true,
    langDir: "i18n",
    strategy: "prefix",
    detectBrowserLanguage: {
      useCookie: false,
      redirectOn: "root",
    },
    differentDomains: false,
    // skipSettingLocaleOnNavigate: true,
  },
});
