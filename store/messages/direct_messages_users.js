import defaults from "~/defaults.js";
import Vue from "vue";

/** VUEX */

const getDefaultState = () => {
    return {
        state: {
            inputs: {
                title: '',
            },
            selected: null,
            messages: null,
            entry: {
                data: [],
                loading: false,
                pagination: {},
                filter: {
                    query: '',
                    page: 1,
                    // limit: defaults.limit,
                    limit: 200,
                    with_trashed: null,
                    only_trashed: null,
                }
            }
        }
    }
};

// state
export const state = () => getDefaultState();


// mutations
export const mutations = {
    setState(state, payload) {
        state.state = {
            ...state.state,
            ...payload
        };
    },
    resetInputs(state) {
        const defaultState = getDefaultState();
        console.log("DETAULF STATE", defaultState);
        state.state = {...state.state, inputs: defaultState.state.inputs};
    },
    updateEntryDataResponse(state, payload) {
        const itemIndex = state.state.entry.data.findIndex(x => x.uid === payload.uid);
        Vue.set(state.state.entry.data, itemIndex, payload);
    }
}


// actions
export const actions = {
    async fetchOnlineUsers({ state, commit }) {
        const app = this._vm;
        if(state.state.entry.loading) { return; }

        try {
            commit('setState', { 
                entry: { 
                    ...state.state.entry, 
                    loading: true 
                } 
            });

            const res = await this.$axios.get(`${app.getOrgUID}/employees`, {
                params: state.state.entry.filter                
            });
            console.log("DIRECT MESSAGE", res);

            commit('setState', { 
                entry: { 
                    ...state.state.entry, 
                    data: res.data.data, 
                    pagination: res.data.pagination, 
                    loading: false 
                }
            });

        } catch($e) {

            commit('setState', { 
                entry: { 
                    ...state.state.entry, 
                    loading: false 
                } 
            });

        }
    },
    async fetchSingleUser({state, commit}, payload) {
        const app = this._vm;
        if(!payload) { return; }
        try {
            console.log("FETCH SINGLE USER SSSSSSSSS", payload);
            const res1 = await this.$axios.get(`${app.getOrgUID}/employees`, {
                params: payload
            });
            // const res = await this.$axios.get(`${app.getOrgUID}/employees/${payload}`);
            // const res = await this.$axios.get(`${app.getOrgUID}/employees/from=eefb618b-9d76-4323-9d36-4491d555e9d4&to=2e3e7586-e709-4605-ba17-83f0b717db13`);            
            console.log("DIRECT MESSAGE SSSSSSSSS", res1.data.data);
            let data_set = JSON.parse(JSON.stringify(res1.data.data));
            let selected_data;
            for(let i = 0; i < data_set.length; i++){
                if(data_set[i].user_uid == payload){
                    selected_data = data_set[i];
                }
            }
            console.log("payloadpayloadpayload", payload);
            
            commit('setState', {
                user_selected: {
                    ...state.state.user_selected,
                    user: selected_data,
                }
            });
            // app.$nextTick(() => {
            //     app.findPageComponent('EmployeesDepartmentsEdit').$refs.modal_editentry.open=true;
            // });
            return res.data.response;
        } catch($e) {
            return false;
        }
    },    
    async fetchMessages({commit}, payload) {
        const app = this._vm;
        if(!payload) { return; }
        try {
            console.log("payload", payload);


            const res = await this.$axios.get(`${app.getOrgUID}/messages?user=${payload}`);
            // const res = await this.$axios.get(`${app.getOrgUID}/messages?from=${payload}&to=437e4234-4e11-46d1-9e9b-7a0fe9a3e446`);
            console.log("res herader", res);

            commit('setState', {
                messages: {
                    ...res.data.data
                }
            });

            this.$echo.channel('ChatNotificationChannel')
            .listen('ChatNotificationEvent', (e) => {                
                console.log('adrian');
            }); 
            // app.$nextTick(() => {
            //     app.findPageComponent('EmployeesDepartmentsEdit').$refs.modal_editentry.open=true;
            // });
            return res.data.response;
        } catch($e) {
            return false;
        }
    },
    async StoreMessageEntry({ state, commit, dispatch }) {
        const app = this._vm;
        try {
            console.log(state)
            // formData.append('file', state.state.inputs.file)
            const formData  = new FormData() 

            if(state.state.inputs.file){
                // console.log("StoreMessageEntry", state.state.inputs);
                // console.log('adrian',state.state.inputs)
                // console.log('count',state.state.inputs.file)
                
                let TotalFiles = state.state.inputs.file.length; 
                let files = state.state.inputs.file;
                
                for (let i = 0; i < TotalFiles; i++) {
                    console.log('yaa',files[i])
                    formData.append('file[]', files[i]);
                }
            }
                                    
            formData.append('to', state.state.inputs.to)
            formData.append('message', state.state.inputs.message)
            await this.$axios.post(`${app.getOrgUID}/messages`, formData);
            dispatch('fetchMessages');
            commit('resetInputs');
            app.notify({ title: 'Message Sent!', html: '' });
        } catch($e) {
            throw $e;
        }
    },
    async removeMessageEntry({commit}, payload) {
        const app = this._vm;
        if(!payload) { return; }
        try {
            console.log("payload SSSS", payload);


            // const res = await this.$axios.get(`${app.getOrgUID}/messages?to=${payload}`);
            await this.$axios.delete(`${app.getOrgUID}/messages/${payload}`);
            // const res = await this.$axios.get(`${app.getOrgUID}/messages?from=${payload}&to=437e4234-4e11-46d1-9e9b-7a0fe9a3e446`);
            // console.log("res herader", res);

            // commit('setState', {
            //     messages: {
            //         ...res.data.data
            //     }
            // });
            // app.$nextTick(() => {
            //     app.findPageComponent('EmployeesDepartmentsEdit').$refs.modal_editentry.open=true;
            // });
            return res.data.response;
        } catch($e) {
            return false;
        }
    },
    async updateMessageEntry({state, commit, dispatch}, payload) {
        const app = this._vm;
        if(!payload) { return; }
        try {
            console.log("Update MessageEntry", state.state.inputs);
            console.log("Update payload SSSS", payload);

            const res = await this.$axios.put(`${app.getOrgUID}/messages/${payload}`, state.state.inputs);
            // const res = await this.$axios.get(`${app.getOrgUID}/messages?to=${payload}`);
            // await this.$axios.delete(`${app.getOrgUID}/messages/${payload}`);
            // const res = await this.$axios.get(`${app.getOrgUID}/messages?from=${payload}&to=437e4234-4e11-46d1-9e9b-7a0fe9a3e446`);
            // console.log("res herader", res);

            // commit('setState', {
            //     messages: {
            //         ...res.data.data
            //     }
            // });
            // app.$nextTick(() => {
            //     app.findPageComponent('EmployeesDepartmentsEdit').$refs.modal_editentry.open=true;
            // });
            return res.data.response;
        } catch($e) {
            return false;
        }
    },
    async TESTMessageEntry({ state, commit, dispatch }) {
        const app = this._vm;
        try {
            console.log("StoreMessageEntry", state.state.inputs);
            await this.$axios.post(`${app.getOrgUID}/messages`, state.state.inputs);
            const res = await this.$axios.put(`${app.getOrgUID}/employees/${state.state.selected.uid}`, getters.updateParams);
            dispatch('fetchMessages');
            commit('resetInputs');
            app.notify({ title: 'Saved!', html: 'New Department has been saved.' });
        } catch($e) {
            throw $e;
        }
    },
}