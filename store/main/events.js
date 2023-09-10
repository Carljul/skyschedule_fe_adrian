
import Vue from "vue";
import __get from "lodash.get";
import moment from "moment-timezone";

/** VUEX */

const getDefaultState = () => {
    return {
        state: {
            menu: 'calendar',
            entry: {
                loading: false,
                birthdays: [],
                events: [],
                regular_employees: [],
                annual_employees: [],
                filter: {
                    all: 1,
                    start: null,
                    end: null
                }
            },
            inputs: {
                uid: null,
                event: '',
                event_start: null,
                event_end: null,
                color: 'var(--pref-color-primary)',
                is_repeatable: 0
            }
        }
    }
};


// state
export const state = () => getDefaultState();

// getters
export const getters =  {
    getEventLists(state) {
        const ret = [];

        // events
        state.state.entry.events.map(row => {
            row.extendedProps = { data: {...row} };
            row.title = row.event;
            row.start = moment(row.event_start).format('YYYY-MM-DD');
            row.end = moment(row.event_end).format('YYYY-MM-DD');
            if(row.is_repeatable) {
                row.start = moment(row.event_start).set('year', moment(state.state.entry.filter.start).year()).format('YYYY-MM-DD');
                row.end = moment(row.event_end).set('year', moment(state.state.entry.filter.start).year()).format('YYYY-MM-DD');
            }
            row.backgroundColor = row.color;
            row.borderColor = row.color;
            row.textColor = '#ffffff';
            ret.push(row);
        });
        
        // birthdays
        state.state.entry.birthdays.map(row => {
            const eventadd = {
                textColor: '#ffffff',
                borderColor: 'var(--pref-birthday-color)',
                backgroundColor: 'var(--pref-birthday-color)',
                start: moment(row.birthday).set('year', moment(state.state.entry.filter.start).year()).format('YYYY-MM-DD'),
                end: moment(row.birthday).set('year', moment(state.state.entry.filter.start).year()).format('YYYY-MM-DD'),
                title: `<div class="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 inline mr-2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z" />
                    </svg>
                    <div>
                    <span class="data-employee-popover-editor data-employee-popover-editor --text-dark py-0.5 px-2 text-xs bg-gray-200 rounded cursor-pointer font-semibold inline" aria-expanded="false" data-uid="${row.uid}">${row.firstname} ${row.lastname}'s</span> Birthday
                    </div>
                </div>
                `
            };
            ret.push(eventadd);
        });

        // regular employees
        state.state.entry.regular_employees.map(row => {
            const eventadd = {
                textColor: '#ffffff',
                borderColor: '#26418f',
                backgroundColor: '#26418f',
                start: moment(row.date_hired).set('month', moment(state.state.entry.filter.start).month()).set('year', moment(state.state.entry.filter.start).year()).format('YYYY-MM-DD'),
                end: moment(row.date_hired).set('month', moment(state.state.entry.filter.start).month()).set('year', moment(state.state.entry.filter.start).year()).format('YYYY-MM-DD'),
                title: `<div class="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 inline mr-2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                        </svg>
                    <div>
                    <span class="data-employee-popover-editor data-employee-popover-editor --text-dark py-0.5 px-2 text-xs bg-gray-200 rounded cursor-pointer font-semibold inline" aria-expanded="false" data-uid="${row.uid}">${row.firstname} ${row.lastname}'s</span> employeed as regular
                    </div>
                </div>
                `
            }; 
            ret.push(eventadd);
        });

        // anniversary employees
        state.state.entry.annual_employees.map(row => {
            const eventadd = {
                textColor: '#ffffff',
                borderColor: '#ba2d65',
                backgroundColor: '#ba2d65',
                start: moment(row.date_hired).set('month', moment(state.state.entry.filter.start).month()).set('year', moment(state.state.entry.filter.start).year()).format('YYYY-MM-DD'),
                end: moment(row.date_hired).set('month', moment(state.state.entry.filter.start).month()).set('year', moment(state.state.entry.filter.start).year()).format('YYYY-MM-DD'),
                title: `<div class="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 inline mr-2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
                    </svg>
                    <div>
                    <span class="data-employee-popover-editor data-employee-popover-editor --text-dark py-0.5 px-2 text-xs bg-gray-200 rounded cursor-pointer font-semibold inline" aria-expanded="false" data-uid="${row.uid}">${row.firstname} ${row.lastname}'s</span> anniversay
                    </div>
                </div>
                `
            };
            ret.push(eventadd);
        });

        return ret;
    }
}

// mutations
export const mutations = {
    setState(state, payload) {
        Vue.set(__get(state, payload.handle), payload.key, payload.value);
    },
    resetInputs(state) {
        const defaultState = getDefaultState();
        state.state = {
            ...state.state, 
            inputs: defaultState.state.inputs
        };
    },
    updateEntryDataResponse(state, payload) {
        const itemIndex = state.state.entry.events.findIndex(x => x.uid === payload.uid);
        Vue.set(state.state.entry.events, itemIndex, payload);
    },
};

// actions
export const actions = {
    async fetchEntry({ state, commit }) {
        const app = this._vm;
        if(state.state.entry.loading) { return; }
        try {
            commit('setState', { handle: 'state.entry', key: 'loading', value: true });
            const res = await this.$axios.get(`/${app.getOrgUID}/events`, { 
                params: {
                    ...state.state.entry.filter
                }
            });
            commit('setState', { handle: 'state.entry', key: 'events', value: res.data.events });
            commit('setState', { handle: 'state.entry', key: 'birthdays', value: res.data.birthdays });
            commit('setState', { handle: 'state.entry', key: 'regular_employees', value: res.data.regular_employees });
            commit('setState', { handle: 'state.entry', key: 'annual_employees', value: res.data.annual_employees });

            commit('setState', { handle: 'state.entry', key: 'loading', value: false });
        } catch($e) {
            commit('setState', { handle: 'state.entry', key: 'loading', value: false });
            throw $e;
        }
    },

    async fetchByUID({commit}, payload) {
        const app = this._vm;
        if(!payload) { return; }
        try {
            const res = await this.$axios.get(`${app.getOrgUID}/events/${payload}`);
            commit('setState', { handle: 'state', key: 'inputs', value: res.data.response });
            app.$nextTick(() => {
                app.findPageComponent('MainEventsFormModal').$refs.postentrymodal.open=true;
            });
            return res.data.response;
        } catch($e) {
            return false;
        }
    },


    async postSaveEvent({ state, commit, dispatch }) {
        const app = this._vm;
        try {
            let res = null
            if(state.state.inputs.uid) {
                res = await this.$axios.put(`/${app.getOrgUID}/events/${state.state.inputs.uid}`, state.state.inputs);
                commit('updateEntryDataResponse', res.data.response);
                app.notify({ title: 'Saved!', html: 'Changes has been saved.' });
            } else {
                res = await this.$axios.post(`/${app.getOrgUID}/events`, state.state.inputs);
                app.notify({ title: 'Saved!', html: 'New metric has been added.' });
                dispatch('fetchEntry');
            }
        } catch($e) {
            throw $e;
        }
    },

    async removeEntry({ dispatch, commit }, payload) {
        const app = this._vm;
        try {
            await this.$axios.delete(`${app.getOrgUID}/events/${payload.uid}`);
            commit('resetInputs');
            dispatch('fetchEntry');
        } catch($e) {
            app.errorHandle($e);
        }
    }
};