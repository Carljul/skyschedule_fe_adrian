<template>
  <div>
    <div v-if="!successEmail">
        <h2 class=" font-bold text-2xl xl:text-3xl text-center xl:text-left">
            Forgot Password
        </h2>
        <div class=" mt-2 text-slate-400 xl:text-left sm:text-center">Enter the email associated with your account and we'll send an email with instructions to reset your password.</div>
        
        <ValidationObserver ref="submit" v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(requestPassword)">
            <div class=" mt-8">

              <ValidationProvider ref="submit_email" name="Email" v-slot="{ validate, errors }" rules="required|email">
                <input type="text" 
                class="w-full py-3 px-4 block w-full rounded text-sm text-gray-600 border-2 xl:border-0 v-input" 
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

            </div>
            <div class=" mt-4 text-center xl:text-left">
                <async-button ref="btnsubmit" :class="`${btnclass} ${btnnopreference} w-full xl:w-auto`">Request Change Password</async-button>
            </div>
          </form>
        </ValidationObserver>

        <p class=" text-sm mt-5">
          Back to <nuxt-link to="/signin" class="text-blue-400 hover:text-blue-500">Signin</nuxt-link>
        </p>
    </div>

    <div v-else>
        <h1 class=" mb-5 font-bold text-3xl flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="inline w-10 h-10 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg> Check your mail
        </h1>
        <p class=" mb-6 text-sm">We have sent a password recover instructions to your email.</p>

        <a :href="`mailto: ${successEmail}`" :class="`mb-12 ${btnclass} ${btnnopreference}`">Open email app</a>

        <div class=" mt-12">
            <p class="text-sm">
                Did not receive the email? Check your spam filter, or 
                <a href="#" @click.prevent="() => { inputs.email = ''; successEmail=null; }" class="text-blue-400 hover:text-blue-500">try another email address.</a>
            </p>

            <p class="text-sm mt-5">or skip this and proceed to 
              <nuxt-link to="/signin" class="text-blue-400 hover:text-blue-500">signin</nuxt-link>
            </p>
        </div>
    </div>

  </div>
</template>
<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import VMsg from "@components/reusables/VeeMessage.vue";
import AsyncButton from "@components/reusables/AsyncButton.vue";
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
  data() {
    return {
      inputs: {
        email: null
      },
      successEmail: null
    }
  },
  head() {
      return {
          title: 'Forgot Password' + this.theAppTitle
      }
  },
  methods: {
    async requestPassword() {
      try {
        this.$refs.btnsubmit.loading = true;
        const res = await this.$axios.post('/auth/forgot-password', this.inputs);
        this.successEmail = this.inputs.email;
        this.$refs.btnsubmit.loading = false;
      } catch(err) {
        this.errorHandle(err, 'submit');
        this.$refs.btnsubmit.loading = false; 
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.auth-logo {
  max-width: 200px;
  margin: 0 auto 20px auto;
}
</style>