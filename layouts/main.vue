<template>
    <div class="--app-wrap-nuxt">
    
        <t-alert></t-alert>

        <div class="--pref-main-layout relative">
            <div>
                <div class="flex bg-white">
                
                <!-- menu with backdrop mobile -->
                <div
                    v-show="!global.isSidebarOpen"
                    @click="setState({ isSidebarOpen: !global.isSidebarOpen })"
                    class="fixed inset-0 z-10 bg-black bg-opacity-20 lg:hidden"
                    style="backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px)"
                ></div>
                <main-layout-menu />
                <!-- end of menu -->

                <div class="flex ml-0 xl:ml-64 flex-col flex-1 overflow-x-hidden scrollbar pb-10">
                    <!-- Navbar -->
                    <header class="flex-shrink-0 ml-0 lg:ml-64 fixed inset-x-0 --bg-light z-10">
                    <div class="flex items-center justify-between p-2">
                        <!-- Navbar left -->
                        <div class="flex items-center space-x-3">
                            <img v-if="getOrgLogo" :src="getOrgLogo" :alt="getOrgName" class="w-32 lg:hidden">
                            <span v-else class="p-2 text-xl font-semibold tracking-wider uppercase lg:hidden --text-dark">{{getOrgName}}</span>
                            <h1 class="text-lg --text-heading font-semibold">{{ pageTitle }}</h1>
                            <!-- Toggle sidebar button -->
                            <button @click="setState({ isSidebarOpen: !global.isSidebarOpen })" class="p-2 rounded-md focus:outline-none focus:ring inline lg:hidden --text-dark">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            </button>
                        </div>
                        
                        <!-- Navbar right -->
                        <div class="relative flex items-center space-x-3">

                            <main-layout-icon-menus />

                        </div>
                    </div>

                    </header>
                    

                    <!-- Main content -->
                    <main class="flex-1 p-5 mt-10">
                        <nuxt />
                    </main>
                    
                </div>

                </div>
            </div>
        </div>

        <client-only>
            <back-to-top bottom="20px" right="20px">
                <button type="button" 
                ref="scrollTopButton"
                @click="() => { $scrollToView('main'); }"
                class="rounded-full flex p-3 --bg-primary --text-light">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
                    </svg>
                </button>
            </back-to-top>
        </client-only>

        <modal
        :ref="`loader-layout`"
        contentclass="w-fit h-full flex items-center"
        :closable="false"
        :noheader="true"
        :nofooter="true"
        :backdrop="false"
        :openmodal="global.appload"
        >
            <template slot="content">
                <div>
                    <loader class="primary modal" />
                </div>
            </template>
        </modal>

    </div>
</template>
<script>

import MainLayoutIconMenus from "@components/layouts/main/IconMenus.vue";
import MainLayoutMenu from "@components/layouts/main/Menu.vue";
import TAlert from "@components/reusables/Alert.vue";
import Modal from '@components/reusables/Modal.vue';
import Loader from '@components/reusables/Loader.vue';

import { mapState, mapMutations, mapActions } from "vuex"
import moment from 'moment-timezone';

// timer buttons
import TimeInOut from '@components/timers/InOut.vue';
import ManageInOut from '@components/timers/AdminManage.vue';
import BreakInOut from '@components/timers/Breaks.vue';
import LunchInOut from '@components/timers/Lunch.vue';

export default {
    name: 'MainLayout',
    components: {
        MainLayoutMenu,
        MainLayoutIconMenus,
        TAlert,
        Modal,
        Loader,
        BackToTop: () => {
            if(process.client) {
                return import('vue-backtotop');
            }        
        },
        TimeInOut,
        ManageInOut,
        BreakInOut,
        LunchInOut
    },
    data() {
        return {
            pageTitle: this.$nuxt.context.app.head.page
        }
    },
    computed: {
        ...mapState({
            global: state => state.global.state,
            page: state => state.global.page
        })
    },
    watch: {
        '$route' () {
            this.setState({ isSidebarOpen: true });
        },
        page: function(newdata, olddata) {
            this.pageTitle = newdata
        }
    },
    methods: {
        ...mapMutations('global', [
            'setState'
        ]),
        ...mapActions('employees/attendance', [
            'fetchEntry',
        ]),
    },
    created() {
        // set default timezone and rounding settings
        moment.tz.setDefault(this.getTimezone);
        moment.relativeTimeRounding(Math.floor);
    },
    mounted() {
        this.fetchEntry();
        this.pageTitle = this.page
    }
}
</script>
