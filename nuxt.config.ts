// https://nuxt.com/docs/api/configuration/nuxt-config
require('dotenv').config();

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/ui',  ],
  nitro: {
    preset: 'node', // Ensure you use 'node' for a server-side project
  },
  
})