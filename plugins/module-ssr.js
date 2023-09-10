import Vue from "vue";


// dropdown component
import vClickOutside from "v-click-outside";
Vue.use(vClickOutside);

// unique id
import UniqueId from "vue-unique-id";
Vue.use(UniqueId, {
    ...UniqueId.DEFAULTS,
    uidProperty: 'nuxtuniqid',
    uidPrefix: 'uid-'
});