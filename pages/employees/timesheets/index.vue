<template>
    <div class="timesheet-page mb-10">
        
        <div class="mb-10 mt-5">
            <h3 class="text-lg mb-3 --text-heading font-semibold">Timesheets</h3>
            <breadcrumbs
            :lists="[
                { text: 'Employees', link: '/employees' },
                { text: 'Timesheets' }
            ]"
            />
        </div>

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
                    :value="state.entry.filter.department_uid"
                    @input="e => {
                        setState({ handle: 'state.entry.filter', key: 'position_uid', value: null });
                        setState({ handle: 'state.entry.filter', key: 'department_uid', value: e });
                        fetchEntry();
                    }"
                    @clear="e => {
                        setState({ handle: 'state.entry.filter', key: 'position_uid', value: null });
                        fetchEntry();
                    }"
                    ></t-select-dynamic>
                </client-only>
            </div>
            <div>
                <client-only>
                    <t-select-dynamic 
                    ref="dddynamicposition"
                    :key="`dynamicposition-${state.entry.filter.department_uid}`"
                    v-if="state.entry.filter.department_uid"
                    :endpoint="`${getOrgUID}/positions?department_uid=${state.entry.filter.department_uid}`" 
                    datakeylabel="position" 
                    datakeyvalue="uid"
                    searchplaceholder="Type to Search Position"
                    placeholder="Choose Position"
                    class="py-1.5"
                    :value="state.entry.filter.position_uid"
                    @input="e => {
                        setState({ handle: 'state.entry.filter', key: 'position_uid', value: e });
                        fetchEntry();
                    }"
                    ></t-select-dynamic>
                </client-only>
            </div>

            <div></div>

        </div>


        <time-sheet-filter />

        <time-sheet-lists />

        <page-form />

    </div>
</template>
<script>
import Breadcrumbs from "@components/reusables/Breadcrumbs.vue";
import TimeSheetFilter from "@page_components/employees-timesheet/Filter.vue";
import TimeSheetLists from "@page_components/employees-timesheet/Lists.vue";
import TSelectDynamic from "@components/reusables/SelectDynamic.vue";
import PageSearch from "@page_components/employees-timesheet/Search.vue";
import PageForm from "@page_components/employees-timesheet/Form.vue";
import permissions from "@permissions/employee.js";

import { mapActions, mapState, mapMutations } from "vuex";
export default {
    name: "EmployeesTimesheetPage",
    layout: "main",
    middleware: ['auth', 'organizationUID', 'permission'],
    ssr: false,
    meta: {
        permissionKey: `timesheet_manage`
    },
    components: {
        TimeSheetFilter,
        TimeSheetLists,
        Breadcrumbs,
        PageSearch,
        TSelectDynamic,
        PageForm
    },
    head() {
        return {
            title: 'Timesheet' + this.theAppTitle
        }
    },
    computed: {
        ...mapState({
            state: state => state.employees.timesheet.state
        }),
        ...permissions
    },
    methods: {
        ...mapMutations('employees/timesheet', [
            'setState'
        ]),
        ...mapActions('employees/timesheet', [
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
                this.findPageComponent('EmoloyeeTimeAdjustmentForm').$refs.adjustmentmodal.open=false;
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