<template>
    <div class="index-time-sheet-lists mb-5">
        <table class="w-full overflow-x-scroll divide-y divide-gray-200 bprint_type-4">
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
                        Sort
                    </th>

                    <th
                        scope="col"
                        class="px-6 py-3 text-xs font-medium tracking-wider text-left text-slate-50 uppercase"
                    >
                        Color
                    </th>

                    <th
                        scope="col"
                        class="px-6 py-3 text-xs font-medium tracking-wider text-left text-slate-50 uppercase"
                    >
                        Method
                    </th>

                    <th
                        scope="col"
                        class="px-6 py-3 text-xs font-medium tracking-wider text-left text-slate-50 uppercase"
                    >
                        Maximum
                    </th>
                </tr>
            </thead>


            <tbody v-if="!state.entry.loading" class="bg-white divide-y divide-gray-200">
                <tr v-for="(entry, entryindex) in state.entry.data" :key="`department-entry-${genKey(entry)}`" class="transition-all hover:bg-gray-100">
                    
                    <td class="px-6 py-10 ">
                        <span class="--text-dark text-sm">{{ entry.long_name }}</span>
                    </td>
                    <td class="px-6 py-10 ">
                        <span class="--text-dark text-sm">
                            {{ entry.sort }}
                        </span>
                    </td>
                    <td class="px-6 py-4 ">
                        <!-- <span class="--text-dark text-sm" :style="`padding-right:20px;padding-left:20px;background-color:#${entry.color}`">{{ entry.color }}</span> -->
                        <color-picker :value="`#`+entry.color"/>
                    </td>

                    <td class="px-6 py-4 ">
                        <span class="--text-dark text-xs block max-w-xs">{{ entry.print_method_id }}</span>
                    </td>

                    <td class="px-6 py-4 ">
                        <span class="--text-dark text-xs block max-w-xs">{{ entry.default_maximum }}</span>
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
            There is no print_type here.
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
    name: 'MainPrintTypeLists',
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
            state: state => state.main.print_type.state
        }),
    },
    methods: {
        ...mapMutations('main/print_type', [
            'setState'
        ]),
        ...mapActions('main/print_type', [
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