<template>
    <div class="employees-designations-page mb-10">
        <page-header />

        <div class="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 gap-4">
            <div>
                <page-search />
            </div>
            <div>
                <client-only>
                    <t-select-dynamic 
                    :endpoint="`${getOrgUID}/departments`" 
                    datakeylabel="name" 
                    datakeyvalue="uid"
                    searchplaceholder="Type to Search Department"
                    placeholder="Choose Department"
                    class="py-1.5"
                    @input="e => {
                        setState({ entry: { ...state.entry, filter: { ...state.entry.filter, department_uid:e } } });
                        fetchEntry();
                    }"
                    ></t-select-dynamic>
                </client-only>
            </div>
            <div></div>
            <div>
                <page-form />
            </div>
        </div>
        
        <edit-form />
        <page-lists class="mt-5" />

        <PositionNotifications/>

    </div>
</template>
<script>

import PageHeader from "@page_components/employees-positions/PageHeader.vue";
import PageLists from "@page_components/employees-positions/Lists.vue";
import PageSearch from "@page_components/employees-positions/Search.vue";
import PageForm from "@page_components/employees-positions/Form.vue";
import EditForm from "@page_components/employees-positions/Edit.vue";
import PositionNotifications from "@page_components/employees-positions/Notifications.vue";

import TSelectDynamic from "@components/reusables/SelectDynamic.vue";

import { mapState, mapMutations, mapActions } from "vuex";
import permissions from "@permissions/positions.js";

export default {
    name: "EmployeesDepartmentsPage",
    layout: "main",
    middleware: ['auth', 'organizationUID', 'permission'],
    ssr: false,
    meta: {
        permissionKey: `positions_manage`
    },
    head() {
        return {
            title: 'Positions' + this.theAppTitle
        }
    },
    components: {
        PageHeader,
        PageLists,
        PageSearch,
        PageForm,
        EditForm,
        TSelectDynamic,
        PositionNotifications
    },
    computed: {
        ...mapState({
            state: state => state.employees.positions.state
        }),
        ...permissions
    },
    methods: {
        ...mapMutations('employees/positions', [
            'setState'
        ]),
        ...mapActions('employees/positions', [
            'fetchEntry',
            'fetchByUID'
        ])
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
                this.findPageComponent('EmployeesPositionsEdit').$refs.modal_editentry.open=false;
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