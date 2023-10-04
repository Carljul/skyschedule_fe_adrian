<template>
    <modal ref="modal_editentry" @close="() => {
            setState({ ...state, selected: null });
            $router.push('/role');
        }" id="modaledit" nofooter contentclass="xl:w-3/12 md:w-5/12 sm:w-7/12">
        <template v-if="state.selected" slot="header">
            <h4 class="--text-heading text-lg font-semibold">
                <span>Edit Role ({{state.selected.__title}})</span>
            </h4>
        </template>

        <template v-if="state.selected" slot="content">

            <ValidationObserver ref="editrole" v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(updateRole)">
                    <div class="form-group-wrap">
                        <ValidationProvider ref="editrole_title" name="title" v-slot="{ validate, errors }" rules="required">
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
                        
                        <ValidationProvider ref="editrole_name" name="name" v-slot="{ validate, errors }" rules="required">
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
<!-- 
                        <ValidationProvider ref="newentry_department_uid" name="Department" v-slot="{ validate, errors }" rules="required">
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
                        </ValidationProvider> -->
                        

                    </div>

                    <div class="form-group-wrap">
                        <async-button ref="editrole_btn" type="submit" :class="`p-3 ${btnclassnormal} mt-3`">
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
    name: 'RoleIndexEdit',
    components: {
        AsyncButton,
        Modal,
        ValidationProvider,
        ValidationObserver,
        VMsg
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
            'StoreUpdateEntry'
        ]),
        async updateRole() {
            try {
                this.$refs.editrole_btn.loading = true;
                await this.StoreUpdateEntry();
                this.$refs.editrole_btn.loading = false;
                this.$refs.editrole.reset();
            } catch($e) {
                this.errorHandle($e, 'editrole');
                this.$refs.editrole_btn.loading = false;
            }
        }
    }
}
</script>