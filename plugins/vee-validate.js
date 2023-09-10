import Vue from "vue";

import { extend } from "vee-validate";

// rules
import { required, email, confirmed, min } from "vee-validate/dist/rules";
extend('required', {
    ...required,
    message: '{_field_} is required.',
});
extend('email', {
    ...email,
    message: 'Sample email: example@site.com.'
});

extend('confirmed', {
    ...confirmed,
    message: 'Please confirm your password.'
});

extend('min', {
    ...min,
    params: ['length'],
    message: '{_field_} needs to be {length} characters.'
});

Vue.directive('vchecker', {
    update(el,binding) {
        if( !binding.value ) {
            el.classList.remove('v-invalid');
        } else {
            el.classList.add('v-invalid');
        }
    }
});