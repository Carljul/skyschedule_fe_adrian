<template>
    <div class="employees-index-page mb-10">
        <page-header />

        <div class="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 gap-4">
            <div>
                <page-search />
            </div>                        
            <div>
                <page-form />
            </div>

        </div>
        
        <edit-form />
        <page-lists class="mt-5" />

        <EmployeeNotifications/>

    </div>
</template>
<script>
import PageHeader from "@page_components/employees-index/PageHeader.vue";
import PageLists from "@page_components/employees-index/Lists.vue";
import PageSearch from "@page_components/employees-index/Search.vue";
import PageForm from "@page_components/employees-index/Form.vue";
import EditForm from "@page_components/employees-index/Edit.vue";
import TSelectDynamic from "@components/reusables/SelectDynamic.vue";
import EmployeeNotifications from "@page_components/employees-index/Notifications.vue";

import permissions from "@permissions/employee.js";

import { mapState, mapMutations, mapActions } from "vuex";

export default {
    name: "EmployeesIndexPage",
    layout: "main",
    // middleware: ['auth', 'organizationUID', 'permission', 'withOrganization'],
    ssr: false,
    meta: {
        permissionKey: `employee_manage`
    },
    head() {
        return {
            title: 'Employees' + this.theAppTitle
        }
    },
    components: {
        PageHeader,
        PageLists,
        PageSearch,
        PageForm,
        EditForm,
        TSelectDynamic,
        EmployeeNotifications
    },
    computed: {
        ...mapState({
            state: state => state.employees.employees.state
        }),
        ...permissions
    },
    methods: {
        ...mapMutations('employees/employees', [
            'setState'
        ]),
        ...mapActions('employees/employees', [
            'fetchEntry',
            'fetchByUID'
        ]),
        resetFilter() {
            this.setState({ entry: { ...this.state.entry, filter: { ...this.state.entry.filter, department_uid: null } } });
            this.setState({ entry: { ...this.state.entry, filter: { ...this.state.entry.filter, position_uid: null } } });
        }
    },
    watch: {
        $route: async function(to, from) {
            if(!this.permissionCheck(this.permissions.manage)) {
                return false;
            }
            if(to.query.uid) {
                this.nuxtload();
                await this.fetchByUID(to.query.uid);
                this.nuxtunload();
            } else {
                this.findPageComponent('EmployeesIndexEdit').$refs.modal_editentry.open=false;
            }
        }
    },
    async mounted() {
        this.resetFilter();
        await this.fetchEntry();

        if(this.$route.query.uid) {
            this.nuxtload();
            await this.fetchByUID(this.$route.query.uid);
            this.nuxtunload();
        }
    }
}
</script>