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
            state: state => state.main.events.state
        }),
        ...mapGetters('main/events', [
            'getEventLists'
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
                //timeZone: this.getTimezone,
                events: this.getEventLists,
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
        ...mapMutations('main/events', [
            'setState',
            'resetInputs'
        ]),
        ...mapActions('main/events', [
            'fetchEntry'
        ]),
        async handleMonthChange(payload) {
            const month = payload.view.currentStart;
            const therange = this.firstLastMonthDate(month);
            if(this.state.entry.filter.start!=therange.start) {
                this.setState({ handle: 'state.entry.filter', key: 'start', value: therange.start });
                this.setState({ handle: 'state.entry.filter', key: 'end', value: therange.end });
                await this.fetchEntry();
            }
        },
        eventClick(info) {
            if(!this.permissionCheck(this.permissions.manage) || !info.event.extendedProps.data) {
                return false;
            }
            info.jsEvent.preventDefault();
            info.jsEvent.stopPropagation();
            this.$router.push(`/events?uid=${info.event.extendedProps.data.uid}`);
        }
    }
}
</script>