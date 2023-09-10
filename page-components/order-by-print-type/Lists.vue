<template>
    <div class="index-time-sheet-lists mb-5">
        <div class="table-container bg-violet-400">
            <div class="title bg-violet-400 h-64px">
                <h4>Listing of all Orders and their Line Items by Print Type</h4>
                <page-filter />
            </div>
            <div class="content">
                <div class="mb-2 float-right">
                    <button class="p-2 mr-2 border-solid border-2 border-indigo-600 rounded-md">Reset Column Settings</button>
                    <button class="p-2 mr-2 border-solid border-2 border-indigo-600 rounded-md">Reset Column Order</button>
                    <Print />
                </div>
                
                <table class="w-full table-auto">
                    <thead>
                        <tr>
                            <th
                                scope="col"
                                class="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase"
                            >
                                Status
                            </th>

                            <th
                                scope="col"
                                class="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase"
                            >
                                Product
                            </th>

                            <th
                                scope="col"
                                class="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase"
                            >
                                Detail
                            </th>

                            <th
                                scope="col"
                                class="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase"
                            >
                                Print Type
                            </th>

                            <th
                                scope="col"
                                class="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase"
                            >
                                Quantity
                            </th>
                            <th
                                scope="col"
                                class="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase"
                            >
                                Total
                            </th>

                            <th 
                                scope="col"
                                class="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase"
                            ></th>
                        </tr>
                    </thead>


                    <tbody v-if="!state.entry.loading" class="bg-white divide-y divide-gray-200">
                        <tr v-for="(entry, entryindex) in state.entry.data" :key="`department-entry-${genKey(entry)}`" class="transition-all hover:bg-gray-100">
                            
                            <td class="px-6 py-10 ">
                                <span class="--text-dark text-sm">{{ entry.item_status_id }}</span>
                            </td>
                            <td class="px-6 py-10 ">
                                <span class="--text-dark text-sm">
                                    {{ entry.product_num }}
                                </span>
                            </td>
                            <td class="px-6 py-4 ">
                                <span class="--text-dark text-sm">{{ entry.product_detail }}</span>
                            </td>

                            <td class="px-6 py-4 ">
                                <span class="--text-dark text-xs block max-w-xs">{{ entry.print_type_id }}</span>
                            </td>

                            <td class="px-6 py-4 ">
                                <span class="--text-dark text-xs block max-w-xs">{{ entry.quantity }}</span>
                            </td>
                            <td class="px-6 py-4 ">
                                <span class="--text-dark text-xs block max-w-xs">{{ entry.sold }}</span>
                            </td>

                            <td class="px-6 py-4 text-sm font-medium text-right  flex items-center justify-end">
                                <nuxt-link v-if="entry.editable" :to="`/order?uid=${entry.uid}`" 
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
                    There is no order here.
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
        </div>
    </div>
</template>
<script>
import Loader from "@components/reusables/Loader.vue";
import Page from "@components/reusables/Pagination.vue";
import IconEdit from "@components/reusables/IconEdit.vue";
import IconTrash from "@components/reusables/IconTrash.vue";
import AlertConfirm from "@components/reusables/AlertConfirm.vue";
import PageFilter from "@page_components/order-by-print-type/Filter.vue";
import Print from "@page_components/main-order/Print.vue";

import { mapState, mapMutations, mapActions } from "vuex"

export default {
    name: 'MainOrderLists',
    components: {
        Loader,
        Page,
        IconEdit,
        IconTrash,
        AlertConfirm,
        PageFilter,
        Print
    },
    computed: {
        ...mapState({
            state: state => state.order.order_by_print_type.state
        }),
    },
    methods: {
        ...mapMutations('order/order_by_print_type', [
            'setState'
        ]),
        ...mapActions('order/order_by_print_type', [
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