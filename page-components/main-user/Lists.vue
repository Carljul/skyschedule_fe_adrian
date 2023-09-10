<template>
    <div class="index-time-sheet-lists mb-5">
        <table class="w-full overflow-x-scroll divide-y divide-gray-200 border-4">
            <thead class="bg-violet-400">
                <tr>
                    <th
                        scope="col"
                        class="px-6 py-3 text-xs font-medium tracking-wider text-left text-slate-50 uppercase"
                    >
                        Username
                    </th>

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
                        Email
                    </th>
                    
                    <th 
                        scope="col"
                        class="px-6 py-3 text-xs font-medium tracking-wider text-left text-slate-50 uppercase"
                    ></th>
                </tr>
            </thead>


            <tbody v-if="!state.entry.loading" class="bg-white divide-y divide-gray-200">
                <tr v-for="(entry, entryindex) in state.entry.data" :key="`department-entry-${genKey(entry)}`" class="transition-all hover:bg-gray-100">
                    
                    <td class="px-6 py-10 ">
                        <span class="--text-dark text-sm">{{ entry.username }}</span>
                    </td>
                    <td class="px-6 py-4 ">
                        <span class="--text-dark text-sm">{{ entry.name }}</span>
                    </td>

                    <td class="px-6 py-4 ">
                        <span class="--text-dark text-xs block max-w-xs">{{ entry.email }}</span>
                    </td>                    

                    <td class="px-6 py-4 text-sm font-medium text-right  flex items-center justify-end">
                        <nuxt-link v-if="entry.editable" :to="`/user?uid=${entry.uid}`" 
                        class="ml-2 mt-2 --text-primary --text-primary-hover" :title="appdefaults.edit" v-tooltip="appdefaults.edit">
                            <icon-edit />
                        </nuxt-link>

                        <a 
                        v-if="entry.editable"
                        href="#" @click.prevent="() => {
                            $refs.alertconfirm.$alert({
                                title: appdefaults.trashConfirm.title,
                                html: appdefaults.trashConfirm.html,
                                execute: async function() {
                                    await removeEntry(entry);
                                    notify({ title: 'Success!', html: `Order ${appdefaults.trashConfirm.success}` });
                                }
                            });
                        }" class="ml-2 mt-2 --text-primary --text-primary-hover mr-10" :title="appdefaults.trash" v-tooltip="appdefaults.trash">
                            <icon-trash />
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
            There is no user here.
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

import { mapState, mapMutations, mapActions } from "vuex"

export default {
    name: 'MainUserLists',
    components: {
        Loader,
        Page,
        IconEdit,
        IconTrash,
        AlertConfirm
    },
    computed: {
        ...mapState({
            state: state => state.main.user.state
        }),
    },
    methods: {
        ...mapMutations('main/user', [
            'setState'
        ]),
        ...mapActions('main/user', [
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