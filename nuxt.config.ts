// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@vite-pwa/nuxt'],
  runtimeConfig: {
    googleApiKey: '' // Es carregarà des de la variable d'entorn NUXT_GOOGLE_API_KEY o directament del .env
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Llumina - Gestor de Tasques IA',
      short_name: 'Llumina',
      theme_color: '#0f172a',
      background_color: '#0f172a',
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    workbox: {
      navigateFallback: '/'
    },
    devOptions: {
      enabled: true,
      type: 'module'
    }
  }
})
