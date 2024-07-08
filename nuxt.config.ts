// https://nuxt.com/docs/api/configuration/nuxt-config
import { type InputConfig } from "c12";
import { type NuxtConfig } from "@nuxt/schema";

const input: InputConfig<NuxtConfig> = {
  ssr: true,
  compatibilityDate: "2024-07-09",
  app: {
    buildAssetsDir: "output",
    head: {
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon/favicon.svg" },
        { rel: "icon", type: "image/png", href: "/favicon/favicon.png" },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/favicon/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon/favicon-16x16.png",
        },
        { rel: "manifest", href: "/favicon/site.webmanifest" },
        {
          rel: "mask-icon",
          href: "/favicon/safari-pinned-tab.svg",
          color: "#b91d47",
        },
        { rel: "shortcut icon", href: "/favicon/favicon.ico" },
        { rel: "msapplication-TileColor", content: "#b91d47" },
        { rel: "msapplication-config", content: "/favicon/browserconfig.xml" },
        { rel: "theme-color", content: "#b91d47" },
      ],
    },
  },
  // @ts-ignore - Typescript doesn't like this variable
  modules: [
    "@nuxtjs/i18n",
    "@nuxtjs/color-mode",
    "nuxt-site-config",
    "@nuxtjs/sitemap",
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
    skipSettingLocaleOnNavigate: true,
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
    strategy: "prefix_and_default",
    detectBrowserLanguage: {
      useCookie: true,
      alwaysRedirect: true,
      redirectOn: "root",
    },
    differentDomains: false,
  },
  sitemap: {
    enabled: true,
    autoI18n: true,
    xsl: false,
    cacheMaxAgeSeconds: 1000 * 60 * 60 * 24 * 7, // 7 day - content is very static
  },
  nitro: {
    logLevel: +999,
    prerender: {
      crawlLinks: true, // Add dynamic urls to sitemap.xml automatically
      routes: ["/"],
      failOnError: false, // i18n module compat
    },
  },
  vite: {
    assetsInclude: ["**/*.md"],
  },
};

export default defineNuxtConfig(input);
