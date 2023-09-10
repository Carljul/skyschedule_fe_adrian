<template>
    <div class="employee-settings-page mb-10">

        <div class="mb-10 mt-5">
            <h3 class="text-lg mb-3 --text-heading font-semibold">ID Generator</h3>
            
            <breadcrumbs
            :lists="[
                { text: 'Employees', link: permissionCheck(permissions.manage) ? '/employees' : null },
                { text: 'ID Generator' }
            ]"
            />
        </div>

        <div v-if="!state.loading" class="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <div>
                <IDGeneratorVue/>
            </div>

        </div>

    </div>
</template>
<script>
import Breadcrumbs from "@components/reusables/Breadcrumbs.vue";
import permissions from "@permissions/employee.js";

import IDGeneratorVue from "@page_components/employees-settings/IDGenerator.vue";
import TimeSettings from "@page_components/employees-settings/TimeSettings.vue";

import { mapState, mapActions } from "vuex";

export default {
    name: "EmployeesIDGeneratorPage",
    layout: "main",
    middleware: ['auth', 'organizationUID', 'permission'],
    ssr: false,
    meta: {
        permissionKey: `employee_id_generator_manage`
    },
    head() {
        return {
            title: 'ID Generator' + this.theAppTitle
        }
    },
    components: {
        Breadcrumbs,
        IDGeneratorVue,
        TimeSettings
    },
    computed: {
        setting() {
            return this.$route.query.setting;
        },
        ...mapState({
            state: state => state.employees.settings.state
        }),
        ...permissions
    },
    methods: {
        ...mapActions('employees/settings', [
            'fetchByUID'
        ])
    },
    async mounted() {
        this.nuxtload();
        await this.fetchByUID();
        this.nuxtunload();
    }
}
</script>