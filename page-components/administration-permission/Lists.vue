<template>
    <div>
        <div class="flex flex-col mt-6">
            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div class="overflow-hidden border-b border-gray-200 shadow" :class="{ 'shadow opacity-60 pointer-events-none': state.entry.loading }">

                        <table class="w-full overflow-x-scroll divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                    >
                                        Permission
                                    </th>
                                    <th
                                        scope="col"
                                        class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                    >
                                        Key
                                    </th>
                                    <th
                                        scope="col"
                                        class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                    >
                                        Description
                                    </th>
                                    <th scope="col" class="relative px-6 py-3">
                                        <span class="sr-only">Options</span>
                                    </th>
                                </tr>
                            </thead>

                            <tbody v-if="!state.entry.loading" class="bg-white divide-y divide-gray-200">
                                <tr v-for="(entry, entryindex) in state.entry.data" :key="`permission-entry-${genKey(entry)}`" class="transition-all hover:bg-gray-100 hover:shadow-lg">
                                    <td class="px-6 py-4">
                                        <span class="--text-dark text-sm font-semibold">{{ entry.permission }}</span>
                                    </td>
                                    <td class="px-6 py-4">
                                        <span class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                                            {{ entry.permission_key }}
                                        </span>
                                    </td>

                                    <td class="px-6 py-4 max-w-sm">
                                        <span class="--text-dark text-xs font-semibold">{{ entry.description }}</span>
                                    </td>

                                    <td class="px-6 py-4 text-sm font-medium text-right flex items-center justify-end">

                                        <template v-if="!entry.deleted_at">

                                            <nuxt-link 
                                            :to="`/administration/permissions?uid=${entry.uid}`"
                                            class="ml-2 mt-2 --text-primary --text-primary-hover" :title="appdefaults.edit" v-tooltip="appdefaults.edit">
                                                <icon-edit />
                                            </nuxt-link>

                                            <a href="#" @click.prevent="() => {
                                                $refs.alertconfirm.$alert({
                                                    title: appdefaults.trashConfirm.title,
                                                    html: appdefaults.trashConfirm.html,
                                                    execute: async function() {
                                                        await removeEntry(entry);
                                                        notify({ title: 'Success!', html: `Permission ${appdefaults.trashConfirm.success}` });
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
                                                        notify({ title: 'Success!', html: `Permission ${appdefaults.restoreConfirm.success}` });
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
                                                        notify({ title: 'Success!', html: `Permission ${appdefaults.removeConfirm.success}` });
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
            There is no permission here.
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
    name: 'AdministrationPermissionLists',
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
            state: state => state.administration.permissions.state
        }),
    },
    methods: {
        ...mapMutations('administration/permissions', [
            'setState'
        ]),
        ...mapActions('administration/permissions', [
            'fetchEntry',
            'removeEntry',
            'restoreEntry'
        ]),
        paginate(data) {
            this.setState({ handle: 'state.entry.filter', key: 'page', value: data.page });
            this.setState({ handle: 'state.entry.filter', key: 'limit', value: data.limit });
            this.fetchEntry();
        }
    },
    
}
</script>