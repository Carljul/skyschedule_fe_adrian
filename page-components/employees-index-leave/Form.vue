<template>
    <div>
        <button 
        @click="$refs.formentry.open=true"
        :class="`p-3 ${btnclassnormal} mb-2 inline-flex items-center p-2 space-x-1 text-sm float-right fixed bottom-2 right-2 lg:static lg:px-4 lg:py-2.5`">
            <span>New Leave Access</span>
        </button>

        <modal ref="formentry" nofooter contentclass="xl:w-3/12 md:w-5/12 sm:w-7/12"
        @close="resetInputs"
        >
            <template slot="header">
                <h4 class="--text-heading text-lg font-semibold">
                    <span>New Leave Access</span>
                </h4>
            </template>

            <template slot="content">

<ValidationObserver ref="newentry" v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(addEntry)">

        <ValidationProvider ref="newentry_leavetype_uid" name="Permission" v-slot="{ validate, errors }" rules="required">
            <div class="form-group-wrap mb-3">
                <label class="mb-2 block text-xs font-medium --text-dark">Permission</label>
                <client-only>
                    <t-select-dynamic 
                    :endpoint="`${getOrgUID}/leave_types`" 
                    datakeylabel="title" 
                    datakeyvalue="uid"
                    searchplaceholder="Type to Search Leave Type"
                    placeholder="Choose Leave Type"
                    class="py-1.5"
                    v-vchecker="errors[0]"
                    @input="e => setState({ handle: 'state.inputs', key: 'leavetype_uid', value: e })"
                    ></t-select-dynamic>
                    <input type="hidden" 
                    :value="state.inputs.leavetype_uid" 
                    @input="e => {
                        setState({ handle: 'state.inputs', key: 'leavetype_uid', value: e.target.value }); 
                        validate(e); 
                    }">

                </client-only>
                <v-msg :error="errors[0]" />
            </div>
        </ValidationProvider>        
        <div class="form-group-wrap">
            <async-button ref="newentry_btn" type="submit" :class="`p-3 ${btnclassnormal} mt-3`">
                Save Permission
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
import SwitchToggle from "@components/reusables/SwitchToggle.vue";

import { mapState, mapMutations, mapActions } from "vuex";
export default {
    name: 'EmployeesIndexPermissionForm',
    components: {
        AsyncButton,
        Modal,
        TSelectDynamic,
        ValidationProvider,
        ValidationObserver,
        VMsg,
        SwitchToggle,
    },
    computed: {
        ...mapState({
            state: state => state.employees.employee_leave.state
        }),
    },
    methods: {
        ...mapMutations('employees/employee_leave', [
            'setState',
            'resetInputs'
        ]),
        ...mapActions('employees/employee_leave', [
            'StoreEntry',
            'fetchEntry',
        ]),
        async addEntry() {
            try {
                this.$refs.newentry_btn.loading = true;
                await this.StoreEntry();
                this.$refs.newentry_btn.loading = false;
                this.$refs.formentry.open = false;
                this.resetInputs();
                this.$refs.newentry.reset();
            } catch($e) {
                this.errorHandle($e, 'newentry');
                this.$refs.newentry_btn.loading = false;
            }
        }
    }
}
</script>