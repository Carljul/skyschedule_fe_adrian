import Vue from "vue";
import defaults from "~/defaults.js";

import mime from "mime";

// global mixis
const globalmixin = {
    data() {
      return {
        __debouncing: null
      }
    },
    computed: {
      btnnopreference() {
        return `rounded bg-gradient-to-r from-indigo-500 hover:from-purple-500 to-purple-500 hover:to-indigo-500`;
      },
      btnclassnormal() {
        return 'text-sm px-4 text-white rounded btn --bg-primary --bg-primary-hover';
      },
      btnclass() {
        return 'text-sm text-white rounded btn py-3 px-4 --bg-primary --bg-primary-hover';
      },
      linkclass() {
        return 'text-sm --text-primary --text-primary-hover';
      },
      theAppTitle() {
        return ' - Sky Scheduler System';
      },
      appdefaults() {
        return defaults;
      },
      getClientPathforUpload() {
        return this.$nuxt.$route.path;
      },
      imageMimes() {
        return [
          'image/jpg',
          'image/jpeg',
          'image/png',
          'image/gif',
          'image/svg'
        ];
      }
    },
    methods: {
      notify($args, $interval=5000) {
        this.$notify({
          group: 'notify',
          ...$args
        }, $interval);
      },

      setDropzone(media) {
        return {
          url: media.path,
          width: media.width,
          height: media.height,
          alt: media.alt_text,
          mime: media.mime
        };
      },

      errorHandle($response, $scope) {
        const e = this;
        try {
          if($response.response.data.errors) {
            const messages = $response.response.data.errors;
            if( typeof messages === 'object' ) {
              for(const key in messages) {
                if( messages.hasOwnProperty(key)) {
                  e.$refs[`${$scope}_${key}`].setErrors(messages[key]);
                }
              }

              this.notify({
                title: 'Oops!',
                html: 'Please check the error fields',
                type: 'warning'
              });
            }
            return;
          }

          if($response.response.data.response) {
            this.notify({
              title: 'Oops!',
              html: $response.response.data.response,
              type: 'danger'
            });
            return;
          }

          if($response.response.data.message) {
            this.notify({
              title: 'Oops!',
              html: $response.response.data.message,
              type: 'danger'
            });
            return;
          }
          
        } catch($e) {
          this.notify({
            title: 'Request Failed',
            html: 'Failed to execute your request, please try again.',
            type: 'danger'
          });
          return;
        }
      },

      notFound() {
          return this.$nuxt.error({ statusCode: 404, message: defaults.notfound });
      },

      findNuxtComponentByName($component, $name) {
        return $component.$children.find(row => row.$options.name == $name);
      },

      findPageComponent($name) {
        return this.pageComponent().$children.find(row => row.$options.name == $name);
      },

      pageComponent() {
        const nuxtroot = this.findNuxtComponentByName(this.$nuxt, 'MainLayout');
        const nuxtmain = this.findNuxtComponentByName(nuxtroot, 'Nuxt');
        return nuxtmain.$children[0];
      },

      debounceEvent(event, interval=1000) {
        const e = this;
        clearTimeout(e.__debouncing);
        e.__debouncing = setTimeout(function() {
          event();
        }, interval);
      },
      $printdata(data) {
        return data ? data : defaults.na;
      },
      $imagebymimes($file) {
        let $mimes = mime.getType($file);
        if(!$file || !$mimes) {
          return require("~/static/icons/003-blank-page.svg");
        }
        if($mimes.match(/application/g)) {
            return require("~/static/icons/002-document.svg");
        }
        else if($mimes.match(/image/g)) {
            return $file;
        }
        else if($mimes.match(/video/g)) {
            return require("~/static/icons/004-youtube.svg");
        }
        else if($mimes.match(/audio/g)) {
            return require("~/static/icons/001-volume.svg")
        }
        else {
            return require("~/static/icons/003-blank-page.svg");
        }
      },
      $scrollToView(selector) {
        const el = document.querySelector(selector);
        el.scrollIntoView({ behavior: "smooth" });
      },
      nuxtload() {
        this.$store.commit('global/setStateV2', { handle: 'state', key: 'appload', value: true }, { root: true });
      },
      nuxtunload() {
        this.$store.commit('global/setStateV2', { handle: 'state', key: 'appload', value: false }, { root: true });
      },
      appNumberFormatting($value) {
        const number = $value;
        return number.toLocaleString();
      }
    }
}
Vue.mixin(globalmixin);


// get unique key for loop
const UNIQUE_KEY_PROP = '__unique_key_prop__'
const KEY_PREFIX = '__key_prefix__' + Date.now() + '_'
let uid = 0

const isObject = val => val !== null && typeof val === 'object'

const genKey = obj => {
  if (isObject(obj)) {
    if (UNIQUE_KEY_PROP in obj) {
      return obj[UNIQUE_KEY_PROP]
    }
    const value = KEY_PREFIX + uid++
    Object.defineProperty(obj, UNIQUE_KEY_PROP, { value })
    return value
  }
  return obj
}

Vue.mixin({
  methods: { genKey }
})