<template>
    <div class="block items-center mt-10 sm:flex">

        <paginate
        v-if="totalPages"
        v-model="page"
        :page-count="totalPages"
        :click-handler="(page) => paginate(page)"
        :prev-text="'<span class=\'--text-dark text-sm\'>Prev</span>'"
        :next-text="'<span class=\'--text-dark text-sm\'>Next</span>'"
        :container-class="'fpagination relative z-0 inline-flex rounded-md shadow-sm -space-x-px'"
        :page-link-class="'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium'"
        :next-link-class="'relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'"
        :prev-link-class="'relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'"
        />

        <form @submit.prevent="setPageNumber" class="inpt-pagination ml-0 mt-3 sm:ml-3 sm:mt-0">
            <input 
            v-model="page"
            type="number" 
            class="form-control w-full text-sm font-semibold border-gray-300 focus:border-purple-600 focus:ring-transparent appearance-none border shadow-sm rounded py-2 px-3 text-gray-700 leading-tight"
            />
        </form>

        <select
        class="form-control ml-0 mt-3 sm:ml-3 sm:mt-0 inpt-pagination text-sm font-semibold border-gray-300 focus:border-purple-600 focus:ring-transparent appearance-none border shadow-sm rounded py-2 px-3 text-gray-700 leading-tight"
        v-model="limit"
        @input="($e) => limitchange($e.target.value)"
        >
            <option v-for="(lm, index) in limitlists" :key="`limit-lists-${index}`" :value="lm">{{lm}}</option>
        </select>

    </div>
</template>
<script>
import defaults from "~/defaults.js";
export default {
    components: {
        Paginate: () => {
            if(process.client) {
                return import('vuejs-paginate')
            }
        },
    },
    data() {
        return {
            limit: defaults.limit,
            page: 1
        }
    },
    watch: {
        page: function() {
            this.page = parseInt(this.page);
        }
    },
    props: {
        total: {
            type: Number,
            default: 0
        },
        limitlists: {
            type: Array,
            default: function() {
                return defaults.limitlists;
            }
        },
        totalPages: {
            type: Number
        }
    },
    computed: {
        getReturn() {
            return {
                page: this.page,
                total: this.total,
                limit: this.limit
            }
        }
    },
    methods: {
        paginate($page) {
            this.$emit('paginate', this.getReturn);
        },
        setPageNumber() {
            this.paginate(this.page);
        },
        limitchange(value) {
            this.$emit('paginate', {
                ...this.getReturn,
                limit: parseInt(value)
            });
        }
    }
}
</script>

<style scope lang="scss">
.inpt-pagination {
    max-width:70px;
    width:100%;
}
</style>