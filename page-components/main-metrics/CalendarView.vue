<template>
    <div class="metrics-calendar-view">
        <FullCalendar ref="fullCalendar" key="calendar-view-metrics" :options="calendarOptions" />
    </div>
</template>
<script>
// calendar
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import "~/assets/fullcalendar.scss";
import permissions from "@permissions/metrics.js";

import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
    name: 'MainMetricsCalendarView',
    components: {
        FullCalendar
    },
    computed: {
        ...mapState({
            state: state => state.main.metrics.state
        }),
        ...mapGetters('main/metrics', [
            'getMetricCalendar'
        ]),
        calendarOptions() {
            return {
                plugins: [ dayGridPlugin, interactionPlugin, timeGridPlugin ],
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridDay',
                },
                eventClassNames: ['py-1', 'px-2', 'text-xs', 'font-normal', 'cal-entry', 'cursor-pointer'],
                initialView: 'dayGridMonth',
                timeZone: this.getTimezone,
                events: this.getMetricCalendar,
                initialDate: this.state.entry.filter.start,
                eventColor: '#1a73e8',
                eventTextColor: '#fffffff',
                dayMaxEvents: true,
                weekends: true,
                datesSet: this.handleMonthChange,
                eventClick: this.eventClick,
                selectable: false,
                selectMirror: true,
                eventContent: (arg) => {
                    return {
                        html: arg.event.title
                    }
                }
            }
        },
        ...permissions
    },
    methods: {
        ...mapMutations('main/metrics', [
            'setState',
            'resetMetricsInput'
        ]),
        ...mapActions('main/metrics', [
            'fetchEntry'
        ]),
        async handleMonthChange(payload) {
            const month = payload.view.currentStart;
            const therange = this.firstLastMonthDate(month);
            if(this.state.entry.filter.start!=therange.start) {
                this.setState({ handle: 'state.entry.filter', key: 'start', value: therange.start });
                this.setState({ handle: 'state.entry.filter', key: 'end', value: therange.end });
                this.setState({ handle: 'state', key: 'editmode', value: false });
                await this.fetchEntry();
            }
        },
        eventClick(info) {
            if(!this.permissionCheck(this.permissions.manage)) {
                return false;
            }
            info.jsEvent.preventDefault();
            info.jsEvent.stopPropagation();
            this.$router.push(`/metrics?uid=${info.event.extendedProps.data.uid}`);
        }
    }
}
</script>