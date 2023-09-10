<template>
    <div class="w-full sm:w-80 max-w-full">
        <form class="flex items-center" @submit.prevent="fetchEntry" novalidate>
            <label for="simple-search" class="sr-only">Search</label>
            <div class="relative w-full">
                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                </div>
                <input 
                type="text" 
                class="border border-gray-300 --text-dark text-sm rounded block w-full pl-10 p-2" placeholder="Search"
                :value="state.entry.filter.query"
                @input="e => setState({ entry: { ...state.entry, filter: { ...state.entry.filter, query: e.target.value } } })"
                >
            </div>
        </form>

        <client-only>
            <t-select-status 
            :value="{with_trashed:state.entry.filter.with_trashed,only_trashed:state.entry.filter.only_trashed}"
            class="mt-3" 
            @input="e => {
                setState({ entry: { ...state.entry, filter: { ...state.entry.filter, ...e } } });
                fetchEntry();
            }"></t-select-status>
        </client-only>
    </div>
</template>
<script>
import TSelectStatus from "@components/reusables/SelectEntryStatus.vue";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
    name: 'EmployeesLeaveTypeSearch',
    components: {
        TSelectStatus
    },
    computed: {
        ...mapState({
            state: state => state.employees.leave_types.state
        }),
    },
    methods: {
        ...mapMutations('employees/leave_types', [
            'setState'
        ]),
        ...mapActions('employees/leave_types', [
            'fetchEntry'
        ])
    }
}
</script>