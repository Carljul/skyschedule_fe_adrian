<template>

    <div class="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 gap-4">
        <div>
            <div class="w-full max-w-full">
                <form class="flex items-center" @submit.prevent="fetchEntry" novalidate>   
                    <label for="simple-search" class="sr-only">Search</label>
                    <div class="relative w-full">
                        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                        </div>
                        <input 
                        type="text" 
                        class="border border-gray-300 --text-dark text-sm rounded block w-full pl-10 p-2 input-focus-border" placeholder="Search Employee, ID etc..."
                        :value="state.entry.filter.query"
                        @input="e => setState({ handle: 'state.entry.filter', key: 'query', value: e.target.value })"
                        >
                    </div>
                </form>
            </div>
        </div>
        <div>
            <client-only>
                <t-select-dynamic 
                :endpoint="`${getOrgUID}/departments`" 
                datakeylabel="name" 
                datakeyvalue="uid"
                searchplaceholder="Type to Search Department"
                placeholder="Choose Department"
                class="py-1.5"
                :value="state.entry.filter.department_uid"
                @input="e => {
                    setState({ handle: 'state.entry.filter', key: 'position_uid', value: null });
                    setState({ handle: 'state.entry.filter', key: 'department_uid', value: e });
                    fetchEntry();
                }"
                @clear="e => {
                    setState({ handle: 'state.entry.filter', key: 'position_uid', value: null });
                    fetchEntry();
                }"
                ></t-select-dynamic>
            </client-only>
        </div>
        <div>
            <client-only>
                <t-select-dynamic 
                ref="dddynamicposition"
                :key="`dynamicposition-${state.entry.filter.department_uid}`"
                v-if="state.entry.filter.department_uid"
                :endpoint="`${getOrgUID}/positions?department_uid=${state.entry.filter.department_uid}`" 
                datakeylabel="position" 
                datakeyvalue="uid"
                searchplaceholder="Type to Search Position"
                placeholder="Choose Position"
                class="py-1.5"
                :value="state.entry.filter.position_uid"
                @input="e => {
                    setState({ handle: 'state.entry.filter', key: 'position_uid', value: e });
                    fetchEntry();
                }"
                ></t-select-dynamic>
            </client-only>
        </div>

        <div></div>

    </div>
</template>
<script>
import TSelectDynamic from "@components/reusables/SelectDynamic.vue";
import { mapState, mapMutations, mapActions } from "vuex"
export default {
    name: 'EmployeesOvertimeSearch',
    components: {
        TSelectDynamic
    },
    computed: {
        ...mapState({
            state: state => state.employees.overtime.state
        }),
    },
    methods: {
        ...mapMutations('employees/overtime', [
            'setState'
        ]),
        ...mapActions('employees/overtime', [
            'fetchEntry'
        ])
    }
}
</script>