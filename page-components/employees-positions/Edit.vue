<template>
    <modal ref="modal_editentry" @close="() => {
        setState({ ...state, selected: null });
        $router.push(`/employees/positions`);
    }" id="modaledit" nofooter contentclass="xl:w-3/12 md:w-5/12 sm:w-7/12">
        <template v-if="state.selected" slot="header">
            <h4 class="--text-heading text-lg font-semibold">
                <span>Edit Department ({{state.selected.__title}})</span>
            </h4>
        </template>

        <template v-if="state.selected" slot="content">

            <ValidationObserver ref="editentry" v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(updateDepartment)">
                    <div class="form-group-wrap">

                        <ValidationProvider ref="editentry_department_uid" name="Department" v-slot="{ validate, errors }" rules="required">
                            <div class="form-group-wrap mb-3">
                                <label class="mb-2 block text-xs font-medium --text-dark">Department</label>
                                
                                <client-only>
                                    <t-select-dynamic 
                                    ref="departmentinput"
                                    :endpoint="`${getOrgUID}/departments`" 
                                    datakeylabel="name" 
                                    datakeyvalue="uid"
                                    searchplaceholder="Type to Search Department"
                                    placeholder="Choose Department"
                                    class="py-1.5"
                                    v-vchecker="errors[0]"
                                    :value="state.selected.department_uid"
                                    @input="e => setState({ selected: { ...state.selected, department_uid: e } })"
                                    ></t-select-dynamic>
                                    <input type="hidden" 
                                    :value="state.selected.department_uid" 
                                    @input="e => {
                                        setState({ selected: { ...state.selected, department_uid: e.target.value } }); 
                                        validate(e); 
                                    }"/>
                                </client-only>
                                
                                <v-msg :error="errors[0]" />
                            </div>
                        </ValidationProvider>
                        
                        <ValidationProvider ref="editentry_position" name="Position" v-slot="{ validate, errors }" rules="required">
                            <label for="new-position" class="mb-2 block text-xs font-medium --text-dark">Position</label>
                            <input 
                            :value="state.selected.position"
                            @input="e => { 
                                setState({ selected: { ...state.selected, position: e.target.value } }); 
                                validate(e); 
                            }"
                            type="text"
                            class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border" 
                            v-vchecker="errors[0]"
                            />
                            <v-msg :error="errors[0]" />
                        </ValidationProvider>

                    </div>

                    <div class="form-group-wrap mt-2">
                        <async-button ref="editentry_btn" type="submit" :class="`p-3 ${btnclassnormal} mt-3`">
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
import TSelectDynamic from "@components/reusables/SelectDynamic.vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import VMsg from "@components/reusables/VeeMessage.vue";

import { mapState, mapMutations, mapActions } from "vuex";
export default {
    name: 'EmployeesPositionsEdit',
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
            'StoreUpdateEntry'
        ]),
        async updateDepartment() {
            try {
                this.$refs.editentry_btn.loading = true;
                await this.StoreUpdateEntry();
                this.$refs.editentry_btn.loading = false;
                this.$refs.editentry.reset();
            } catch($e) {
                this.errorHandle($e, 'editentry');
                this.$refs.editentry_btn.loading = false;
            }
        }
    }
}
</script>