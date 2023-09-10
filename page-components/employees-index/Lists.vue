<template>
    <div class="flex flex-col mt-6">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block w-full py-2 align-middle sm:px-6 lg:px-8">
                <div class="overflow-hidden border-b  border-4 bg-violet-400 shadow border-4">

                    <table class="w-full overflow-x-scroll divide-y divide-gray-200">
                        <thead class="bg-violet-400">
                            <tr>
                            <th
                                scope="col"
                                class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                            >
                                Username
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
                                Email
                            </th>
                            <th scope="col" class="relative px-6 py-3">
                                <span class="sr-only">Edit</span>
                            </th>
                            </tr>
                        </thead>


                        <tbody v-if="!state.entry.loading" class="bg-white divide-y divide-gray-200">
                            <tr v-for="(entry, entryindex) in orders" :key="`organization-entry-${genKey(entry)}`" class="transition-all hover:bg-gray-100 hover:shadow-lg">
                                <td class="px-6 py-4 ">
                                    <p class="--text-dark text-sm">{{entry.username}}</p>
                                </td>
                                <td class="px-6 py-4 ">
                                    <p class="--text-dark text-sm">{{entry.name}}</p>
                                </td>
                                <td class="px-6 py-4 ">
                                    <p class="text-sm --text-dark font-semibold">{{entry.email}}</p>
                                </td>

                              
                                <td class="px-6 py-4 text-sm font-medium text-right flex items-center justify-end">

                                    <template v-if="!entry.deleted_at">

                                        <!-- <a href="#"
                                        v-if="permissionCheck(permissions.notification)"
                                        @click.prevent="openNotifications(entry)"
                                        class="ml-2 mt-2 --text-primary --text-primary-hover" title="Notifications" v-tooltip="`Notifications`">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
                                            </svg>
                                        </a>
                            
                                        <nuxt-link 
                                        v-if="permissionCheck(permissions.managePermission)"
                                        :to="`/employees/${entry.uid}/leaves`" 
                                        class="ml-2 mt-2 --text-primary --text-primary-hover" title="Leave Credits" v-tooltip="`Leave Credits`">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                                        </svg>
                                        </nuxt-link>

                                        <nuxt-link 
                                        v-if="permissionCheck(permissions.managePermission)"
                                        :to="`/employees/${entry.uid}/permissions`" 
                                        class="ml-2 mt-2 --text-primary --text-primary-hover" title="Permissions" v-tooltip="`Permissions`">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                            </svg>
                                        </nuxt-link>

                                        <nuxt-link 
                                        class="ml-2 mt-2 --text-primary --text-primary-hover"
                                        :to="`/employees/${entry.uid}`" :title="appdefaults.view" v-tooltip="appdefaults.view">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </nuxt-link> -->

                                        <nuxt-link
                                        :to="`/employees/?uid=${entry.uid}`"
                                        class="ml-2 mt-2 --text-primary --text-primary-hover" :title="appdefaults.edit" v-tooltip="appdefaults.edit"
                                        >
                                            <icon-edit />
                                        </nuxt-link>

                                        <a 
                                        href="#" @click.prevent="() => {
                                            $refs.alertconfirm.$alert({
                                                title: appdefaults.trashConfirm.title,
                                                html: appdefaults.trashConfirm.html,
                                                execute: async function() {
                                                    await removeEntry(entry);
                                                    notify({ title: 'Success!', html: `Employee ${appdefaults.trashConfirm.success}` });
                                                }
                                            });
                                        }" class="ml-2 mt-2 --text-primary --text-primary-hover mr-10" :title="appdefaults.trash" v-tooltip="appdefaults.trash">
                                            <icon-trash />
                                        </a>
                                    </template>

                                    <template v-else>
                                        <a 
                                        href="#"
                                        @click.prevent="() => {
                                            $refs.alertconfirm.$alert({
                                                title: appdefaults.restoreConfirm.title,
                                                html: appdefaults.restoreConfirm.html,
                                                yesclass: '--bg-success --bg-success-hover',
                                                execute: async function() {
                                                    await restoreEntry(entry);
                                                    notify({ title: 'Success!', html: `Employee ${appdefaults.restoreConfirm.success}` });
                                                }
                                            });
                                        }"
                                        class="ml-2 mt-2 --text-primary --text-primary-hover" :title="appdefaults.restore" v-tooltip="appdefaults.restore">
                                            <icon-restore />
                                        </a>

                                        <a 
                                        href="#" @click.prevent="() => {
                                            $refs.alertconfirm.$alert({
                                                title: appdefaults.removeConfirm.title,
                                                html: appdefaults.removeConfirm.html,
                                                execute: async function() {
                                                    await removeEntry(entry);
                                                    notify({ title: 'Success!', html: `Employee ${appdefaults.removeConfirm.success}` });
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



        <div v-if="state.entry.loading" class="flex justify-center align-center mt-10 mb-10">
            <div class="text-center">
                <loader class="primary m-auto" style="display:block;" />
                <span class="text-xs --text-dark font-semibold">Loading</span>
            </div>
        </div>

        <!-- <p class="text-center ml-1 text-xs font-medium --text-dark mt-5" v-if="!state.entry.loading && !state.entry.data.length">
            There is no employee here.
        </p> -->

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
import permissions from "@permissions/employee.js";
import AlertConfirm from "@components/reusables/AlertConfirm.vue";

import { mapState, mapMutations, mapActions } from "vuex";
export default {
    name: 'EmployeesIndexLists',
    components: {
        Loader,
        IconEdit,
        IconTrash,
        IconRestore,
        Page,
        AlertConfirm
    },
    data() {
    return {
      orders: [
        { id: 1, name: 'Admin', username: 'admin', email: 'adrian@ad-ios.com'},
        { id: 2, name: 'Chris McGee', username: 'sturm', email: 'itdept@skyunlimitedinc.com' },
        { id: 3, name: 'Art Dept', username: 'art', email: 'artdept@skyunlimitedinc.com'},
        { id: 4, name: 'Customer Service', username: 'cs', email: 'customerservice@skyunlimitedinc.com'},
        { id: 5, name: 'Tonya Baker', username: 'tonya.baker', email: 'tonyabaker@main.skyunlimitedinc.com' },
        { id: 6, name: 'Woody Stappe', username: 'woody.stappe', email: 'woodystappe@main.skyunlimitedinc.com'},
        { id: 7, name: 'Eric Noble', username: 'eric.noble', email: 'ericnoble@main.skyunlimitedinc.com'},
        { id: 8, name: 'Julieann Helton', username: 'julieann.helton', email: 'juliennhelton@main.skyunlimitedinc.com' },
        { id: 9, name: 'David Howell', username: 'david.howell', email: 'davidhowell@main.skyunlimitedinc.com'},
        { id: 10, name: 'Jonathan Harms', username: 'jonathan.harms', email: 'jonathanharms@main.skyunlimitedinc.com'},
        { id: 11, name: 'Victor Howard', username: 'victor.howard', email: 'victorhoward@main.skyunlimitedinc.com' },
        { id: 12, name: 'Carl Wade', username: 'carl.wade', email: 'carlwade@main.skyunlimitedinc.com'},
        // Add more records as needed
      ],
    };
    },
    computed: {
        ...mapState({
            state: state => state.employees.employees.state,
            globalstate: state => state.global.state
        }),
        ...permissions
    },
    methods: {
        ...mapMutations({
            'setState': 'employees/employees/setState',
            'setStateNotification': 'employees/employee_notification/setState'
        }),
        ...mapActions('employees/employees', [
            'fetchEntry',
            'removeEntry',
            'restoreEntry'
        ]),
        ...mapActions({
           'fetchPermissions': 'employees/employee_notification/fetchEntry' 
        }),
        paginate(data) {
            this.setState({ entry: { ...this.state.entry, filter: { ...this.state.entry.filter, page: data.page } } });
            this.setState({ entry: { ...this.state.entry, filter: { ...this.state.entry.filter, limit: data.limit } } });
            this.fetchEntry();
        },
        async openNotifications(entry) {
            this.nuxtload();
            this.setStateNotification({ handle: 'state.entry.filter', key: 'user_uid', value: entry.user.uid });
            await this.fetchPermissions();
            this.setStateNotification({ handle: 'state', key: 'data', value: entry });
            this.findPageComponent('EmployeesNotificationsModal').$refs.permissionsmodal.open=true;
            this.nuxtunload();
        }
    }
}
</script>