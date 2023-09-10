import moment from 'moment-timezone';

export default {
    data() { return {
        realtimeMoment: moment(),
        realtimeMomentInterval: null,
        realtimeMomentDuration: 1000
    } },
    mounted() {
        this.initializeRealtime();
    },
    methods: {
        initializeRealtime() {
            const e = this;
            e.realtimeMomentInterval = window.setInterval( function() {
                e.realtimeMoment = moment();
            }, e.realtimeMomentDuration);
        }
    },
    beforeDestroy() {
        window.clearInterval(this.realtimeMomentInterval);
    }
}