<template>
    <div class="index-time-sheet-lists mb-5">
        <table class="w-full overflow-x-scroll divide-y divide-gray-200 bability-4">
            <thead class="bg-violet-400">
                <tr>
                    <th
                        scope="col"
                        class="px-6 py-3 text-xs font-medium tracking-wider text-left text-slate-50 uppercase"
                    >
                        Name
                    </th>
                    <th
                        scope="col"
                        class="px-6 py-3 text-xs font-medium tracking-wider text-left text-slate-50 uppercase"
                    >
                        Title
                    </th>
                    <th scope="col" class="relative px-6 py-3">
                        <span class="sr-only">Options</span>
                    </th>
                </tr>
            </thead>


            <tbody v-if="!state.entry.loading" class="bg-white divide-y divide-gray-200">
                <tr v-for="(entry, entryindex) in state.entry.data" :key="`department-entry-${genKey(entry)}`" class="transition-all hover:bg-gray-100">
                    
                    <td class="px-6 py-10 ">
                        <span class="--text-dark text-sm">{{ entry.name }}</span>
                    </td>    
                    <td class="px-6 py-10 ">
                        <span class="--text-dark text-sm">{{ entry.title }}</span>
                    </td>            
                    <td class="px-6 py-4 text-sm font-medium text-right  flex items-center justify-end">

                    <template v-if="!entry.deleted_at">


                        <nuxt-link :to="`/employees/positions?uid=${entry.uid}`" 
                        class="ml-2 mt-2 --text-primary --text-primary-hover" :title="appdefaults.edit" v-tooltip="appdefaults.edit">
                            <icon-edit />
                        </nuxt-link>

                        <a href="#" @click.prevent="() => {
                            $refs.alertconfirm.$alert({
                                title: appdefaults.trashConfirm.title,
                                html: appdefaults.trashConfirm.html,
                                execute: async function() {
                                    await removeEntry(entry);
                                    notify({ title: 'Success!', html: `Position ${appdefaults.trashConfirm.success}` });
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
                                    notify({ title: 'Success!', html: `Position ${appdefaults.restoreConfirm.success}` });
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
                                    notify({ title: 'Success!', html: `Position ${appdefaults.removeConfirm.success}` });
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


        <div v-if="state.entry.loading" class="flex justify-center align-center mt-10 mb-10">
            <div class="text-center">
                <loader class="primary m-auto" style="display:block;" />
                <span class="text-xs --text-dark font-semibold">Loading</span>
            </div>
        </div>

        <p class="text-center ml-1 text-xs font-medium --text-dark mt-5" v-if="!state.entry.loading && !state.entry.data.length">
            There is no ability here.
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
import IconEdit from "@components/reusables/IconEdit.vue";
import IconTrash from "@components/reusables/IconTrash.vue";
import AlertConfirm from "@components/reusables/AlertConfirm.vue";
import ColorPicker from "@components/reusables/ColorPicker.vue";
import { mapState, mapMutations, mapActions } from "vuex"

export default {
    name: 'MainAbilityLists',
    components: {
        ColorPicker,
        Loader,
        Page,
        IconEdit,
        IconTrash,
        AlertConfirm
    },
    computed: {
        ...mapState({
            state: state => state.main.ability.state
        }),
    },
    methods: {
        ...mapMutations('main/ability', [
            'setState'
        ]),
        ...mapActions('main/ability', [
            'fetchEntry',
            'removeEntry'
        ]),
        paginate(data) {
            this.setState({ entry: { ...this.state.entry, filter: { ...this.state.entry.filter, page: data.page } } });
            this.setState({ entry: { ...this.state.entry, filter: { ...this.state.entry.filter, limit: data.limit } } });
            this.fetchEntry();
        }
    }
}
</script>