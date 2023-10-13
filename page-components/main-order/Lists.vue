<template>
    <div class="index-time-sheet-lists mb-5">
        <div class="table-container bg-violet-400">
            <div class="title bg-violet-400 h-64px">
                <h4>Listing of Orders and their Line Items by Order ID</h4>
                <page-search />
            </div>
            <div class="content">
                <div class="mb-2 float-right">
                    <Print/>
                </div>
                <table class="border-collapse w-100 table-auto">
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
                                v-if="$auth.user.role_id == 1"
                                scope="col"
                                class="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase"
                            ></th>
                        </tr>
                    </thead>


                    <tbody v-if="!state.entry.loading" class="bg-white divide-y divide-gray-200">
                        <template v-for="(entry, entryindex) in state.entry.data">
                          <tr
                            :key="`orders-${genKey(entry)}`"
                            class="transition-all hover:bg-gray-100"
                          >
                              <td class="border p-2">
                                  <client-only>
                                  <t-select-dynamic
                                  :endpoint="`/item_status`"
                                  datakeylabel="id"
                                  datakeyvalue="id"
                                  searchplaceholder="Type to Search Status"
                                  placeholder="Choose Status"

                                  :style="`background-color:#${entry.item_status_color}`"

                                  @input="e => {
                                      setState({
                                          // entry: {
                                          //   data: [
                                          //     ...state.entry.data.slice(0, entryIndex),
                                          //     state.entry.data[entryindex].item_status_id = e,
                                          //     ...state.entry.data.slice(entryIndex + 1),
                                          //   ]
                                          // },
                                          inputs: {
                                              // order_id: entry.order_id,
                                              // Line Items
                                              line_item_id: entry.line_item_id,
                                              order_id: entry.order_id,
                                              product_num: entry.product_num,
                                              product_detail: entry.product_detail,
                                              print_type_id: entry.print_type_id,
                                              num_impressions: entry.num_impressions,
                                              impressions_tradition: entry.impressions_tradition,
                                              impressions_hispeed: entry.impressions_hispeed,
                                              impressions_digital: entry.impressions_digital,
                                              quantity: entry.quantity,
                                              thumbnail: entry.thumbnail,
                                              item_status_id: e,

                                              // Orders
                                              ship_date_id: entry.ship_date_id,
                                              customer_name: entry.customer_name,
                                              proof_spec_date: entry.proof_spec_date,
                                              printing_company: entry.printing_company,
                                              rush: entry.rush,
                                          },
                                      });
                                      updateStatus()

                                  }"
                                  ></t-select-dynamic>
                                  <input type="hidden"
                                  :value="state.inputs.id"
                                  @input="e => {
                                      setState({ handle: 'state.inputs', key: 'id', value: e });
                                      validate(e);
                                  }">
                                  </client-only>
                              </td>
                              <td
                                class="border p-2"
                                colspan="5"
                              >
                                  <span class="--text-dark text-sm block w-full h-full bg-gray-50	 p-2 rounded-md">
                                      {{ entry.product_num }}
                                  </span>
                                  <span class="--text-dark text-sm block w-full h-full bg-gray-50	 p-2 rounded-md">
                                      {{ entry.order_id }} | {{ entry.customer_name }}
                                  </span>
                              </td>
                              <td v-if="$auth.user.role_id == 1" class="border p-2">
                                  <!-- <nuxt-link :to="`/order?uid=${entry.order_id}`"
                                  class="ml-2 mt-2 --text-primary --text-primary-hover" :title="appdefaults.edit" v-tooltip="appdefaults.edit">
                                      <icon-edit />
                                  </nuxt-link> -->

                                  <a href="#" @click.prevent="() => {
                                      $refs.alertconfirm.$alert({
                                          title: appdefaults.trashConfirm.title,
                                          html: appdefaults.trashConfirm.html,
                                          execute: async function() {
                                              await removeEntry(entry);
                                              notify({ title: 'Success!', html: `Order ${appdefaults.trashConfirm.success}` });
                                          }
                                      });
                                  }" class="ml-2 mt-2 --text-danger --text-danger-hover mr-10" :title="appdefaults.trash" v-tooltip="appdefaults.trash">
                                      <icon-trash />
                                  </a>
                              </td>
                          </tr>
                          <tr
                            v-if="entry.line_items.length > 0"
                            v-for="(item, itemIndex) in entry.line_items"
                            :key="`items-${genKey(entry)}`"
                            class="transition-all hover:bg-gray-100"
                          >
                              <td class="border p-2">
                                  <client-only>
                                  <t-select-dynamic
                                  :endpoint="`/item_status`"
                                  datakeylabel="id"
                                  datakeyvalue="id"
                                  searchplaceholder="Type to Search Status"
                                  placeholder="Choose Status"

                                  :style="`background-color:#${item.item_status_color}`"

                                  @input="e => {
                                      setState({
                                          // entry: {
                                          //   data: [
                                          //     ...state.entry.data.slice(0, entryIndex),
                                          //     state.entry.data[entryindex].item_status_id = e,
                                          //     ...state.entry.data.slice(entryIndex + 1),
                                          //   ]
                                          // },
                                          inputs: {
                                              // order_id: entry.order_id,
                                              // Line Items
                                              line_item_id: entry.line_item_id,
                                              order_id: entry.order_id,
                                              product_num: entry.product_num,
                                              product_detail: entry.product_detail,
                                              print_type_id: entry.print_type_id,
                                              num_impressions: entry.num_impressions,
                                              impressions_tradition: entry.impressions_tradition,
                                              impressions_hispeed: entry.impressions_hispeed,
                                              impressions_digital: entry.impressions_digital,
                                              quantity: entry.quantity,
                                              thumbnail: entry.thumbnail,
                                              item_status_id: e,

                                              // Orders
                                              ship_date_id: entry.ship_date_id,
                                              customer_name: entry.customer_name,
                                              proof_spec_date: entry.proof_spec_date,
                                              printing_company: entry.printing_company,
                                              rush: entry.rush,
                                          },
                                      });
                                      updateStatus()

                                  }"
                                  ></t-select-dynamic>
                                  <input type="hidden"
                                  :value="state.inputs.id"
                                  @input="e => {
                                      setState({ handle: 'state.inputs', key: 'id', value: e });
                                      validate(e);
                                  }">
                                  </client-only>
                              </td>
                              <td class="border p-2">
                                {{ item.product_num }}
                              </td>
                              <td class="border p-2">
                                {{ item.product_detail }}
                              </td>
                              <td class="border p-2">
                                {{ item.product_detail }}
                              </td>
                              <td class="border p-2">
                                {{ item.product_detail }}
                              </td>
                              <td class="border p-2">
                                {{ item.product_detail }}
                              </td>
                              <td v-if="$auth.user.role_id == 1" class="border p-2">
                                  <!-- <nuxt-link :to="`/order?uid=${entry.order_id}`"
                                  class="ml-2 mt-2 --text-primary --text-primary-hover" :title="appdefaults.edit" v-tooltip="appdefaults.edit">
                                      <icon-edit />
                                  </nuxt-link> -->

                                  <a href="#" @click.prevent="() => {
                                      $refs.alertconfirm.$alert({
                                          title: appdefaults.trashConfirm.title,
                                          html: appdefaults.trashConfirm.html,
                                          execute: async function() {
                                              await removeEntry(entry);
                                              notify({ title: 'Success!', html: `Order ${appdefaults.trashConfirm.success}` });
                                          }
                                      });
                                  }" class="ml-2 mt-2 --text-danger --text-danger-hover mr-10" :title="appdefaults.trash" v-tooltip="appdefaults.trash">
                                      <icon-trash />
                                  </a>
                              </td>
                          </tr>
                        </template>
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
import PageSearch from "@page_components/main-order/Search.vue";
import Print from "@page_components/main-order/Print.vue";
import TSelectDynamic from "@components/reusables/SelectDynamic.vue";
import { mapState, mapMutations, mapActions } from "vuex"

export default {
    name: 'MainOrderLists',
    components: {
        Loader,
        Page,
        IconEdit,
        IconTrash,
        PageSearch,
        AlertConfirm,
        Print,
        TSelectDynamic
    },
    data() {
        return {
            entries: [],
            isProcessing: false,
        }
    },
    computed: {
        ...mapState({
            state: state => state.order.order.state
        }),
    },
    mounted() {
        localStorage.setItem('order-entry', JSON.stringify(this.state.entry))
        console.log(['this.$nuxt.appIsAdmin()', this.$auth.$state.user.role_id])
    },
    methods: {
        ...mapMutations('order/order', [
            'setState'
        ]),
        ...mapActions('order/order', [
            'fetchEntry',
            'removeEntry',
            'updateStatusEntry'
        ]),
        async updateStatus() {
            if (this.isProcessing) {
                return;
            }
            this.isProcessing = true;

            try {
                await this.updateStatusEntry();

                this.isProcessing = false;


            } catch($e) {
                console.log($e)
                this.errorHandle($e, 'adjustment');
            }




        },
        paginate(data) {
            this.setState({ entry: { ...this.state.entry, filter: { ...this.state.entry.filter, page: data.page } } });
            this.setState({ entry: { ...this.state.entry, filter: { ...this.state.entry.filter, limit: data.limit } } });
            localStorage.setItem('order-entry', JSON.stringify(this.state.entry))
            this.fetchEntry();
        }
    }
}
</script>
