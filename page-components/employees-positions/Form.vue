<template>
    <div>
        <button 
        @click="$refs.modal_newentry.open=true"
        :class="`p-3 ${btnclassnormal} mb-2 inline-flex items-center p-2 space-x-1 text-sm float-right fixed bottom-2 right-2 lg:static lg:px-4 lg:py-2.5`">
            <span>New Position</span>
        </button>

        <modal ref="modal_newentry" nofooter contentclass="xl:w-3/12 md:w-5/12 sm:w-7/12">
            <template slot="header">
                <h4 class="--text-heading text-lg font-semibold">
                    <span>New Position</span>
                </h4>
            </template>

            <template slot="content">

                <ValidationObserver ref="newentry" v-slot="{ handleSubmit }">
                    <form @submit.prevent="handleSubmit(addEntry)">

                        <ValidationProvider ref="newentry_department_uid" name="Department" v-slot="{ validate, errors }" rules="required">
                            <div class="form-group-wrap mb-3">
                                <label class="mb-2 block text-xs font-medium --text-dark">Department</label>
                                <client-only>
                                    <t-select-dynamic 
                                    :endpoint="`${getOrgUID}/departments`" 
                                    datakeylabel="name" 
                                    datakeyvalue="uid"
                                    searchplaceholder="Type to Search Department"
                                    placeholder="Choose Department"
                                    class="py-1.5"
                                    v-vchecker="errors[0]"
                                    @input="e => setState({ inputs: { ...state.inputs, department_uid: e } })"
                                    ></t-select-dynamic>
                                    <input type="hidden" 
                                    :value="state.inputs.department_uid" 
                                    @input="e => {
                                        setState({ inputs: { ...state.inputs, department_uid: e.target.value } }); 
                                        validate(e); 
                                    }">
                                </client-only>
                                <v-msg :error="errors[0]" />
                            </div>
                        </ValidationProvider>
                            
                        <ValidationProvider ref="newentry_position" name="Position" v-slot="{ validate, errors }" rules="required">
                            <div class="form-group-wrap mb-3">
                                <label class="mb-2 block text-xs font-medium --text-dark">Position</label>
                                <input 
                                :value="state.inputs.position"
                                @input="e => { 
                                    setState({ inputs: { ...state.inputs, position: e.target.value } }); 
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
                            <async-button ref="newentry_btn" type="submit" :class="`p-3 ${btnclassnormal} mt-3`">
                                Save Position
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
import TSelectDynamic from "@components/reusables/SelectDynamic.vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import VMsg from "@components/reusables/VeeMessage.vue";

import { mapState, mapMutations, mapActions } from "vuex";
export default {
    name: 'EmployeesPositionForm',
    components: {
        AsyncButton,
        Modal,
        TSelectDynamic,
        ValidationProvider,
        ValidationObserver,
        VMsg
    },
    computed: {
        ...mapState({
            state: state => state.employees.positions.state
        }),
    },
    methods: {
        ...mapMutations('employees/positions', [
            'setState',
        ]),
        ...mapActions('employees/positions', [
            'StoreInsertEntry'
        ]),
        async addEntry() {
            try {
                this.$refs.newentry_btn.loading = true;
                await this.StoreInsertEntry();
                this.$refs.newentry_btn.loading = false;
                this.$refs.modal_newentry.open = false;
                this.$refs.newentry.reset();
            } catch($e) {
                this.errorHandle($e, 'newentry');
                this.$refs.newentry_btn.loading = false;
            }
        }
    }
}
</script>