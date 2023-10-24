<template>
    <div class="index-time-sheet-lists mb-5">
        <div class="table-container bg-violet-400">
            <div class="title bg-violet-400 h-64px">
                <h4>Listing of all Orders and their Line Items by Date</h4>
                <page-filter />
                <!-- <DatePicker v-model="dateData"/> -->
            </div>
            <div class="content">
                <div class="mb-2 float-right">
                    <!-- <button class="p-2 mr-2 border-solid border-2 border-indigo-600 rounded-md">Reset Column Settings</button>
                    <button class="p-2 mr-2 border-solid border-2 border-indigo-600 rounded-md">Reset Column Order</button> -->
                    <Print />
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
                                  :fixedData="dropdownData"
                                  datakeylabel="id"
                                  datakeyvalue="id"
                                  searchplaceholder="Type to Search Status"
                                  placeholder="Choose Status"
                                  :value="entry.line_items[0].item_status.id.toUpperCase()"
                                  :style="`background-color:#${entry.line_items[0].item_status.color}`"
                                  @input="e => {
                                      setState({
                                          inputs: {
                                              // Line Items
                                              line_item_id: entry.line_items[0].id,
                                              order_id: entry.id,
                                              product_num: entry.line_items[0].product_num,
                                              product_detail: entry.line_items[0].product_detail,
                                              print_type_id: entry.line_items[0].print_type_id,
                                              num_impressions: entry.line_items[0].num_impressions,
                                              impressions_tradition: entry.line_items[0].impressions_tradition,
                                              impressions_hispeed: entry.line_items[0].impressions_hispeed,
                                              impressions_digital: entry.line_items[0].impressions_digital,
                                              quantity: entry.line_items[0].quantity,
                                              thumbnail: entry.line_items[0].thumbnail,
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
                                    {{ entry.customer_name }}
                                  </span>
                                  <span class="--text-dark text-sm block w-full h-full bg-gray-50	 p-2 rounded-md">
                                      {{ entry.id }} | {{ entry.customer_name }}
                                  </span>
                              </td>
                              <td v-if="$auth.user.role_id == 1" class="border p-2">
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
                            :key="`items-${genKey(item)}`"
                            class="transition-all hover:bg-gray-100"
                          >
                              <td class="border p-2">
                                  <client-only>
                                  <t-select-dynamic
                                  :fixedData="dropdownData"
                                  datakeylabel="id"
                                  datakeyvalue="id"
                                  searchplaceholder="Type to Search Status"
                                  placeholder="Choose Status"
                                  :value="item.item_status.id.toUpperCase()"
                                  :style="`background-color:#${item.item_status.color}`"
                                  @input="e => {
                                      setState({
                                          inputs: {
                                              // Line Items
                                              line_item_id: item.id,
                                              order_id: entry.id,
                                              product_num: item.product_num,
                                              product_detail: item.product_detail,
                                              print_type_id: item.print_type_id,
                                              num_impressions: item.num_impressions,
                                              impressions_tradition: item.impressions_tradition,
                                              impressions_hispeed: item.impressions_hispeed,
                                              impressions_digital: item.impressions_digital,
                                              quantity: item.quantity,
                                              thumbnail: item.thumbnail,
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
                                <span
                                  class="text-white text-sm block w-full h-full bg-gray-50 p-2 rounded-md"
                                  :style="`background-color:#${item.printtype.color}`">{{ item.printtype.long_name }}
                                </span>
                              </td>
                              <td class="border p-2">
                                {{ item.quantity }}
                              </td>
                              <td class="border p-2">
                                {{ item.sold }}
                              </td>
                              <td v-if="$auth.user.role_id == 1" class="border p-2">
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
import Print from "@page_components/main-order/Print.vue";
import DatePickerCustom from "@components/reusables/DatePicker.vue";
import PageFilter from "@page_components/order-by-date/Filter.vue";
import { mapState, mapMutations, mapActions } from "vuex"
import TSelectDynamic from "@components/reusables/SelectDynamic.vue";
import { ref } from 'vue';

export default {
    name: 'MainOrderLists',
    components: {
        Loader,
        Page,
        IconEdit,
        IconTrash,
        AlertConfirm,
        Print,
        DatePickerCustom,
        PageFilter,
        TSelectDynamic
    },
    data() {
      return {
          dropdownData: []
      }
    },
    computed: {
        ...mapState({
            state: state => state.order.order_by_date.state,
            statuses: state => state.order.order_by_date.statuses,
        }),
    },
    async created() {
      await this.fetchStatuses()
      this.dropdownData = this.statuses
    },
    methods: {
        ...mapMutations('order/order_by_date', [
            'setState'
        ]),
        ...mapActions('order/order_by_date', [
            'fetchEntry',
            'removeEntry',
            'updateStatusEntry',
            'fetchStatuses'
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
            this.fetchEntry();
        }
    }
}
</script>
