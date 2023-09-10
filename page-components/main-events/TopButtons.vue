<template>
    <div class="mb-5 w-full items-start block sm:flex">
        
        <div class="inline-flex rounded-md hidden lg:inline-flex" role="group">
            <button type="button" 
            @click="() => setState({ handle: 'state', key: 'menu', value: 'calendar' })"
            title="Calendar View" v-tooltip="`Calendar View`"
            :class="{ 'bg-gray-100': state.menu == 'calendar' }"
            class="py-2 px-4 text-sm font-medium --text-dark bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            </button>

            <button type="button" 
            @click="() => setState({ handle: 'state', key: 'menu', value: 'table' })"
            title="Table View" v-tooltip="`Table View`"
            :class="{ 'bg-gray-100': state.menu == 'table' }"
            class="py-2 px-4 text-sm font-medium --text-dark border-l-0 bg-white rounded-r-md border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
            </button>
        </div>

        <div class="ml-0 lg:ml-3 inline-flex items-center">
            <button type="button" 
            v-if="permissionCheck(permissions.manage)"
            :class="`p-2 ${btnclassnormal}`"
            @click="openNewMetrics"
            >New Event</button>
        </div>


        <div class="ml-0 sm:ml-3 md:block mt-3 sm:mt-0" :class="{ 'lg:hidden': state.menu != 'table' }">
            <client-only>
                <vue-monthly-picker
                :monthLabels="['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']"
                alignment="left"
                selectedBackgroundColor="var(--pref-color-primary)"
                :value="$moment(state.entry.filter.start)"
                @input="changeMonth"
                :clearOption="false"
                dateFormat="MMMM YYYY"
                >
                </vue-monthly-picker>
            </client-only>
        </div>

        <div v-if="state.entry.loading" class="ml-3 hidden lg:block">
            <loader class="primary" />
        </div>

    </div>
</template>

<script>
import Loader from "@components/reusables/Loader.vue";
import "~/assets/monthpicker.scss";
import { mapState, mapMutations, mapActions } from "vuex";
import permissions from "@permissions/events.js";

export default {
    name: 'MainEventsTopButtons',
    components: {
        VueMonthlyPicker: () => {
            if(process.client) {
                return import('vue-monthly-picker');
            }
        },
        Loader
    },
    computed: {
        ...mapState({
            state: state => state.main.events.state
        }),
        ...permissions
    },
    methods: {
        ...mapMutations('main/events', [
            'setState',
            'resetInputs'
        ]),
        ...mapActions('main/events', [
            'fetchEntry'
        ]),
        changeMonth(e) {
            const month = e;
            const therange = this.firstLastMonthDate(month);
            this.setState({ handle: 'state.entry.filter', key: 'start', value: therange.start });
            this.setState({ handle: 'state.entry.filter', key: 'end', value: therange.end });
            this.setState({ handle: 'state', key: 'editmode', value: false });
            this.fetchEntry();
        },
        openNewMetrics() {
            this.resetInputs();
            this.findPageComponent('MainEventsFormModal').$refs.postentrymodal.open=true;
        }
    }
}
</script>