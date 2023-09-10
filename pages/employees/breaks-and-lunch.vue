<template>
    <div class="employee-settings-page mb-10">

        <div class="mb-10 mt-5">
            <h3 class="text-lg mb-3 --text-heading font-semibold">Breaks and Lunch</h3>
            
            <breadcrumbs
            :lists="[
                { text: 'Employees', link: permissionCheck(permissions.manage) ? '/employees' : null },
                { text: 'Breaks and Lunch' }
            ]"
            />
        </div>

        <div v-if="!state.loading">

            <div
            >
                <BreakSettings/>
            </div>

        </div>

    </div>
</template>
<script>
import Breadcrumbs from "@components/reusables/Breadcrumbs.vue";
import permissions from "@permissions/employee.js";

import IDGeneratorVue from "@page_components/employees-settings/IDGenerator.vue";
import BreakSettings from "@page_components/employees-settings/BreakSettings.vue";

import { mapState, mapActions } from "vuex";

export default {
    name: "EmployeesBreaksAndLunchPage",
    layout: "main",
    middleware: ['auth', 'organizationUID', 'permission'],
    ssr: false,
    meta: {
        permissionKey: `time_settings_manage`
    },
    head() {
        return {
            title: 'Breaks and Lunch Settings' + this.theAppTitle
        }
    },
    components: {
        Breadcrumbs,
        IDGeneratorVue,
        BreakSettings
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