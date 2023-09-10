<template>
    <div class="settings-index-page">

        <div class="mb-10 mt-5">
            <h3 class="text-lg mb-3 --text-heading font-semibold">Settings</h3>
            <breadcrumbs
            :lists="[
                { text: 'Settings' }
            ]"
            />
        </div>

        <div v-if="appIsAdmin" class="w-full md:w-96">
            <EditAdminForm/>
        </div>

        <div v-if="appIsEmployee" class="w-full xl:w-5/6">
            <EditEmployeeForm :excludefields="['position_uid', 'date_hired', 'jsondata', 'shift_start', 'shift_end', 'documents', 'salary']"/>
        </div>

        <div v-if="appIsOrganization" class="w-1/3">
            <EditOrgForm/>
        </div>

    </div>
</template>
<script>
import EditEmployeeForm from "@components/editforms/Employee.vue";
import EditAdminForm from "@components/editforms/Admin.vue";
import EditOrgForm from "@components/editforms/Organization.vue";

import Breadcrumbs from "@components/reusables/Breadcrumbs.vue";
import { mapMutations, mapState } from "vuex"
export default {
    name: 'SettingsIndexPage',
    middleware: ['auth'],
    layout: 'main',
    components: {
        Breadcrumbs,
        EditEmployeeForm,
        EditAdminForm,
        EditOrgForm
    },
    head() {
        return {
            title: 'Settings' + this.theAppTitle
        }
    },
    computed: {
        ...mapState({
            orgstate: state => state.administration.organizations.state
        })
    },
    created() {
        if(this.appIsEmployee) {
            const selected = { ...this.$auth.user.employee, user: this.$auth.user };
            delete selected.position_uid;
            delete selected.date_hired;
            delete selected.jsondata;
            delete selected.shift_start;
            delete selected.shift_end;
            delete selected.documents;

            this.employeeSetState({
                selected
            });

            console.log(selected)
        }

        if(this.appIsAdmin) {
            this.adminSetState({
                selected: this.$auth.user
            })
        }

        if(this.appIsOrganization) {
            const userdata = {...this.$auth.user};
            delete userdata.organization;
            this.orgSetState({
                selected: { 
                    organization: this.$auth.user.organization.organization,
                    ...this.$auth.user.organization, 
                    user: { ...userdata } 
                }
            })
        }
    },
    methods: {
        ...mapMutations({
            employeeSetState: 'employees/employees/setState',
            adminSetState: 'administration/users/setState',
            orgSetState: 'administration/organizations/setState',
        }),
    },
    beforeDestroy() {
        this.employeeSetState({ selected: {} });
        this.adminSetState({ selected: {} });
        this.orgSetState({ selected: {} });
    }
}
</script>