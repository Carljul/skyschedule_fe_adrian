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
                                        Company/Organization
                                    </th>
                                    <th
                                        scope="col"
                                        class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                    >
                                        Timezone
                                    </th>
                                    <th scope="col" class="relative px-6 py-3">
                                        <span class="sr-only">Options</span>
                                    </th>
                                </tr>
                            </thead>


                            <tbody v-if="!state.entry.loading" class="bg-white divide-y divide-gray-200">
                                <tr v-for="(entry, entryindex) in getEntryData" :key="`organization-entry-${genKey(entry)}`" class="transition-all hover:bg-gray-100 hover:shadow-lg">
                                    <td class="px-6 py-4">
                                        <img v-if="entry.logo" :src="entry.logo.url" class="w-28 mb-2" alt="">
                                        <span class="--text-dark text-md font-semibold">{{ entry.organization }}</span>
                                    </td>
                                    <td class="px-6 py-4">
                                        <span class="--text-dark text-sm font-semibold">{{ entry.user.name }}</span>
                                        <a :href="`mailto:${entry.user.email}`" :class="`block ${linkclass}`">{{ entry.user.email }}</a>
                                    </td>
                                    <td class="px-6 py-4">
                                        <span class="--text-dark text-sm">{{ entry.timezone }}</span>
                                    </td>
                                    <td class="px-6 py-4 text-sm font-medium text-right flex items-center justify-end">

                                        <template v-if="!entry.deleted_at">

                                            <async-button 
                                            v-if="!entry.isManagedIn" 
                                            @click="manageInOut({ ref: entry.uid, value: entry.uid })" 
                                            :ref="`manageinout-ref-${entry.uid}`" 
                                            type="button" 
                                            class="btn py-2 px-5 mr-3 rounded --text-light --bg-success text-xs uppercase font-semibold text-center cursor-pointer">
                                                Manage in
                                            </async-button>

                                            <async-button 
                                            v-else 
                                            @click="manageInOut({ ref: entry.uid, value: null })" 
                                            type="button" 
                                            :ref="`manageinout-ref-${entry.uid}`"
                                            class="btn py-2 px-5 mr-3 rounded --text-light --bg-danger text-xs uppercase font-semibold text-center cursor-pointer">
                                                Manage out
                                            </async-button>

                                            <nuxt-link 
                                            :to="`/administration/organizations?uid=${entry.uid}`"
                                            class="ml-2 mt-2 --text-primary --text-primary-hover" :title="appdefaults.edit" v-tooltip="appdefaults.edit">
                                                <icon-edit />
                                            </nuxt-link>

                                            <a href="#" @click.prevent="() => {
                                                $refs.alertconfirm.$alert({
                                                    title: appdefaults.trashConfirm.title,
                                                    html: appdefaults.trashConfirm.html,
                                                    execute: async function() {
                                                        await removeEntry(entry);
                                                        notify({ title: 'Success!', html: `Organization ${appdefaults.trashConfirm.success}` });
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
                                                        notify({ title: 'Success!', html: `Organization ${appdefaults.restoreConfirm.success}` });
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
                                                        notify({ title: 'Success!', html: `Organization ${appdefaults.removeConfirm.success}` });
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
            There is no organization here.
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
import AsyncButton from "@components/reusables/AsyncButton.vue";
import AlertConfirm from "@components/reusables/AlertConfirm.vue";

import { mapState, mapMutations, mapActions } from "vuex";
export default {
    name: 'AdminOrganizationsLists',
    components: {
        Loader,
        IconEdit,
        IconTrash,
        IconRestore,
        Page,
        AsyncButton,
        AlertConfirm
    },
    computed: {
        ...mapState({
            state: state => state.administration.organizations.state
        }),
        getEntryData() {
            return this.state.entry.data.map(row => {
                row.isManagedIn = this.appIsAdmin && this.getOrgUID && (this.getOrgUID == row.uid) ? true : false;
                return row;
            });
        }
    },
    methods: {
        ...mapMutations('administration/organizations', [
            'setState'
        ]),
        ...mapActions('administration/organizations', [
            'fetchEntry',
            'restoreEntry',
            'removeEntry',
            'organizationSignInOutAdmin'
        ]),
        paginate(data) {
            this.setState({ entry: { ...this.state.entry, filter: { ...this.state.entry.filter, page: data.page } } });
            this.setState({ entry: { ...this.state.entry, filter: { ...this.state.entry.filter, limit: data.limit } } });
            this.fetchEntry();
        },
        async manageInOut(payload) {
            this.$refs[`manageinout-ref-${payload.ref}`][0].loading = true;
            await this.organizationSignInOutAdmin(payload.value);
            this.$refs[`manageinout-ref-${payload.ref}`][0].loading = false;
            this.notify({ title: 'Done!', html: payload.value ? `Successfully In, you are now managing <strong class="--text-primary">${this.$auth.user.admin.organization.organization}</strong>` : 'Successfully Managed Out' });
        }
    }
}
</script>