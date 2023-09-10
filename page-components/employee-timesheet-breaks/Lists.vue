<template>
    <div class="index-time-sheet-lists mb-5">
        <table class="w-full overflow-x-scroll divide-y divide-gray-200">
            <thead class="bg-gray-50">
                <tr>

                    <th
                        scope="col"
                        class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                        START
                    </th>

                    <th
                        scope="col"
                        class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                        END
                    </th>

                    <th
                        scope="col"
                        class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                        TYPE
                    </th>

                    <th
                        scope="col"
                        class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                        # of Mins.
                    </th>

                    <th
                        scope="col"
                        class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                        Notes
                    </th>

                    <th 
                        scope="col"
                        class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    ></th>
                </tr>
            </thead>


            <tbody v-if="!state.entry.loading" class="bg-white divide-y divide-gray-200">
                <tr v-for="(entry, entryindex) in state.entry.data" :key="`department-entry-${genKey(entry)}`" class="transition-all hover:bg-gray-100">
                    
                    <td class="px-6 py-4 ">
                        <span class="--text-dark text-sm">{{$moment(entry.time_in).format('L')}} {{$momenttime($moment(entry.time_in))}}</span>
                    </td>
                    <td class="px-6 py-4 ">
                        <span class="--text-dark text-sm">
                            <template v-if="entry.time_out">
                                {{$moment_timezone(entry.time_out).format('L')}} {{$momenttime($moment(entry.time_out))}}
                            </template>
                            <template v-else>
                                <span class="block">IN-SHIFT</span>
                                <span class="block text-xs">{{$moment(entry.time_in).startOf('minute').from(realtimeMoment)}}</span>
                            </template>
                        </span>
                    </td>

                    <td class="px-6 py-4 ">
                        <span class="--text-dark text-xs block max-w-xs">{{ entry.type }}</span>
                    </td>

                    <td class="px-6 py-4 ">
                        <span v-if="entry.time_out" class="--text-dark text-sm">{{ entry.minutes }}</span>
                        <span v-else class="--text-dark text-sm">{{realtimeMoment.diff($moment(entry.time_in), 'minutes')}}</span>
                    </td>

                    <td class="px-6 py-4 ">
                        <span class="--text-dark text-xs block max-w-xs">{{entry.notes}}</span>
                    </td>

                    <td class="px-6 py-4 text-sm font-medium text-right  flex items-center justify-end">

                        <nuxt-link :to="`/employees/timesheets/${entry.attendance_uid}?uid=${entry.uid}`" 
                        class="ml-2 mt-2 --text-primary --text-primary-hover" :title="`Break adjustment`" v-tooltip="`Break adjustment`">
                            <IconEdit/>
                        </nuxt-link>

                        <a href="#" @click.prevent="() => {
                            $refs.alertconfirm.$alert({
                                title: appdefaults.trashConfirm.title,
                                html: appdefaults.trashConfirm.html,
                                execute: async function() {
                                    await removeEntry(entry);
                                    notify({ title: 'Success!', html: `Break ${appdefaults.trashConfirm.success}` });
                                }
                            });
                        }" class="ml-2 mt-2 --text-primary --text-primary-hover mr-10" :title="appdefaults.trash" v-tooltip="appdefaults.trash">
                            <IconTrash />
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
            There is no record here.
        </p>

        <alert-confirm ref="alertconfirm"></alert-confirm>

    </div>
</template>
<script>
import Loader from "@components/reusables/Loader.vue";
import IconEdit from "@components/reusables/IconEdit.vue";
import IconTrash from "@components/reusables/IconTrash.vue";
import AlertConfirm from "@components/reusables/AlertConfirm.vue";

import { mapState, mapMutations, mapActions } from "vuex"
import momentrealtimemixins from '~/mixins/momentrealtime';

export default {
    name: 'EmployeesTimeSheetBreaksLists',
    mixins: [momentrealtimemixins],
    components: {
        Loader,
        IconEdit,
        IconTrash,
        AlertConfirm
    },
    computed: {
        ...mapState({
            state: state => state.employees.timesheet_breaks.state
        }),
    },
    methods: {
        ...mapMutations('employees/timesheet_breaks', [
            'setState'
        ]),
        ...mapActions('employees/timesheet_breaks', [
            'fetchEntry',
            'removeEntry'
        ])
    }
}
</script>