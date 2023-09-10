<template>
    <div class="metrics-page">
        <div class="mb-10 mt-5">
            <h3 class="text-lg mb-3 --text-heading font-semibold">Events</h3>
            <breadcrumbs
            :lists="[
                { text: 'Employees', link: '/employees' },
                { text: 'Events' }
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

            <page-form/>

        </div>

    </div>
</template>
<script>
import Breadcrumbs from "@components/reusables/Breadcrumbs.vue";
import TopButtons from "@page_components/main-events/TopButtons.vue";
import ListsView from "@page_components/main-events/ListsView.vue";
import CalendarView from "@page_components/main-events/CalendarView.vue";
import PageForm from "@page_components/main-events/PageForm.vue";

import tagmixins from "~/mixins/tagmixins.js";
import permissions from "@permissions/events.js";

import { mapState, mapActions } from "vuex";

export default {
    name: "EventsPage",
    layout: "main",
    middleware: ['auth'],
    ssr: false,
    mixins: [tagmixins],
    head() {
        return {
            title: 'Events' + this.theAppTitle
        }
    },
    computed: {
        ...mapState({
            state: state => state.main.events.state
        }),
        ...permissions
    },
    components: {
        Breadcrumbs,
        TopButtons,
        ListsView,
        CalendarView,
        PageForm
    },
    methods: {
        ...mapActions('main/events', [
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
                this.findPageComponent('MainEventsFormModal').$refs.postentrymodal.open=false;
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