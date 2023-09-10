<template>
    <div class="employees-leave-requests-page mb-10">
        <page-header />

        <div class="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 gap-4">
            <div>
                <!-- <page-search /> -->
                <page-filter />
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
import PageHeader from "@page_components/employees-leave-requests/PageHeader.vue";
import PageLists from "@page_components/employees-leave-requests/Lists.vue";
import PageSearch from "@page_components/employees-leave-requests/Search.vue";
import PageForm from "@page_components/employees-leave-requests/Form.vue";
import EditForm from "@page_components/employees-leave-requests/Edit.vue";
import PageFilter from "@page_components/employees-leave-requests/Filter.vue";
import { mapMutations, mapActions } from "vuex";
import permissions from "@permissions/departments.js";

export default {
    name: "EmployeesLeaveApplicationPage",
    layout: "main",
    middleware: ['auth', 'organizationUID', 'permission'],
    ssr: false,
    meta: {
        permissionKey: `departments_manage`
    },
    head() {
        return {
            title: 'Leave Application' + this.theAppTitle
        }
    },
    components: {
        PageHeader,
        PageLists,
        PageSearch,
        PageForm,
        EditForm,
        PageFilter
    },
    methods: {
        ...mapMutations('employees/leave_requests', [
            'setState'
        ]),
        ...mapActions('employees/leave_requests', [
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
                this.findPageComponent('EmployeesLeavesEdit').$refs.modal_editentry.open=false;
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