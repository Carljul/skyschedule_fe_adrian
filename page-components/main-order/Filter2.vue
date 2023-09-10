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

        <!-- <client-only>
            <t-select-status 
            :value="{with_trashed:state.entry.filter.with_trashed,only_trashed:state.entry.filter.only_trashed}"
            class="mt-3" 
            @input="e => {
                setState({ entry: { ...state.entry, filter: { ...state.entry.filter, ...e } } });
                fetchEntry();
            }"></t-select-status>
        </client-only> -->
        
        <!-- <div class="mt-5 mb-5">
            <nuxt-link
            to="/order/print_order"
            target="_blank"
            class="flex items-center p-2 space-x-2 hover:bg-gray-100 border-l-4 border-transparent text-slate-500 --border-primary-hover --text-primary-hover"
            exact>
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
            </span>
            <span class="text-lg">Print Record</span>
        </nuxt-link>
        </div> -->
        
    </div>
</template>
<script>
import TSelectStatus from "@components/reusables/SelectEntryStatus.vue";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
    name: 'EmployeesDepartmentSearch',
    components: {
        TSelectStatus
    },
    computed: {
        ...mapState({
            state: state => state.order.order.state
        }),
    },
    methods: {
        ...mapMutations('order/order', [
            'setState'
        ]),
        ...mapActions('order/order', [
            'fetchEntry'
        ])
    }
}
</script>