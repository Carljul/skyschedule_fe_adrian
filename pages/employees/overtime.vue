<template>
    <div class="employee-overtime-page mb-10">

        <div class="mb-10 mt-5">
            <h3 class="text-lg mb-3 --text-heading font-semibold">Overtime</h3>
            <breadcrumbs
            :lists="[
                { text: 'Overtime' }
            ]"
            />
        </div>

        <page-search />

        <page-filter />

        <page-lists />

    </div>
</template>
<script>
import Breadcrumbs from "@components/reusables/Breadcrumbs.vue";
import PageFilter from "@page_components/employees-overtime/Filter.vue";
import PageLists from "@page_components/employees-overtime/Lists.vue";
import PageSearch from "@page_components/employees-overtime/Search.vue";

import { mapActions } from "vuex";

export default {
    name: "EmployeesOvertimePage",
    layout: "main",
    middleware: ['auth', 'organizationUID', 'permission'],
    ssr: false,
    meta: {
        permissionKey: `overtime_manage`
    },
    components: {
        PageFilter,
        PageLists,
        PageSearch,
        Breadcrumbs
    },
    head() {
        return {
            title: 'Overtime' + this.theAppTitle
        }
    },
    methods: {
        ...mapActions('employees/overtime', [
            'fetchEntry'
        ])
    },
    async mounted() {
        this.fetchEntry();
    }
}
</script>