<template>
  <div>
      <h2 class="font-bold text-2xl xl:text-3xl text-center xl:text">
          Sky Schedule
      </h2>
      <!-- <div class="mt-2 text-slate-400 xl:text text-center">Lorem Ipsum is simply dummy text.</div> -->

      <ValidationObserver ref="signin" v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(signin)">

          <div class="mt-8">
              <ValidationProvider ref="signin_email" name="Email" v-slot="{ validate, errors }" rules="required|email">
                <input 
                type="text" 
                class="w-full py-3 px-4 block w-full text-sm text-gray-600 border-2 xl:border-transparent v-input rounded-full ..." 
                placeholder="Email"
                :value="inputs.email"
                @input="e => { 
                    inputs.email = e.target.value;
                    validate(e); 
                }"
                v-vchecker="errors[0]"
                >
                <v-msg style="color: #fff!important;" :error="errors[0]" />
              </ValidationProvider>

              <ValidationProvider ref="signin_password" name="Password" v-slot="{ validate, errors }" rules="required">
                <input 
                type="password" 
                class="w-full py-3 px-4 block mt-4 text-sm text-gray-600 border-2 xl:border-transparent v-input rounded-full ..." 
                placeholder="Password"
                :value="inputs.password"
                @input="e => { 
                    inputs.password = e.target.value;
                    validate(e); 
                }"
                v-vchecker="errors[0]"
                >
                <v-msg style="color: #fff!important;" :error="errors[0]" />
              </ValidationProvider>

          </div>
          <div class="text-right text-slate-600 dark:text-slate-500 text-xs sm:text-sm mt-4 mb-5 xl:mb-0">
              <nuxt-link to="/forgot-password" class=" text-gray-600 text-blue-400 hover:text-blue-500 text-sm">Forgot Password?</nuxt-link>
          </div>
          <div class="mt-1 xl:mt-8 text-center xl:text">
              <async-button :class="`${btnclass} ${btnnopreference} py-3 px-4 w-full xl:w-32 xl:mr-3 align-top text-white rounded-full ...`" ref="signinbtn">Login</async-button>
          </div>

        </form>
      </ValidationObserver>


  </div>
</template>
<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import VMsg from "@components/reusables/VeeMessage.vue";
import AsyncButton from "@components/reusables/AsyncButton.vue";

import { mapActions, mapState } from "vuex";

export default {
  layout: 'auth',
  auth: 'guest',
  middleware: ['auth'],
  components: {
    AsyncButton,
    ValidationProvider,
    ValidationObserver,
    VMsg
  },
  head() {
      return {
          title: 'Signin' + this.theAppTitle
      }
  },
  data() {
    return {
      inputs: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapState({
      authToken: state => state.auth.signin.authToken,
      status: state => state.auth.signin.status,
      loggedInUser: state => state.auth.signin.loggedInUser,
    })
  },
  methods: {
    ...mapActions('auth/signin', [
        'login',
    ]),
    async signin() {
      this.$refs.signinbtn.loading = true;
      await this.login(this.inputs)
      console.log(['this.status', this.status])
      console.log(['this.loggedInUser', this.loggedInUser])
      console.log(['this.authToken', this.authToken])
      if (this.status) {
        window.location.href="/order";
      } else {
        this.inputs.password = '';
        const e = this;
        this.$nextTick(() => {
          e.$refs.signin.reset();
          e.$refs.signin_email.setErrors(['Invalid credential, please try again.']);
          e.$refs.signinbtn.loading = false;
        });
      }
    }
  }
}
</script>