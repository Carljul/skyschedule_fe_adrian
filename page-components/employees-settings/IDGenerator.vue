<template>
    <div>

        <h5 class="text-md mb-3 --text-heading font-semibold">Employee ID Formatting</h5>

        <p class="--text-dark text-xs">Available shortcodes: <code>[year]</code> <code>[month]</code> <code>[day]</code></p>

        <form class="mt-5" @submit.prevent="updateData">

            <div class="grid grid-cols-3 gap-4">

                <div class="form-group-wrap mb-3">
                <label class="mb-1 block text-xs font-medium --text-dark">ID Prefix</label>
                <input type="text" 
                class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border" 
                :value="state.inputs.employee_id_prefix" 
                @input="e => { 
                    setState({ handle: 'state.inputs', key: 'employee_id_prefix', value: e.target.value });
                }">
                </div>

                <div class="form-group-wrap mb-3">
                <label class="mb-1 block text-xs font-medium --text-dark">ID Zero Length</label>
                <input type="number" 
                class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border" 
                :value="state.inputs.employee_id_zero_length" 
                @input="e => { 
                    setState({ handle: 'state.inputs', key: 'employee_id_zero_length', value: e.target.value });
                }">
                <p class="--text-dark text-xs">If the id has auto-zero fill</p>
                <p class="--text-dark text-xs">ex: prefix-00001-suffix</p>
                </div>

                <div class="form-group-wrap mb-3">
                <label class="mb-1 block text-xs font-medium --text-dark">ID Suffix</label>
                <input type="text" 
                class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border" 
                :value="state.inputs.employee_id_suffix" 
                @input="e => { 
                    setState({ handle: 'state.inputs', key: 'employee_id_suffix', value: e.target.value });
                }">
                </div>

            </div>


            <div class="mt-5">
                <p class="--text-dark text-xs">
                    <strong>Note:</strong> changes applied only for new added employee.
                </p>
            </div>


            <div class="mt-5">
                <async-button type="submit" ref="btn" :class="` py-2 ${btnclassnormal}`">
                    Save Changes
                </async-button>
            </div>

        </form>

    </div>
</template>
<script>
import AsyncButton from "@components/reusables/AsyncButton.vue";
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
    components: {
        AsyncButton
    },
    computed: {
        ...mapState({
            state: state => state.employees.settings.state
        }),
    },
    methods: {
        ...mapMutations('employees/settings', [
            'setState',
        ]),
        ...mapActions('employees/settings', [
            'updateEmployeeIdFormatting',
        ]),
        async updateData() {
            this.$refs.btn.loading = true;
            try {
                await this.updateEmployeeIdFormatting();
                this.$store.dispatch('global/refreshUserSession', {}, { root: true });
                this.$refs.btn.loading = false;
            } catch($e) {
                this.errorHandle($e);
                this.$refs.btn.loading = false;
            }
        }
    }
}
</script>