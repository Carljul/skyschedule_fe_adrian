<template>
    <div>
        <button 
        @click="$refs.modal_newrole.open=true"
        :class="`p-3 ${btnclassnormal} mb-2 inline-flex items-center p-2 space-x-1 text-sm float-right fixed bottom-2 right-2 lg:static lg:px-4 lg:py-2.5`">
            <span>New Role</span>
        </button>

        <modal ref="modal_newrole" nofooter contentclass="xl:w-3/12 md:w-5/12 sm:w-7/12">
            <template slot="header">
                <h4 class="--text-heading text-lg font-semibold">
                    <span>New Role</span>
                </h4>
            </template>

            <template slot="content">

                <ValidationObserver ref="newrole" v-slot="{ handleSubmit }">
                    <form @submit.prevent="handleSubmit(addRole)">
                            
                        <ValidationProvider ref="newrole_name" name="name" v-slot="{ validate, errors }" rules="required">
                            <div class="form-group-wrap">
                                <label for="new-department" class="mb-2 block text-xs font-medium --text-dark">Name</label>
                                <input 
                                :value="state.inputs.name"
                                @input="e => { 
                                    setState({ inputs: { ...state.inputs, name: e.target.value } }); 
                                    validate(e); 
                                }"
                                type="text"
                                class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border" 
                                v-vchecker="errors[0]"
                                />
                                <v-msg :error="errors[0]" />
                            </div>
                        </ValidationProvider>

                        <ValidationProvider ref="newrole_title" name="title" v-slot="{ validate, errors }" rules="required">
                            <div class="form-group-wrap">
                                <label for="new-department" class="mb-2 block text-xs font-medium --text-dark">Title</label>
                                <input 
                                :value="state.inputs.title"
                                @input="e => { 
                                    setState({ inputs: { ...state.inputs, title: e.target.value } }); 
                                    validate(e); 
                                }"
                                type="text"
                                class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border" 
                                v-vchecker="errors[0]"
                                />
                                <v-msg :error="errors[0]" />
                            </div>
                        </ValidationProvider>

                        <ValidationProvider ref="newentry_ability" name="Ability" v-slot="{ validate, errors }" rules="required">
                            <div class="form-group-wrap mb-3">
                                <label class="mb-2 block text-xs font-medium --text-dark">Abilities</label>
                                <client-only>
                                    <t-select-dynamic 
                                    :endpoint="`/abilities`" 
                                    datakeylabel="name" 
                                    datakeyvalue="id"
                                    searchplaceholder="Type to Search Abilities"
                                    placeholder="Choose Abilities"
                                    multiple
                                    class="py-1.5"
                                    v-vchecker="errors[0]"
                                    @input="e => setState({ inputs: { ...state.inputs, role_id: e } })"
                                    ></t-select-dynamic>
                                    <input type="hidden" 
                                    :value="state.inputs.role_id" 
                                    @input="e => {
                                        setState({ inputs: { ...state.inputs, role_id: e.target.value } }); 
                                        validate(e); 
                                    }">
                                </client-only>
                                <v-msg :error="errors[0]" />
                            </div>
                        </ValidationProvider>
                        <div class="form-group-wrap">
                            <async-button ref="newrole_btn" type="submit" :class="`p-3 ${btnclassnormal} mt-3`">
                                Save Role
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
import TSelectDynamic from "@components/reusables/SelectDynamic.vue";

import { mapState, mapMutations, mapActions } from "vuex"
export default {
    name: 'RoleForm',
    components: {
        AsyncButton,
        Modal,
        ValidationProvider,
        ValidationObserver,
        VMsg,
        TSelectDynamic
    },
    computed: {
        ...mapState({
            state: state => state.main.role.state
        }),
    },
    methods: {
        ...mapMutations('main/role', [
            'setState'
        ]),
        ...mapActions('main/role', [
            'StoreInsertEntry'
        ]),
        async addRole() {
            try {
                this.$refs.newrole_btn.loading = true;
                await this.StoreInsertEntry();
                this.$refs.newrole_btn.loading = false;
                this.$refs.modal_newrole.open = false;
                this.$refs.newrole.reset();
            } catch($e) {
                this.errorHandle($e, 'newrole');
                this.$refs.newrole_btn.loading = false;
            }
        }
    }
}
</script>