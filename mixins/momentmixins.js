import Vue from "vue";
import defaults from "~/defaults.js";

import moment from 'moment-timezone';

const momentmixins = {
    computed: {
        is24hours() {
            return this.$store.state.global.state.preference.is24hour;
          },
          datemask() {
            return 'YYYY-MM-DD';
          },
          datetimeformat() {
            return 'YYYY-MM-DD HH:mm:ss';
          },
          datetimemask() {
            if(this.is24hours) {
              return `YYYY-MM-DD ${this.timemask}`;
            }
            return `YYYY-MM-DD ${this.timemask}`;
        },
        timemask() {
          if(this.is24hours) {
            return 'HH:mm' 
          }
          return 'h:mm A'
        },
        getTimezone() {
          const user = this.$nuxt.$auth.user;
          if(user.admin && user.user_type == defaults.usertypes[0]) {
            return user.admin.organization.timezone;
          }
          if(user.user_type == defaults.usertypes[1]) {
            return user.organization.timezone;
          }
          if(user.user_type == defaults.usertypes[2]) {
            return user.employee.organization.timezone;
          }
          return defaults.timezone;
        },
    },
    methods: {
          $momentdatestandard(momentdate) {
            return momentdate.format('L');
          },
          $momentdatetime(momentdate) {
            return momentdate.format(this.datetimeformat);
          },
          $momenttime(momentdate) {
            return momentdate.format(this.is24hours ? 'HH:mm' : 'hh:mm A');
          },
          $momentdatefull(momentdate) {
            return momentdate.format(`L ${this.is24hours ? 'HH:mm' : 'h:mm A'}`);
          },
          firstLastMonthDate($date) {
            const momentdate = moment($date);
            return {
              start: moment(momentdate.startOf('month')).format(this.datetimeformat),
              end: moment(momentdate.endOf('month')).format(this.datetimeformat)
            }
        }
    }
}

Vue.mixin(momentmixins);