<template>
    <div class="timesheet-page mb-10">
        
        <div class="mb-10 mt-5">
            <h3 class="text-lg mb-3 --text-heading font-semibold">Timesheet Breaks</h3>
            <breadcrumbs
            :lists="[
                { text: 'Employees', link: '/employees' },
                { text: 'Timesheets', link: '/employees/timesheets' },
                { text: 'Breaks' }
            ]"
            />
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 gap-4">
            <div>
                <div class="flex items-center mb-10">
                    <div class="flex-shrink-0 w-10 h-10">
                    <img
                        v-if="state.attendance.user.employee.image && state.attendance.user.employee.image.url"
                        class="w-10 h-10 rounded-full object-cover"
                        :src="state.attendance.user.employee.image.url"
                        alt=""
                    />
                    <img
                        v-else
                        class="w-10 h-10 rounded-full object-cover"
                        src="~/static/user-profile.png"
                        alt=""
                    />

                    </div>
                    <div class="ml-4">
                        <div class="text-xs font-medium --text-dark">{{state.attendance.user.employee.employee_id}}</div>
                        <div class="text-sm font-medium --text-dark">{{state.attendance.user.employee.full_name}}</div>
                        <div>
                            <a :href="`mailto:${state.attendance.user.email}`" class="text-sm --text-primary --text-primary-hover">{{state.attendance.user.email}}</a>
                        </div>

                        <div class="mt-3">
                            <div class="text-xs font-medium --text-dark">{{state.attendance.user.employee.position.position}}</div>
                            <div class="text-xs --text-dark">{{state.attendance.user.employee.position.department.name}}</div>
                        </div>
                    </div>
                </div>
            </div>


            <div>
                <div class="border shadow-sm p-5 rounded">
                    <p class="text-sm font-medium --text-dark uppercase text-center">Shift Date: {{$moment(state.attendance.time_in).format('L')}}</p>
                </div>
            </div>
        </div>

        <time-sheet-lists />

        <page-form />

    </div>
</template>
<script>
import Breadcrumbs from "@components/reusables/Breadcrumbs.vue";
import TimeSheetLists from "@page_components/employee-timesheet-breaks/Lists.vue";
import PageForm from "@page_components/employee-timesheet-breaks/Form.vue";
import permissions from "@permissions/employee.js";
import defaults from "~/defaults.js";

import { mapActions, mapState, mapMutations } from "vuex";
export default {
    name: "EmployeesTimesheetBreaksPage",
    layout: "main",
    middleware: ['auth', 'organizationUID', 'permission'],
    ssr: false,
    meta: {
        permissionKey: `timesheet_manage`
    },
    components: {
        TimeSheetLists,
        Breadcrumbs,
        PageForm
    },
    head() {
        return {
            title: 'Timesheet Breaks' + this.theAppTitle
        }
    },
    async asyncData({ params, error, $axios, store }) {
        try {
            const res = await $axios.get(`/${store.state.global.state.organizationUID}/attendances/${params.uid}`);
            store.commit('employees/timesheet_breaks/setState', {
                handle: 'state',
                key: 'attendance',
                value: res.data.response
            });
        } catch(err) {
            error({
                statusCode: 404, 
                message: defaults.notfound
            });
        }
    },
    computed: {
        ...mapState({
            state: state => state.employees.timesheet_breaks.state
        }),
        ...permissions
    },
    methods: {
        ...mapMutations('employees/timesheet_breaks', [
            'setState'
        ]),
        ...mapActions('employees/timesheet_breaks', [
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
                this.findPageComponent('EmployeeTimesheetBreaksForm').$refs.adjustmentmodal.open=false;
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