<template>
    <div>
        <button 
        @click="$refs.entryform.open=true"
        :class="`p-3 ${btnclassnormal} mb-2 inline-flex items-center p-2 space-x-1 text-sm float-right fixed bottom-2 right-2 lg:static lg:px-4 lg:py-2.5`">
            <span class="mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
            </span>
            <span>New Permission</span>
        </button>

        <modal ref="entryform" nofooter contentclass="xl:w-3/12 md:w-5/12 sm:w-7/12"
        @close="() => {
            resetInputs();
            $router.push('/administration/permissions');
        }"
        >
            <template slot="header">
                <h4 class="--text-heading text-lg font-semibold">
                    <span v-if="state.inputs.uid">Edit Permission ({{ state.inputs.__title }})</span>
                    <span v-else>New Permission</span>
                </h4>
            </template>

            <template slot="content">

                <ValidationObserver ref="entryupsert" v-slot="{ handleSubmit }">
                    <form @submit.prevent="handleSubmit(upsertEntry)">

                        <ValidationProvider ref="entryupsert_permission" name="Permission" v-slot="{ validate, errors }" rules="required">
                            <div class="form-group-wrap mb-3">
                                <label class="mb-1 block text-xs font-medium --text-dark">Permission</label>
                                <input 
                                :value="state.inputs.permission"
                                @input="e => {
                                    setState({ handle: 'state.inputs', key: 'permission', value: e.target.value });
                                    validate(e); 
                                }"
                                type="text"
                                class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border" 
                                v-vchecker="errors[0]"
                                />
                                <v-msg :error="errors[0]" />
                            </div>
                        </ValidationProvider>

                        <ValidationProvider ref="entryupsert_permission_key" name="Permission Key" v-slot="{ validate, errors }" rules="required">
                            <div class="form-group-wrap mb-3">
                                <label class="mb-1 block text-xs font-medium --text-dark">Key</label>
                                <input 
                                :value="state.inputs.permission_key"
                                @input="e => { 
                                    setState({ handle: 'state.inputs', key: 'permission_key', value: e.target.value });
                                    validate(e); 
                                }"
                                type="text"
                                class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border" 
                                v-vchecker="errors[0]"
                                />
                                <v-msg :error="errors[0]" />
                            </div>
                        </ValidationProvider>

                        <div class="form-group-wrap mb-3">
                            <label for="new-shift_start" class="mb-2 block text-xs font-medium --text-dark">Description</label>
                            <textarea
                            class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border"
                            :value="state.inputs.description"
                            rows="5"
                            @input="e => { 
                                setState({ handle: 'state.inputs', key: 'description', value: e.target.value });
                            }"
                            ></textarea>
                        </div>

                        <div class="form-group-wrap">
                            <async-button ref="entryupsert_btn" type="submit" :class="`p-3 ${btnclassnormal} mt-3`">
                                <span v-if="state.inputs.uid">Save Changes</span>
                                <span v-else>Save</span>
                            </async-button>
                        </div>

                    </form>
                </ValidationObserver>
            </template>
        </modal>

    </div>
</template>
<script>
import AsyncButton from "@components/reusables/AsyncButton.vue";
import Modal from "@components/reusables/Modal.vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import VMsg from "@components/reusables/VeeMessage.vue";

import { mapState, mapMutations, mapActions } from "vuex";
export default {
    name: 'AdministrationPermissionForm',
    components: {
        Modal,
        AsyncButton,
        ValidationProvider,
        ValidationObserver,
        VMsg
    },
    computed: {
        ...mapState({
            state: state => state.administration.permissions.state
        }),
    },
    methods: {
        ...mapMutations('administration/permissions', [
            'setState',
            'resetInputs'
        ]),
        ...mapActions('administration/permissions', [
            'StoreUpsertEntry'
        ]),
        async upsertEntry() {
            try {
                this.$refs.entryupsert_btn.loading = true;
                await this.StoreUpsertEntry();
                this.$refs.entryupsert_btn.loading = false;
                if(!this.state.inputs.uid) {
                    this.resetInputs();
                    this.$refs.entryform.open = false;
                    this.$refs.entryupsert.reset();
                }
            } catch($e) {
                this.errorHandle($e, 'entryupsert');
                this.$refs.entryupsert_btn.loading = false;
            }
        }
    }
}
</script>