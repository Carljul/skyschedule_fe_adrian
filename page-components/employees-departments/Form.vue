<template>
    <div>
        <button 
        @click="$refs.modal_newdepartment.open=true"
        :class="`p-3 ${btnclassnormal} mb-2 inline-flex items-center p-2 space-x-1 text-sm float-right fixed bottom-2 right-2 lg:static lg:px-4 lg:py-2.5`">
            <span>New Department</span>
        </button>

        <modal ref="modal_newdepartment" nofooter contentclass="xl:w-3/12 md:w-5/12 sm:w-7/12">
            <template slot="header">
                <h4 class="--text-heading text-lg font-semibold">
                    <span>New Department</span>
                </h4>
            </template>

            <template slot="content">

                <ValidationObserver ref="newdepartment" v-slot="{ handleSubmit }">
                    <form @submit.prevent="handleSubmit(addDepartment)">
                            
                        <ValidationProvider ref="newdepartment_name" name="Department" v-slot="{ validate, errors }" rules="required">
                            <div class="form-group-wrap">
                                <label for="new-department" class="mb-2 block text-xs font-medium --text-dark">Department</label>
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

                        <div class="form-group-wrap">
                            <async-button ref="newdepartment_btn" type="submit" :class="`p-3 ${btnclassnormal} mt-3`">
                                Save Department
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
    name: 'EmployeesDepartmentForm',
    components: {
        AsyncButton,
        Modal,
        ValidationProvider,
        ValidationObserver,
        VMsg
    },
    computed: {
        ...mapState({
            state: state => state.employees.departments.state
        }),
    },
    methods: {
        ...mapMutations('employees/departments', [
            'setState'
        ]),
        ...mapActions('employees/departments', [
            'StoreInsertEntry'
        ]),
        async addDepartment() {
            try {
                this.$refs.newdepartment_btn.loading = true;
                await this.StoreInsertEntry();
                this.$refs.newdepartment_btn.loading = false;
                this.$refs.modal_newdepartment.open = false;
                this.$refs.newdepartment.reset();
            } catch($e) {
                this.errorHandle($e, 'newdepartment');
                this.$refs.newdepartment_btn.loading = false;
            }
        }
    }
}
</script>