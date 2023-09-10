<template>
    <div class="metrics-list-view">
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
                                        Event
                                    </th>
                                    <th
                                        scope="col"
                                        class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                    >
                                        Date
                                    </th>

                                    <th scope="col" class="relative px-6 py-3">
                                        <span class="sr-only">Options</span>
                                    </th>
                                </tr>
                            </thead>


                            <tbody v-if="!state.entry.loading" class="bg-white divide-y divide-gray-200">
                                <tr v-for="(entry, entryindex) in getEventLists" :key="`department-entry-${genKey(entry)}`" class="transition-all hover:bg-gray-100">
                                    <td class="px-6 py-4 text-sm">
                                        <div class="--text-dark w-full max-w-2xl" v-html="entry.title"></div>
                                    </td>

                                    <td class="px-6 py-4 ">
                                        <span class="--text-dark text-sm font-semibold">{{$moment(entry.start).format('L')}}</span>
                                        <span class="--text-dark text-sm font-semibold" v-if="entry.end">- {{$moment(entry.end).format('L')}}</span>
                                    </td>

                                    <td class="px-6 py-4 text-sm font-medium text-right flex items-center justify-end">
                                        <nuxt-link :to="`/metrics?uid=${entry.uid}`" 
                                        class="ml-2 mt-2 --text-primary --text-primary-hover" :title="appdefaults.edit" v-tooltip="appdefaults.edit">
                                            <icon-edit />
                                        </nuxt-link>
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

        <p class="text-center ml-1 text-xs font-medium --text-dark mt-5" v-if="!state.entry.loading && !getEventLists.length">
            There is no event here.
        </p>

    </div>
</template>
<script>
import Loader from "@components/reusables/Loader.vue";
import IconEdit from "@components/reusables/IconEdit.vue";
import { mapState, mapGetters, mapActions } from "vuex";
import permissions from "@permissions/events.js";

export default {
    name: 'MainEventsListsView',
    components: {
        Loader,
        IconEdit
    },
    computed: {
        ...mapState({
            state: state => state.main.events.state
        }),
        ...mapGetters('main/events', [
            'getEventLists'
        ]),
        ...permissions
    },
    methods: {
        ...mapActions('main/events', [
            'fetchEntry'
        ])
    }
}
</script>