<template>
    <modal ref="modal_editentry" @close="() => {
            setState({ ...state, selected: null });
            $router.push('/employees/departments');
        }" id="modaledit" nofooter contentclass="xl:w-3/12 md:w-5/12 sm:w-7/12">
        <template v-if="state.selected" slot="header">
            <h4 class="--text-heading text-lg font-semibold">
                <span>Edit Department ({{state.selected.__title}})</span>
            </h4>
        </template>

        <template v-if="state.selected" slot="content">

            <ValidationObserver ref="editdepartment" v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(updateDepartment)">
                    <div class="form-group-wrap">
                        
                        <ValidationProvider ref="editdepartment_name" name="Department" v-slot="{ validate, errors }" rules="required">
                            <label for="new-department" class="mb-2 block text-xs font-medium --text-dark">Department</label>
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
                        <async-button ref="editdepartment_btn" type="submit" :class="`p-3 ${btnclassnormal} mt-3`">
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
    name: 'EmployeesDepartmentsEdit',
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
            'StoreUpdateEntry'
        ]),
        async updateDepartment() {
            try {
                this.$refs.editdepartment_btn.loading = true;
                await this.StoreUpdateEntry();
                this.$refs.editdepartment_btn.loading = false;
                this.$refs.editdepartment.reset();
            } catch($e) {
                this.errorHandle($e, 'editdepartment');
                this.$refs.editdepartment_btn.loading = false;
            }
        }
    }
}
</script>