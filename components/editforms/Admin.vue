<template>
    <div>
        <ValidationObserver ref="updateuser" v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(updateUser)">

                <ValidationProvider ref="updateuser_name" name="Name" v-slot="{ validate, errors }" rules="required">
                    <div class="form-group-wrap mb-3">
                        <label class="mb-1 block text-xs font-medium --text-dark">Name</label>
                        <input 
                        :value="state.selected.name"
                        @input="e => { 
                            setState({ selected: { ...state.selected, name: e.target.value } }); 
                            validate(e); 
                        }"
                        type="text"
                        class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border" 
                        v-vchecker="errors[0]"
                        />
                        <v-msg :error="errors[0]" />
                    </div>
                </ValidationProvider>


                <ValidationProvider ref="updateuser_email" name="Email" v-slot="{ validate, errors }" rules="required|email">
                    <div class="form-group-wrap mb-3">
                        <label class="mb-1 block text-xs font-medium --text-dark">Email</label>
                        <input 
                        :value="state.selected.email"
                        @input="e => { 
                            setState({ selected: { ...state.selected, email: e.target.value } }); 
                            validate(e); 
                        }"
                        type="email"
                        class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border" 
                        v-vchecker="errors[0]"
                        />
                        <v-msg :error="errors[0]" />
                    </div>
                </ValidationProvider>

                <div class="form-group-wrap mb-3">
                    <label
                    class="--text-dark mb-2 text-sm block"
                    >
                    <input type="checkbox"
                    :true-value="true"
                    :false-value="false"
                    :checked="state.selected.canupdatepassword"
                    @input="e => { 
                        setState({ selected: { ...state.selected, canupdatepassword: !state.selected.canupdatepassword } });
                    }" class="mr-1" />
                    Update the password
                    </label>
                </div>

                <div v-if="state.selected.canupdatepassword">
                    <ValidationProvider vid="updateuser_password" ref="updateuser_password" name="Password" v-slot="{ validate, errors }" rules="required|min:8">
                        <div class="form-group-wrap mb-3">
                            <label class="mb-1 block text-xs font-medium --text-dark">Password</label>
                            <input 
                            :value="state.selected.password"
                            @input="e => { 
                                setState({ selected: { ...state.selected, password: e.target.value } }); 
                                validate(e); 
                            }"
                            type="password"
                            class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border" 
                            v-vchecker="errors[0]"
                            />
                            <v-msg :error="errors[0]" />
                        </div>
                    </ValidationProvider>

                    <ValidationProvider ref="updateuser_password_confirmation" name="Confirm Password" v-slot="{ validate, errors }" rules="required|confirmed:updateuser_password|min:8">
                        <div class="form-group-wrap mb-3">
                            <label class="mb-1 block text-xs font-medium --text-dark">Confirm Password</label>
                            <input 
                            :value="state.selected.password_confirmation"
                            @input="e => { 
                                setState({ selected: { ...state.selected, password_confirmation: e.target.value } }); 
                                validate(e); 
                            }"
                            type="password"
                            class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border" 
                            v-vchecker="errors[0]"
                            />
                            <v-msg :error="errors[0]" />
                        </div>
                    </ValidationProvider>
                </div>

                <div class="form-group-wrap">
                    <async-button ref="updateuser_btn" type="submit" :class="`p-3 ${btnclassnormal} mt-3`">
                        Save Changes
                    </async-button>
                </div>

            </form>
        </ValidationObserver>
    </div>
</template>
<script>
import AsyncButton from "@components/reusables/AsyncButton.vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import VMsg from "@components/reusables/VeeMessage.vue";

import { mapState, mapMutations, mapActions } from "vuex"
export default {
    name: 'AdminUsersEdit',
    components: {
        AsyncButton,
        ValidationProvider,
        ValidationObserver,
        VMsg
    },
    computed: {
        ...mapState({
            state: state => state.administration.users.state
        })
    },
    methods: {
        ...mapMutations('administration/users', [
            'setState'
        ]),
        ...mapActions('administration/users', [
            'StoreUpdateEntry'
        ]),
        async updateUser() {
            try {
                this.$refs.updateuser_btn.loading = true;
                await this.StoreUpdateEntry();
                this.$refs.updateuser_btn.loading = false;
                this.$refs.updateuser.reset();
            } catch($e) {
                this.errorHandle($e, 'updateuser');
                this.$refs.updateuser_btn.loading = false;
            }
        }
    }
}
</script>