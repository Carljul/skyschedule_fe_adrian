let mode = "localhost";

const URLKeys = {
  localhost: {
    // apiURL: "http://adios-hris.dev.local/api/v1"
    apiURL: "http://127.0.0.1:8000/api/v1"

  },
  staging: {
    apiURL: "https://wordpress-758765-2639516.cloudwaysapps.com/api/v1"
  },
  production: {
    apiURL: "https://wordpress-758765-2639516.cloudwaysapps.com/api/v1"
  }
}

import { resolve } from 'path';

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Sky Scheduler',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
      { rel: 'stylesheet', type: 'text/css', href: 'https://www.amcharts.com/lib/3/plugins/export/export.css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap' },
      { rel: 'stylesheet', href: 'https://pro.fontawesome.com/releases/v5.3.1/css/all.css' }
    ],
    script: [
      { src: 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js', defer: true, body: true },
      { src: '//www.amcharts.com/lib/3/amcharts.js', defer: true, body: true },
      { src: '//www.amcharts.com/lib/3/amexport_combined.js', defer: true, body: true },
      { src: '//www.amcharts.com/lib/3/ammap.js', defer: true, body: true },
      { src: '//www.amcharts.com/lib/3/ammap_amcharts_extension.js', defer: true, body: true },
      { src: '//www.amcharts.com/lib/3/plugins/animate/animate.js', defer: true, body: true },
      { src: '//www.amcharts.com/lib/3/plugins/export/export.min.js', defer: true, body: true },

      // Types of charts
      { src: '//www.amcharts.com/lib/3/pie.js', defer: true, body: true },
      { src: '//www.amcharts.com/lib/3/serial.js', defer: true, body: true },
      { src: '//www.amcharts.com/lib/3/amstock.js', defer: true, body: true },
      { src: '//www.amcharts.com/lib/3/funnel.js', defer: true, body: true },
      { src: '//www.amcharts.com/lib/3/gantt.js', defer: true, body: true },
      { src: '//www.amcharts.com/lib/3/gauge.js', defer: true, body: true },
      { src: '//www.amcharts.com/lib/3/radar.js', defer: true, body: true },
      { src: '//www.amcharts.com/lib/3/xy.js', defer: true, body: true },

      // Maps
      { src: '//www.amcharts.com/lib/3/maps/js/montserratHigh.js', defer: true, body: true },
      { src: '//www.amcharts.com/lib/3/maps/js/montserratLow.js', defer: true, body: true },

      // Themes
      { src: '//www.amcharts.com/lib/3/themes/black.js', defer: true, body: true },
      { src: '//www.amcharts.com/lib/3/themes/chalk.js', defer: true, body: true },
      { src: '//www.amcharts.com/lib/3/themes/dark.js', defer: true, body: true },
      { src: '//www.amcharts.com/lib/3/themes/light.js', defer: true, body: true },
      { src: '//www.amcharts.com/lib/3/themes/none.js', defer: true, body: true },
      { src: '//www.amcharts.com/lib/3/themes/patterns.js', defer: true, body: true },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~/assets/tailwind.css",
    "~/assets/app.scss",
    "~/assets/amcharts.css",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/mixins/appmixins",
    "~/mixins/momentmixins",
    "~/mixins/usermixins",
    "~/plugins/module-ssr",
    "~/plugins/vee-validate",
    "~/plugins/moment-timezone",
    {
      src: "~/plugins/module", ssr: false
    }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/postcss8',
    '@nuxtjs/laravel-echo',
  ],
  echo : {
    broadcaster: 'pusher',
    key: '3fb3961cecfa5699eb78',
    cluster: 'ap2',
    forceTLS: true,
    plugins: ['~/plugins/echo.js']

  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // nuxt auth
    '@nuxtjs/auth-next',
    '@nuxtjs/moment'
  ],
  ssr: false,
  // moment js config
  moment: {
    timezone: true
  },

  // nuxt auth settings
  auth: {
    redirect: {
      login: '/signin',
      logout: '/',
      callback: '',
      home: '/'
    },
    strategies: {
      local: {
        token: {
          property: 'response.token',
          required: true
        },
        user: {
          property: 'response',
          autoFetch: true
        },
        endpoints: {
          login: { url: '/auth/login', method: 'POST' },
          logout: { url: '/auth/logout', method: 'POST' },
          user: { url: '/auth/user', method: 'GET' }
        }
      }
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseUrl: URLKeys[mode].apiURL
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        /**
         * do not remove the cssnano key.
         * (https://github.com/fullcalendar/fullcalendar/issues/5503)
         */
        cssnano: {
          preset: [
            'default',
            {
              calc: false,
            },
          ],
        },

        // tailwind
        tailwindcss: {},
        autoprefixer: {},
      },
    },
    transpile: [
      "vee-validate",
      "/@fullcalendar.*/"
    ],
  },

  // dir alias
  alias: {
    '@components': resolve(__dirname, './components'),
    '@page_components': resolve(__dirname, './page-components'),
    '@permissions': resolve(__dirname, './permissions')
  },


  // loading
  loading: false
}
