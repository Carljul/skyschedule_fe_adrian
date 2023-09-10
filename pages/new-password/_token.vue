<template>
  <div>
    <div v-if="!savedPassword">
      <ValidationObserver ref="submit" v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(passwordReset)">
            <h2 class=" font-bold text-2xl xl:text-3xl text-center xl:text-left">
                Password Setup
            </h2>
            <div class=" mt-2 text-slate-400 xl:text-left sm:text-center">You are requesting for a new password, please enter your password.</div>
            <div class=" mt-8">
                <ValidationProvider vid="submit_password" ref="submit_password" name="Password" v-slot="{ validate, errors }" rules="required">
                  <input 
                  type="password" 
                  class=" w-full py-3 px-4 block w-full rounded text-sm text-gray-600  border-2 xl:border-0" 
                  placeholder="New Password" 
                  :value="field.password"
                  @input="e => { 
                      field.password = e.target.value;
                      validate(e); 
                  }"
                  v-vchecker="errors[0]"
                  />
                  <v-msg style="color: #fff!important;" :error="errors[0]" />
                </ValidationProvider>
            </div>
            <div class=" mt-4">
                <ValidationProvider ref="submit_password_confirmation" name="Confirm Password" v-slot="{ validate, errors }" rules="required|confirmed:submit_password">
                  <input 
                  type="password" 
                  class=" w-full py-3 px-4 block w-full rounded text-sm text-gray-600  border-2 xl:border-0" 
                  placeholder="Confirm New Password" 
                  :value="field.password_confirmation"
                  @input="e => { 
                      field.password_confirmation = e.target.value;
                      validate(e); 
                  }"
                  v-vchecker="errors[0]"
                  />
                  <v-msg style="color: #fff!important;" :error="errors[0]" />
                </ValidationProvider>
            </div>
            <async-button type="submit" ref="btnsubmit" :class="`${btnclass} ${btnnopreference} mt-4`">Reset Password</async-button>
          </form>
      </ValidationObserver>

        <p class=" text-sm mt-5">
          Back to 
          <nuxt-link to="/signin" class="text-blue-400 hover:text-blue-500">Signin</nuxt-link>
        </p>
    </div>

    <div v-else>
        <h1 class=" mb-5 font-bold text-3xl flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="inline w-10 h-10 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg> Password Saved!
        </h1>
        <p class=" mb-6 text-sm">This reset password url will automatically expire if you refresh this page.</p>
        <p class="mt-10">
           <nuxt-link :class="`${btnclass}`" to="/signin">Proceed to Signin</nuxt-link>
        </p>
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
  head() {
      return {
          title: 'New Password' + this.theAppTitle
      }
  },
  data() {
      return {
          field: {
              password: '',
              password_confirmation: ''
          },
          savedPassword: null
      }
  },
  async asyncData({ params, error, $axios }) {
    try {
        const gettoken = await $axios.get(`/auth/password-reset/${params.token}`);
        return { tokenizer: gettoken.data }
    } catch(err) {
        error({ 
            statusCode: 401, 
            title: 'Oops!!!',
            message: 'Your request for reset password link is invalid or expired.'
        });
    }
  },
  methods: {
      async passwordReset() {
          try {
              this.$refs.btnsubmit.loading = true;
              const param = {...this.field, email: this.tokenizer.email };
              await this.$axios.post(`/auth/new-password/${this.tokenizer.token}`, param);
              this.savedPassword = true;
              this.$refs.btnsubmit.loading = false;
          } catch(err) {
              this.errorHandle(err, 'submit');
              this.$refs.btnsubmit.loading = false;
          }
      }
  },
}
</script>
<style lang="scss" scoped>
.auth-logo {
  max-width: 200px;
  margin: 0 auto 20px auto;
}
</style>