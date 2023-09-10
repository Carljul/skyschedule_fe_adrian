import defaults from "~/defaults.js";
import Vue from "vue";

/** VUEX */

const getDefaultState = () => {
    return {
        state: {
            inputs: {
                title: '',
            },
            selected_group: null,
            messages: null,
            entry: {
                data: [],
                loading: false,
                pagination: {},
                filter: {
                    query: '',
                    page: 1,
                    limit: defaults.limit,
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
        state.state = {...state.state, inputs: defaultState.state.inputs};
    },
    updateEntryDataResponse(state, payload) {
        const itemIndex = state.state.entry.data.findIndex(x => x.uid === payload.uid);
        Vue.set(state.state.entry.data, itemIndex, payload);
    }
}


// actions
export const actions = {
    async fetchGroup({commit}, payload) {
        const app = this._vm;
        if(!payload) { return; }
        try {
            const res = await this.$axios.get(`${app.getOrgUID}/groups/${payload}`);
            // const res = await this.$axios.get(`${app.getOrgUID}/employees/from=${payload}to=2e3e7586-e709-4605-ba17-83f0b717db13`);            
            console.log("payload",res.data);
            console.log("app.getOrgUID", app.getOrgUID);
            commit('setState', {
                selected_group: {
                    ...res.data.response
                }
            });
            console.log("state", this.state);

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


            const res = await this.$axios.get(`${app.getOrgUID}/messages?to=${payload}`);
            // const res = await this.$axios.get(`${app.getOrgUID}/messages?from=${payload}&to=437e4234-4e11-46d1-9e9b-7a0fe9a3e446`);
            console.log("res herader", res);

            commit('setState', {
                messages: {
                    ...res.data.data
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
    async fetchByUID({commit}, payload) {
        const app = this._vm;
        if(!payload) { return; }
        try {
            // console.log("TESTING SHUSHUHUHU")
            const res = await this.$axios.get(`${app.getOrgUID}/messages/?group_uid=${payload}`);

            let files_data = [];
            
            for(var i = 0; i < res.data.data.length; i++){
                for(var x = 0; x < res.data.data[i].message_meta.length; x++){
                    var message_meta_data = res.data.data[i].message_meta[x];
                    var dic_array = {};
                    

                    var files_array = message_meta_data.files;
                    console.log("files_array.length", files_array.length);
                    for(var xx = 0; xx < files_array.length; xx++){
                        dic_array.id = message_meta_data.id;
                        dic_array.name = files_array[xx].filename;
                        dic_array.date_uploaded = files_array[xx].date_uploaded;
                        dic_array.path = files_array[xx].path;
                        dic_array.readsize = files_array[xx].readsize;
                        dic_array.uid = files_array[xx].uid;
                        
                        files_data.push(dic_array);
                    }                    
                }
            }
            
            commit('setState', {
                group_message: {
                    ...res.data.data,
                },
                group_message_files: {
                    ...files_data,
                },
            });
            // app.$nextTick(() => {
            //     app.findPageComponent('EmployeesDepartmentsEdit').$refs.modal_editentry.open=true;
            // });
            
            return res.data.response;
        } catch($e) {
            return false;
        }
    },
    async StoreMessageEntry({ state, commit, dispatch },payload) {
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
                                    
            formData.append('group_uid', payload)
            formData.append('message', state.state.inputs.message)
            // console.log('state',state)
            // console.log('form data',formData)
            await this.$axios.post(`${app.getOrgUID}/messages?group_uid=${payload}`, formData);
            dispatch('fetchEntry');
            commit('resetInputs');
            app.notify({ title: 'Message Sent!', html: '' });
            

            
            // await this.$axios.post(`${app.getOrgUID}/messages`, state.state.inputs);
            // dispatch('fetchMessages');
            // // commit('resetInputs');
            // app.notify({ title: 'Message Sent!', html: '' });
        } catch($e) {
            console.log($e)
            throw $e;
        }
    },
    async fetchGroupMembers({commit}, payload) {
        const app = this._vm;
        if(!payload) { return; }
        try {
            const res = await this.$axios.get(`${app.getOrgUID}/group_members?group_uid=${payload}`);
            // const res = await this.$axios.get(`${app.getOrgUID}/employees/from=${payload}to=2e3e7586-e709-4605-ba17-83f0b717db13`);            
            console.log("MEMBER PAYLOAD",res.data);
            // console.log("app.getOrgUID", app.getOrgUID);
            commit('setState', {
                group_members: {
                    ...res.data.data
                }
            });
            // console.log("state", this.state);

            // app.$nextTick(() => {
            //     app.findPageComponent('EmployeesDepartmentsEdit').$refs.modal_editentry.open=true;
            // });
            return res.data.data;
        } catch($e) {
            return false;
        }
    },
    async AddGroupMember({ state, commit, dispatch }, payload) {
        const app = this._vm;
        try {
            console.log("Add group member", state.state.inputs);
            console.log("MEMBER PAYLOAD", payload);
            await this.$axios.post(`${app.getOrgUID}/group_members/`, state.state.inputs);
            dispatch('fetchMessages');
            // commit('resetInputs');
            app.notify({ title: 'Saved!', html: 'New Member has been saved.' });
        } catch($e) {
            throw $e;
        }
    },
    async removeMemberEntry({ dispatch }, payload) {
        const app = this._vm;
        try {
            await this.$axios.delete(`${app.getOrgUID}/group_members/${payload}`);
            dispatch('fetchGroupMembers');
            app.notify({ title: 'Member Removed!', html: 'Changes has been saved.' });
        } catch($e) {
            app.errorHandle($e);
        }
    },
}