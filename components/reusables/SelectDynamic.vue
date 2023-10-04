<template>
     <client-only>
        <v-select 
        :components="{OpenIndicator, Deselect}"
        :value="value"
        @input="value => {
            $emit('input', value)
            if(!value) {
                $emit('clear', value)
            }
        }" 
        :reduce="dd => dd[datakeyvalue]"
        :options="data"
        :label="datakeylabel"
        :class="{ 
            'dynamic-select-loading': loading,
            'border border-gray-300 --text-dark text-sm rounded block w-full p-1 input-focus-border tt-component-select': true
        }"
        v-bind="$attrs" 
        v-on="$listeners"
        :loading="loading"
        @search="(search, loading) => { 
            loading(true)
            debounceEvent(function() {
                filter.page=1;
                fetchData({query: search}).then(() => loading(false));
            });
        }"
        >

            <template v-slot:no-options="{ search, searching }">
                <template v-if="searching">
                    <span class="--text-dark text-sm">No results found for {{ search }}.</span>
                </template>
                <span v-else class="--text-dark text-sm">{{searchplaceholder}}</span>
            </template>

            <template v-slot:spinner="{ loading }">
                <loader v-if="loading" class="primary m-auto dynamic-dd-loader" />
            </template>

            <template #list-footer>
                <li v-if="!loading && pagination.next_page" class="mt-2 mb-1" style="text-align: center">
                    <a href="#" @click.prevent="() => {
                        filter.page++;
                        fetchData();
                    }" class="--text-primary --text-primary-hover text-xs">Load More</a>
                </li>

                <li v-if="loading" class="mt-2 mb-1" style="text-align: center">
                    <loader class="primary m-auto" style="display:block;" />
                </li>
            </template>

        </v-select>
     </client-only>
</template>

<script>
import "vue-select/dist/vue-select.css";
import "~/assets/v-select.scss";
import OpenIndicator from "@components/reusables/vselectopenindicator.vue";
import Deselect from "@components/reusables/vselectdeselect.vue";
import vSelect from "vue-select";

import Loader from "@components/reusables/Loader.vue";
import defaults from "~/defaults.js";
export default {
    components: {
        Loader,
        vSelect
    },
    props: {
        endpoint: {
            type: String,
            default: '/'
        },
        datakeyvalue: {
            type: String,
            default: 'value'
        },
        datakeylabel: {
            type: String,
            default: 'label'
        },
        searchplaceholder: {
            type: String,
            default: 'Type to Search'
        },
        apiargs: {
            type: Object,
            default: () => { return {} }
        },
        value: {
            type: String
        }
    },
    data() {
        return {
            OpenIndicator,
            Deselect,
            loading: false,
            pagination: {},
            data: [],
            filter: {
                page: 1,
                limit: defaults.limit
            }
        }
    },
    async mounted() {
        await this.fetchData();
    },
    methods: {
        async fetchData($args={}) {
            try {
                this.loading = true;
                const res = await this.$axios.get(this.endpoint, {
                    params: {
                        ...this.filter,
                        ...$args,
                        ...this.apiargs,
                        orderByField: this.value ? `id:${this.value}` : null
                    }
                });

                const uids = new Set(this.data.map(d => d.uid));
                this.data = [...new Set([...this.data ,...res.data.data.filter(d => !uids.has(d.uid))])];
                this.pagination = res.data.pagination;
                this.loading = false;
            } catch($e) {
                this.loading = false;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.dynamic-select-loading .vs__selected-options .vs__selected { opacity: 0!important;}
.tt-component-select .vs__search { margin: 0!important;}
</style>