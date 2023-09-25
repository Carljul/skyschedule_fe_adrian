<template>
    <div>
        <button 
        @click="$refs.modal_newability.open=true"
        :class="`p-3 ${btnclassnormal} mb-2 inline-flex items-center p-2 space-x-1 text-sm float-right fixed bottom-2 right-2 lg:static lg:px-4 lg:py-2.5`">
            <span>New Ability</span>
        </button>

        <modal ref="modal_newability" nofooter contentclass="xl:w-3/12 md:w-5/12 sm:w-7/12">
            <template slot="header">
                <h4 class="--text-heading text-lg font-semibold">
                    <span>New Ability</span>
                </h4>
            </template>

            <template slot="content">

                <ValidationObserver ref="newability" v-slot="{ handleSubmit }">
                    <form @submit.prevent="handleSubmit(addAbility)">
                            
                        <ValidationProvider ref="newability_name" name="name" v-slot="{ validate, errors }" rules="required">
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

                        <ValidationProvider ref="newability_title" name="title" v-slot="{ validate, errors }" rules="required">
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

                        <div class="form-group-wrap">
                            <async-button ref="newability_btn" type="submit" :class="`p-3 ${btnclassnormal} mt-3`">
                                Save Ability
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

import { mapState, mapMutations, mapActions } from "vuex"
export default {
    name: 'AbilityForm',
    components: {
        AsyncButton,
        Modal,
        ValidationProvider,
        ValidationObserver,
        VMsg
    },
    computed: {
        ...mapState({
            state: state => state.main.ability.state
        }),
    },
    methods: {
        ...mapMutations('main/ability', [
            'setState'
        ]),
        ...mapActions('main/ability', [
            'StoreInsertEntry'
        ]),
        async addAbility() {
            try {
                this.$refs.newability_btn.loading = true;
                await this.StoreInsertEntry();
                this.$refs.newability_btn.loading = false;
                this.$refs.modal_newability.open = false;
                this.$refs.newability.reset();
            } catch($e) {
                this.errorHandle($e, 'newability');
                this.$refs.newability_btn.loading = false;
            }
        }
    }
}
</script>