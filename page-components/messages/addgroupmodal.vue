<template>
    <div class="chat-media-files-container fixed z-50 bg-opacity-40 w-full h-full bg-black top-0 left-0 flex">
        <div class="chat-media-files w-96 bg-white m-auto rounded-lg relative">
            <div @click="openAddChannelFunction" class="chat-files-close-btn absolute top-1 right-1 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
            <div class="p-5">
                <div class="modal-details">
                    <h3 class="profile-name text-xl">Add Channel</h3>
                </div>
                <div>
                    <form ref="add_group_form" @submit.prevent="addGroup">
                        <div class="mt-2 mb-2">
                            <input @input="e => {
                                setState({ inputs: { ...state.inputs, title: e.target.value } });
                            }" type="text" class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border" placeholder="Channel Name" />
                        </div>
                        <ValidationProvider ref="newentry_user_uid" name="Department" v-slot="{ validate, errors }" rules="required">
                            <div class="form-group-wrap mb-3">
                                <label class="mb-2 block text-xs font-medium --text-dark">Employee</label>
                                <client-only>
                                    <t-select-dynamic 
                                    :endpoint="`${getOrgUID}/employees`" 
                                    datakeylabel="full_name"
                                    datakeyvalue="user_uid"
                                    searchplaceholder="Type to Search Employee"
                                    placeholder="Choose Employee"
                                    class="py-1.5"
                                    multiple="true"
                                    v-vchecker="errors[0]"
                                    @input="e => setState({ inputs: { ...state.inputs, users: e } })"
                                    ></t-select-dynamic>
                                    <input type="hidden" 
                                    :value="state.inputs.users" 
                                    @input="e => {
                                        setState({ inputs: { ...state.inputs, users: e.target.value } }); 
                                        validate(e); 
                                    }">
                                </client-only>
                                <v-msg :error="errors[0]" />
                            </div>
                        </ValidationProvider>
                        <div class="mt-2">
                            <button class="relative  p-3 text-sm px-4 text-white rounded btn --bg-primary --bg-primary-hover mt-1">Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import TSelectDynamic from "@components/reusables/SelectDynamic.vue";
import { mapState, mapMutations, mapActions } from "vuex";
export default {  
    props: ['openAddChannelFunction', 'addGroup'],
    components: {
        TSelectDynamic,
        ValidationProvider,
        ValidationObserver,

    },
    computed: {
        ...mapState({
            state: state => state.messages.rooms.state
        }),
    },
    methods: {
        ...mapMutations('messages/rooms', [
            'setState'
        ]),
        ...mapActions('messages/rooms', [
            'StoreInsertEntry',
            'fetchEntry',
        ]),
        async addGroup(){
            console.log("Update Message");
            await this.StoreInsertEntry();
            await this.fetchEntry();
            this.openAddChannelFunction();
            // if(this.$route.params.uid) {
            //     await this.fetchMessages(this.$route.params.uid);
            // }
            // this.show_edit_message_function();
        }
    },
}
</script>