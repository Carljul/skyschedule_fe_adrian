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
                                    Project Name
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                >
                                    Task Priority
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                >
                                    Task Status
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                >
                                    Task Progress
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                >
                                    Task Description
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                >
                                    Start Time - End Time
                                </th>
                                </tr>
                            </thead>


                            <tbody v-if="!state.entry.loading" class="bg-white divide-y divide-gray-200">
                                <tr v-for="(entry, entryindex) in state.entry.data" :key="`department-entry-${genKey(entry)}`" class="transition-all hover:bg-gray-100">
                                    <td class="px-6 py-4">
                                        <span class="--text-dark text-sm font-semibold">{{ entry.project_name }}</span>
                                    </td>
                                    <td class="px-6 py-4">
                                        <span class="--text-dark text-sm font-semibold">{{ entry.task_priority }}</span>
                                    </td>
                                    <td class="px-6 py-4">
                                        <span class="--text-dark text-sm font-semibold">{{ entry.task_status }}</span>
                                    </td>
                                    <td class="px-6 py-4">
                                        <span class="--text-dark text-sm font-semibold">{{ entry.task_progress }}</span>
                                    </td>
                                    <td class="px-6 py-4">                                        
                                        <span class="--text-dark text-sm font-semibold" v-html="entry.task_description" ></span>
                                    </td>
                                    <td class="px-6 py-4">
                                        <span class="--text-dark text-sm">{{$moment(entry.start_time).format('L')}} {{$momenttime($moment(entry.start_time))}}</span>
                                        <span class="--text-dark text-sm block">-</span>
                                        <span class="--text-dark text-sm">
                                            {{$moment(entry.end_time).format('L')}} {{$momenttime($moment(entry.end_time))}}
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

                                        <template v-if="!entry.deleted_at">
                                            <nuxt-link
                                            :to="`/eods?uid=${entry.uid}`"
                                            class="ml-2 mt-2 --text-primary --text-primary-hover" :title="appdefaults.edit" v-tooltip="appdefaults.edit"
                                            >
                                                <icon-edit />
                                            </nuxt-link>

                                            <a  v-if="entry.status != 1" href="#" @click.prevent="() => {
                                                $refs.alertconfirm.$alert({
                                                    title: appdefaults.trashConfirm.title,
                                                    html: appdefaults.trashConfirm.html,
                                                    execute: async function() {
                                                        await removeEntry(entry);
                                                        notify({ title: 'Success!', html: `Eod ${appdefaults.trashConfirm.success}` });
                                                    }
                                                });
                                            }" class="ml-2 mt-2 --text-primary --text-primary-hover mr-10" :title="appdefaults.trash" v-tooltip="appdefaults.trash">
                                                <icon-trash />
                                            </a>
                                        </template>

                                        <template v-else>
                                            <a href="#" 
                                            @click.prevent="() => {
                                                $refs.alertconfirm.$alert({
                                                    title: appdefaults.restoreConfirm.title,
                                                    html: appdefaults.restoreConfirm.html,
                                                    yesclass: '--bg-success --bg-success-hover',
                                                    execute: async function() {
                                                        await restoreEntry(entry);
                                                        notify({ title: 'Success!', html: `Request ${appdefaults.restoreConfirm.success}` });
                                                    }
                                                });
                                            }"
                                            class="ml-2 mt-2 --text-primary --text-primary-hover" :title="appdefaults.restore" v-tooltip="appdefaults.restore">
                                                <icon-restore />
                                            </a>

                                            <a href="#" @click.prevent="() => {
                                                $refs.alertconfirm.$alert({
                                                    title: appdefaults.removeConfirm.title,
                                                    html: appdefaults.removeConfirm.html,
                                                    execute: async function() {
                                                        await removeEntry(entry);
                                                        notify({ title: 'Success!', html: `Request ${appdefaults.removeConfirm.success}` });
                                                    }
                                                });
                                            }" class="ml-2 mt-2 --text-primary --text-danger mr-10" :title="appdefaults.remove" v-tooltip="appdefaults.remove">
                                                <icon-trash />
                                            </a>
                                        </template>

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
            There is no eod here.
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
    name: 'EmployeesEodLists',
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
            state: state => state.main.eod.state
        }),
    },
    methods: {
        ...mapMutations('main/eod', [
            'setState'
        ]),
        ...mapActions('main/eod', [
            'fetchEntry',
            'removeEntry',
            'restoreEntry'
        ]),
        paginate(data) {
            this.setState({ entry: { ...this.state.entry, filter: { ...this.state.entry.filter, page: data.page } } });
            this.setState({ entry: { ...this.state.entry, filter: { ...this.state.entry.filter, limit: data.limit } } });
            this.fetchEntry();
        }
    }
}
</script>