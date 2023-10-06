<template>
    <div class="main-total-page mb-10">
        <div class="mb-10 mt-5">
            <breadcrumbs
            :lists="[
                { text: 'Total' }
            ]"
            />
        </div>

        <page-lists ref="listAndGraph" />
    </div>
</template>
<script>
import Breadcrumbs from "@components/reusables/Breadcrumbs.vue";
import PageFilter from "@page_components/main-total/Filter.vue";
import PageLists from "@page_components/main-total/Lists.vue";
import PageForm from "@page_components/main-total/Form.vue";

import { mapActions, mapMutations, mapState } from "vuex";

export default {
    name: "MainTotalPage",
    layout: "main",
    middleware: ['auth'],
    ssr: false,
    components: {
        PageFilter,
        PageLists,
        Breadcrumbs,
        PageForm
    },
    head() {
        return {
            title: 'Total' + this.theAppTitle,
            page: 'Totals'
        }
    },
    computed: {
        ...mapState({
            state: state => state.main.total.state,
        })
    },
    methods: {
        ...mapActions('main/total', [
            'fetchTotals',
            'fetchByUID',
            'filterSpecificDate'
        ]),
        ...mapActions('global', [
            'assignPage',
        ]),
        ...mapMutations('main/total', [
            'setState',
        ]),
        reformatSingleDigits(n) {
            return n > 9 ? "" + n: "0" + n;
        }
    },
    watch: {
        $route: async function(to, from) {
            if(to.query.uid) {
                this.nuxtload();
                await this.fetchByUID(to.query.uid);
                this.nuxtunload();
            } else {
                this.findPageComponent('MainTotalForm').$refs.adjustmentmodal.open=false;
            }
        }
    },
    async created() {
        localStorage.removeItem('total-entry');
        await this.assignPage('Totals by Date and Week')
    },
    async mounted() {
        var currentDate = new Date()
        var formattedDate = currentDate.getFullYear() + '-' + this.reformatSingleDigits((currentDate.getMonth() + 1)) + '-' + this.reformatSingleDigits(currentDate.getDate())
        var leftTablePayload = {
            isDaily: true,
            selectedDate: formattedDate
        }
        var rightTablePayload = {
            isDaily: true,
            selectedDate: formattedDate
        }
        
        // For left table
        this.filterSpecificDate(leftTablePayload);
        // For right table
        this.filterSpecificDate(rightTablePayload);

        this.setState({ entry: { ...this.state.entry, filter: { ...this.state.entry.filter, date: formattedDate, filter: 'daily' } } });
        localStorage.setItem('total-entry', JSON.stringify(this.state.entry))

        // For Graph
        await this.fetchTotals();

        if(this.$route.query.uid) {
            this.nuxtload();
            await this.fetchByUID(this.$route.query.uid);
            this.nuxtunload();
        }
    },
}
</script>