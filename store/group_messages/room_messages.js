import defaults from "~/defaults.js";
import Vue from "vue";

/** VUEX */

const getDefaultState = () => {
    return {
        state: {
            inputs: {
                title: '',
                message: '',
                file: []
            },
            selected: null,
            group_message: null,
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
    async fetchEntry({ state, commit }) {
        const app = this._vm;
        if(state.state.entry.loading) { return; }

        try {
            commit('setState', { 
                entry: { 
                    ...state.state.entry, 
                    loading: true 
                } 
            });

            const res = await this.$axios.get(`${app.getOrgUID}/messages`, {
                params: state.state.entry.filter
                
            });
            

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

    async removeMessageEntry({ dispatch }, payload) {
        const app = this._vm;
        try {
            await this.$axios.delete(`${app.getOrgUID}/messages/${payload}`);
            dispatch('fetchEntry');
            app.notify({ title: 'Message Removed!', html: 'Changes has been saved.' });
        } catch($e) {
            app.errorHandle($e);
        }
    },

    async restoreEntry({dispatch}, payload) {
        const app = this._vm;
        try {
            await this.$axios.patch(`${app.getOrgUID}/messages/${payload.uid}`);
            dispatch('fetchEntry');
        } catch($e) {
            app.errorHandle($e);
        }
    },

    async updateMessageEntry({ state, commit }, payload) {

        const app = this._vm;
        try {
            const res = await this.$axios.put(`${app.getOrgUID}/messages/${payload}`, state.state.inputs);
            commit('updateEntryDataResponse', res.data.response);
            app.notify({ title: 'Saved!', html: 'Changes has been saved.' });
        } catch($e) {
            throw $e;
        }
    },
    
    async StoreMessageEntry({ state, commit, dispatch },payload) {
        const app = this._vm;
        try {
            
                                    
            // formData.append('file', state.state.inputs.file)
            const formData  = new FormData() 
            let TotalFiles = state.state.inputs.file.length; 
            let files = state.state.inputs.file;
            // console.log('adrian',state.state.inputs)
            // console.log('count',state.state.inputs.file)
            // console.log(files)
            for (let i = 0; i < TotalFiles; i++) {
                
                formData.append('file[]', files[i]);
            }
            formData.append('group_uid', payload)
            formData.append('message', state.state.inputs.message)
            
            console.log(formData)
            await this.$axios.post(`${app.getOrgUID}/messages?group_uid=${payload}`, formData);
            dispatch('fetchEntry');
            commit('resetInputs');
            app.notify({ title: 'Saved!', html: 'New Channel has been saved.' });
        } catch($e) {
            throw $e;
        }
    },

    async removeFileEntry({ dispatch }, payload) {
        const app = this._vm;
        try {
            await this.$axios.delete(`/uploads/${payload}`);
            dispatch('fetchByUID');
            app.notify({ title: 'File Removed!', html: 'Changes has been saved.' });
        } catch($e) {
            app.errorHandle($e);
        }
    },
}