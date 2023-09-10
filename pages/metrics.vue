<template>
    <div class="metrics-page">
        <div class="mb-10 mt-5">
            <h3 class="text-lg mb-3 --text-heading font-semibold">Metrics</h3>
            <breadcrumbs
            :lists="[
                { text: 'Employees', link: '/employees' },
                { text: 'Metrics' }
            ]"
            />
        </div>

        <div class="w-full block">

            <top-buttons/>

            <div class="mb-5 mt-5" :class="{ 'opacity-50 pointer-events-none': state.entry.loading }">
                <div class="hidden" :class="{ 'lg:block': state.menu == 'calendar' }">
                    <CalendarView v-if="state.menu=='calendar'" />
                </div>
                <div class="md:block" :class="{ 'lg:hidden': state.menu != 'table' }">
                    <ListsView />
                </div>
            </div>

            <metrics-form/>

            <reminders/>

        </div>

    </div>
</template>
<script>
import Breadcrumbs from "@components/reusables/Breadcrumbs.vue";
import TopButtons from "@page_components/main-metrics/TopButtons.vue";
import Reminders from "@page_components/main-metrics/Reminders.vue";
import ListsView from "@page_components/main-metrics/ListsView.vue";
import CalendarView from "@page_components/main-metrics/CalendarView.vue";
import MetricsForm from "@page_components/main-metrics/MetricsForm.vue";

import tagmixins from "~/mixins/tagmixins.js";
import permissions from "@permissions/metrics.js";

import { mapState, mapActions } from "vuex";

export default {
    name: "MetricsPage",
    layout: "main",
    middleware: ['auth', 'permission'],
    meta: {
        permissionKey: `metrics_manage`
    },
    ssr: false,
    mixins: [tagmixins],
    head() {
        return {
            title: 'Metrics' + this.theAppTitle
        }
    },
    computed: {
        ...mapState({
            state: state => state.main.metrics.state
        }),
        ...permissions
    },
    components: {
        Breadcrumbs,
        TopButtons,
        Reminders,
        ListsView,
        CalendarView,
        MetricsForm
    },
    methods: {
        ...mapActions('main/metrics', [
            'fetchEntry',
            'fetchByUID'
        ])
    },
    watch: {
        $route: async function(to, from) {
            if(!this.permissionCheck(this.permissions.manage)) {
                return false;
            }
            if(to.query.uid) {
                this.nuxtload();
                await this.fetchByUID(to.query.uid);
                this.nuxtunload();
            } else {
                this.findPageComponent('MainMetricsFormModal').$refs.postentrymodal.open=false;
            }
        }
    },
    async mounted() {
        await this.fetchEntry();

        if(this.permissionCheck(this.permissions.manage) && this.$route.query.uid) {
            this.nuxtload();
            await this.fetchByUID(this.$route.query.uid);
            this.nuxtunload();
        }
    }
}
</script>