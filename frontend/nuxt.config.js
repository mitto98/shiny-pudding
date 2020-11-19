export default {
  mode: 'universal',
  target: 'server',
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ],
    script: [
      {src: '/pig.js'}
    ]
  },
  css: [],
  plugins: ['~plugins/vue-gallery.client.js'],
  components: true,
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
  ],
  axios: {},

  publicRuntimeConfig: {
    apiUrl: process.env.PUBLIC_API_URL || '/api',
    title: process.env.GALLERY_TITLE || 'My shiny gallery',
    igUsername: process.env.IG_USERNAME,
    axios: {
      browserBaseURL: process.env.PUBLIC_API_URL
    }
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.DOCKER_API_URL
    }
  },
}
