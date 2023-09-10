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
import PageHeader from "@page_components/employees-departments/PageHeader.vue";
import PageLists from "@page_components/employees-departments/Lists.vue";
import PageSearch from "@page_components/employees-departments/Search.vue";
import PageForm from "@page_components/employees-departments/Form.vue";
import EditForm from "@page_components/employees-departments/Edit.vue";

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
            title: 'Departments' + this.theAppTitle
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
        ...mapMutations('employees/departments', [
            'setState'
        ]),
        ...mapActions('employees/departments', [
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

                
                this.findPageComponent('EmployeesDepartmentsEdit').$refs.modal_editentry.open=false;

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