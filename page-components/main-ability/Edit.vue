<template>
    <modal ref="modal_editentry" @close="() => {
            setState({ ...state, selected: null });
            $router.push('/ability');
        }" id="modaledit" nofooter contentclass="xl:w-3/12 md:w-5/12 sm:w-7/12">
        <template v-if="state.selected" slot="header">
            <h4 class="--text-heading text-lg font-semibold">
                <span>Edit Ability ({{state.selected.__title}})</span>
            </h4>
        </template>

        <template v-if="state.selected" slot="content">

            <ValidationObserver ref="editability" v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(updateAbility)">
                    <div class="form-group-wrap">
                        <ValidationProvider ref="editability_title" name="title" v-slot="{ validate, errors }" rules="required">
                            <label for="new-department" class="mb-2 block text-xs font-medium --text-dark">Title</label>
                            <input 
                            :value="state.selected.title"
                            @input="e => { 
                                setState({ selected: { ...state.selected, title: e.target.value } }); 
                                validate(e); 
                            }"
                            type="text"
                            class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border" 
                            v-vchecker="errors[0]"
                            />
                            <v-msg :error="errors[0]" />
                        </ValidationProvider>
                        
                        <ValidationProvider ref="editability_name" name="name" v-slot="{ validate, errors }" rules="required">
                            <label for="new-department" class="mb-2 block text-xs font-medium --text-dark">Name</label>
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
                        </ValidationProvider>

                        

                    </div>

                    <div class="form-group-wrap">
                        <async-button ref="editability_btn" type="submit" :class="`p-3 ${btnclassnormal} mt-3`">
                            Save Changes
                        </async-button>
                    </div>
                </form>
            </ValidationObserver>

        </template>
    </modal>
</template>

<script>
import AsyncButton from "@components/reusables/AsyncButton.vue";
import Modal from "@components/reusables/Modal.vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import VMsg from "@components/reusables/VeeMessage.vue";

import { mapState, mapMutations, mapActions } from "vuex"
export default {
    name: 'AbilityIndexEdit',
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
            'StoreUpdateEntry'
        ]),
        async updateAbility() {
            try {
                this.$refs.editability_btn.loading = true;
                await this.StoreUpdateEntry();
                this.$refs.editability_btn.loading = false;
                this.$refs.editability.reset();
            } catch($e) {
                this.errorHandle($e, 'editability');
                this.$refs.editability_btn.loading = false;
            }
        }
    }
}
</script>