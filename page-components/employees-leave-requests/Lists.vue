<template>
    <div>
        <div class="flex flex-col mt-6">
            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div class="overflow-hidden border-b border-gray-200 shadow" :class="{ 'shadow opacity-50 pointer-events-none': state.entry.loading }">

                        <table class="w-full overflow-x-scroll divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                >
                                    Leave Type
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
                                    # of Days
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                >
                                    Reason
                                </th>
                                <th scope="col" class="relative px-6 py-3">
                                    <span class="sr-only">Options</span>
                                </th>
                                </tr>
                            </thead>


                            <tbody v-if="!state.entry.loading" class="bg-white divide-y divide-gray-200">
                                <tr v-for="(entry, entryindex) in state.entry.data" :key="`department-entry-${genKey(entry)}`" class="transition-all hover:bg-gray-100">
                                    <td class="px-6 py-4">
                                        <span class="--text-dark text-sm font-semibold">{{ entry.leave_type.title }}</span>
                                    </td>
                                    <td class="px-6 py-4">
                                        <span class="--text-dark text-sm">{{$moment(entry.start_date).format('L')}} {{$momenttime($moment(entry.start_date))}}</span>
                                        <span class="--text-dark text-sm block">-</span>
                                        <span class="--text-dark text-sm">
                                            {{$moment(entry.end_date).format('L')}} {{$momenttime($moment(entry.end_date))}}
                                        </span>

                                        <div class="block mt-2">
                                            
                                            <span v-if="entry.status==1" class="--text-primary font-bold text-xs block max-w-xs">{{entry.statusText}}</span>
                                            <span v-else-if="entry.status==2" class="--text-danger font-bold text-xs block max-w-xs">{{entry.statusText}}</span>
                                            <span v-else class="--text-pending font-bold text-xs block max-w-xs">{{entry.statusText}}</span>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4">
                                        <span class="--text-dark text-sm font-semibold">{{ entry.days }}</span>
                                    </td>
                                    <td class="px-6 py-4">
                                        
                                        <span class="--text-dark text-sm font-semibold" v-html="entry.reason" ></span>
                                    </td>
                                    <td class="px-6 py-4 text-sm font-medium text-right flex items-center justify-end">

                                        <a 
                                        v-if="entry.status!=0"
                                        href="#" @click.prevent="() => {
                                            $refs.alertconfirm.$alert({
                                                title: `Confirm Approval`,
                                                html: `Are you sure you want to mark as pending this overtime request?`,
                                                yesclass: `--bg-pending --bg-pending-hover`,
                                                execute: async function() {
                                                    await saveEntry({ ...entry, status: 0 });
                                                    notify({ title: 'Success!', html: `Request marked as pending.` });
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
                                                    notify({ title: 'Success!', html: `Request marked as approve.` });
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
                                                    notify({ title: 'Success!', html: `Request marked as decline.` });
                                                }
                                            });
                                        }" :class="`${btnclass} --bg-danger --bg-danger-hover text-xs px-2 py-2`" :title="`Decline`" v-tooltip="`Decline`">
                                            Decline
                                        </a>

                                    </td>
                                </tr>
                            </tbody>
                            
                        </table>

                    </div>
                </div>

            </div>
        </div>

        <div v-if="state.entry.loading" class="flex justify-center align-center mt-10 mb-10">
            <div class="text-center">
                <loader class="primary m-auto" style="display:block;" />
                <span class="text-xs --text-dark font-semibold">Loading</span>
            </div>
        </div>

        <p class="text-center ml-1 text-xs font-medium --text-dark mt-5" v-if="!state.entry.loading && !state.entry.data.length">
            There is no leave request here.
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
import IconEdit from "@components/reusables/IconEdit.vue";
import IconTrash from "@components/reusables/IconTrash.vue";
import IconRestore from "@components/reusables/IconRestore.vue";
import Page from "@components/reusables/Pagination.vue";
import AlertConfirm from "@components/reusables/AlertConfirm.vue";

import { mapState, mapMutations, mapActions } from "vuex"
export default {
    name: 'EmployeesLeaveRequestLists',
    components: {
        Loader,
        IconEdit,
        IconTrash,
        IconRestore,
        Page,
        AlertConfirm
    },
    computed: {
        ...mapState({
            state: state => state.employees.leave_requests.state
        }),
    },
    methods: {
        ...mapMutations('employees/leave_requests', [
            'setState'
        ]),
        ...mapActions('employees/leave_requests', [
            'fetchEntry',
            'removeEntry',
            'restoreEntry',
            'saveEntry'
        ]),
        paginate(data) {
            this.setState({ entry: { ...this.state.entry, filter: { ...this.state.entry.filter, page: data.page } } });
            this.setState({ entry: { ...this.state.entry, filter: { ...this.state.entry.filter, limit: data.limit } } });
            this.fetchEntry();
        }
    }
}
</script>