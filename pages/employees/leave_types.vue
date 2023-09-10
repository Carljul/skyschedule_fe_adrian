<template>
    <div class="employees-leave_types-page mb-10">
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
import PageHeader from "@page_components/employees-leave_types/PageHeader.vue";
import PageLists from "@page_components/employees-leave_types/Lists.vue";
import PageSearch from "@page_components/employees-leave_types/Search.vue";
import PageForm from "@page_components/employees-leave_types/Form.vue";
import EditForm from "@page_components/employees-leave_types/Edit.vue";

import { mapMutations, mapActions } from "vuex";
import permissions from "@permissions/leave_types.js";

export default {
    name: "EmployeesLeaveTypesPage",
    layout: "main",
    middleware: ['auth', 'organizationUID', 'permission'],
    ssr: false,
    meta: {
        permissionKey: `leave_types_manage`
    },
    head() {
        return {
            title: 'LeaveTypes' + this.theAppTitle
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
        ...mapMutations('employees/leave_types', [
            'setState'
        ]),
        ...mapActions('employees/leave_types', [
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
                this.findPageComponent('EmployeesLeaveTypesEdit').$refs.modal_editentry.open=false;
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