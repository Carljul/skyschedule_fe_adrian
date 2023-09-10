<template>
    <div class="employees-departments-page mb-10">
        <page-header />

        <div class="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 gap-4">
            <div>
                <page-search />
            </div>
            <div></div>
            <div></div>
            <div>
                <page-form />
            </div>
        </div>
        
        <edit-form />
        <page-lists class="mt-5" />

    </div>
</template>
<script>
import PageHeader from "@page_components/employees-index-leave/PageHeader.vue";
import PageLists from "@page_components/employees-index-leave/Lists.vue";
import PageSearch from "@page_components/employees-index-leave/Search.vue";
import PageForm from "@page_components/employees-index-leave/Form.vue";
import EditForm from "@page_components/employees-index-leave/Edit.vue";

import { mapMutations, mapActions } from "vuex";
import permissions from "@permissions/departments.js";

export default {
    name: "EmployeesDepartmentsPage",
    layout: "main",
    middleware: ['auth', 'organizationUID', 'permission'],
    ssr: false,
    meta: {
        permissionKey: `departments_manage`
    },
    head() {
        return {
            title: 'Leave Credits' + this.theAppTitle
        }
    },
    components: {
        PageHeader,
        PageLists,
        PageSearch,
        PageForm,
        EditForm
    },
    methods: {
        ...mapMutations('employees/employee_leave', [
            'setState'
        ]),
        ...mapActions('employees/employee_leave', [
            'fetchEntry',
            'fetchByUID'
        ]),
        ...permissions
    },
    watch: {
        $route: async function(to, from) {
            if(to.query.uid) {
                this.nuxtload();
                await this.fetchByUID(to.query.uid)
                this.nuxtunload();
            } else {
                
                this.findPageComponent('EmployeesLeaveUsersEdit').$refs.modal_editentry.open=false;
            }
        }
    },
    async mounted() {
        await this.fetchEntry();
        

        if(this.$route.query.uid) {
            
            this.nuxtload();
            await this.fetchByUID(this.$route.query.uid);
            this.nuxtunload();
        }
    }
}
</script>