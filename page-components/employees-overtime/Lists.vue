<template>
    <div class="index-time-sheet-lists mb-5">
        <table class="w-full overflow-x-scroll divide-y divide-gray-200">
            <thead class="bg-gray-50">
                <tr>

                    <th
                        scope="col"
                        class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                        Employee
                    </th>
                    

                    <th
                        scope="col"
                        class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                        Start - End
                    </th>

                    <th
                        scope="col"
                        class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                        # of Hours
                    </th>

                    <th
                        scope="col"
                        class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                        Notes
                    </th>

                    <th 
                        scope="col"
                        class="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase"
                    >Mark as:</th>
                </tr>
            </thead>


            <tbody v-if="!state.entry.loading" class="bg-white divide-y divide-gray-200">
                <tr v-for="(entry, entryindex) in state.entry.data" :key="`department-entry-${genKey(entry)}`" class="transition-all hover:bg-gray-100">
                    
                    <td class="px-6 py-4 ">
                        <div class="flex items-start">
                            <div class="flex-shrink-0 w-10 h-10">
                            <img
                                v-if="entry.user.employee.image && entry.user.employee.image.url"
                                class="w-10 h-10 rounded-full object-cover"
                                :src="entry.user.employee.image.url"
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
                                <div class="text-xs font-medium --text-dark">{{entry.user.employee.employee_id}}</div>
                                <div class="text-sm font-medium --text-dark">{{entry.user.employee.full_name}}</div>
                                <div>
                                    <a :href="`mailto:${entry.user.email}`" class="text-sm --text-primary --text-primary-hover">{{entry.user.email}}</a>
                                </div>

                                <div class="mt-3">
                                    <div class="text-xs font-medium --text-dark">{{entry.user.employee.position.position}}</div>
                                    <div class="text-xs --text-dark">{{entry.user.employee.position.department.name}}</div>
                                </div>
                            </div>
                        </div>
                    </td>

                    <td class="px-6 py-4 ">
                        <span class="--text-dark text-sm">{{$moment(entry.time_in).format('L')}} {{$momenttime($moment(entry.time_in))}}</span>
                        <span class="--text-dark text-sm block">-</span>
                        <span class="--text-dark text-sm">
                            {{$moment(entry.time_out).format('L')}} {{$momenttime($moment(entry.time_out))}}
                        </span>

                        <div class="block mt-2">
                            
                            <span v-if="entry.status==1" class="--text-primary font-bold text-xs block max-w-xs">{{entry.statusText}}</span>
                            <span v-else-if="entry.status==2" class="--text-danger font-bold text-xs block max-w-xs">{{entry.statusText}}</span>
                            <span v-else class="--text-pending font-bold text-xs block max-w-xs">{{entry.statusText}}</span>
                        </div>
                    </td>

                    <td class="px-6 py-4 ">
                        <span class="--text-dark text-sm">{{ entry.hours }}</span>
                    </td>

                    <td class="px-6 py-4 ">
                        <span class="--text-dark text-xs block max-w-xs">{{entry.notes}}</span>
                    </td>

                    <td class="px-6 py-4 text-sm font-medium text-right  flex items-center justify-end">

                        <a 
                        v-if="entry.status!=0"
                        href="#" @click.prevent="() => {
                            $refs.alertconfirm.$alert({
                                title: `Confirm Approval`,
                                html: `Are you sure you want to mark as pending this overtime request?`,
                                yesclass: `--bg-pending --bg-pending-hover`,
                                execute: async function() {
                                    await saveEntry({ ...entry, status: 0 });
                                    notify({ title: 'Success!', html: `Overtime marked as pending.` });
                                }
                            });
                        }" :class="`${btnclass} --bg-pending --bg-pending-hover text-xs px-2 py-2 mr-2`" :title="`Pending`" v-tooltip="`Pending`">
                            Pending
                        </a>


                        <a 
                        v-if="entry.status!=1"
                        href="#" @click.prevent="() => {
                            $refs.alertconfirm.$alert({
                                title: `Confirm Approval`,
                                html: `Are you sure you want to approve this overtime request?`,
                                yesclass: `--bg-primary --bg-primary-hover`,
                                execute: async function() {
                                    await saveEntry({ ...entry, status: 1 });
                                    notify({ title: 'Success!', html: `Overtime marked as approve.` });
                                }
                            });
                        }" :class="`${btnclass} --bg-primary --bg-primary-hover text-xs px-2 py-2 mr-2`" :title="`Approve`" v-tooltip="`Approve`">
                            Approve
                        </a>


                        <a
                        v-if="entry.status!=2"
                        href="#" @click.prevent="() => {
                            $refs.alertconfirm.$alert({
                                title: `Confirm Decline`,
                                html: `Are you sure you want to decline this overtime request?`,
                                yesclass: `--bg-danger --bg-danger-hover`,
                                execute: async function() {
                                    await saveEntry({ ...entry, status: 2 });
                                    notify({ title: 'Success!', html: `Overtime marked as decline.` });
                                }
                            });
                        }" :class="`${btnclass} --bg-danger --bg-danger-hover text-xs px-2 py-2`" :title="`Decline`" v-tooltip="`Decline`">
                            Decline
                        </a>
                        
                    </td>
                </tr>
            </tbody>
            
        </table>


        <div v-if="state.entry.loading" class="flex justify-center align-center mt-10 mb-10">
            <div class="text-center">
                <loader class="primary m-auto" style="display:block;" />
                <span class="text-xs --text-dark font-semibold">Loading</span>
            </div>
        </div>

        <p class="text-center ml-1 text-xs font-medium --text-dark mt-5" v-if="!state.entry.loading && !state.entry.data.length">
            There is no overtime here.
        </p>

        <client-only>
            <page 
            @paginate="paginate" 
            :page="state.entry.filter.page" 
            :total="state.entry.pagination.total" 
            :total-pages="state.entry.pagination.total_pages"  />
        </client-only>

        <alert-confirm ref="alertconfirm"></alert-confirm>

    </div>
</template>
<script>
import Loader from "@components/reusables/Loader.vue";
import Page from "@components/reusables/Pagination.vue";
import AlertConfirm from "@components/reusables/AlertConfirm.vue";

import { mapState, mapMutations, mapActions } from "vuex"

export default {
    name: 'EmployeesOvertimeLists',
    components: {
        Loader,
        Page,
        AlertConfirm
    },
    computed: {
        ...mapState({
            state: state => state.employees.overtime.state
        }),
    },
    methods: {
        ...mapMutations('employees/overtime', [
            'setState'
        ]),
        ...mapActions('employees/overtime', [
            'fetchEntry',
            'saveEntry'
        ]),
        paginate(data) {
            this.setState({ handle: 'state.entry.filter', key: 'page', value: data.page });
            this.setState({ handle: 'state.entry.filter', key: 'limit', value: data.limit });
            this.fetchEntry();
        }
    }
}
</script>