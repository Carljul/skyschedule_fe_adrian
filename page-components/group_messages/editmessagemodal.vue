<template>
    <div class="chat-media-files-container fixed z-50 bg-opacity-40 w-full h-full bg-black top-0 left-0 flex">
        <div class="chat-media-files w-96 bg-white m-auto rounded-lg relative">
            <div @click="show_edit_message_function" class="chat-files-close-btn absolute top-1 right-1 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
            <div class="p-5">
                <div class="modal-details">
                    <h3 class="profile-name text-xl">Edit Message</h3>
                </div>
                <div>
                    <form ref="update_message_form" @submit.prevent="updateMessage" >
                        <div class="mt-2">
                            <!-- <input type="text" class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border" placeholder="Message"/> -->
                            <textarea ref="message_textarea" @input="e => {
                                setState({ inputs: { ...state.inputs, message: e.target.value} });
                            }" name="message" rows="1" placeholder="Type a message..." autofocus="autofocus" class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border w-full block outline-none py-4 px-4 bg-transparent resize-none" spellcheck="false"></textarea>
                        </div>
                        <div class="mt-2">
                            <button class="relative  p-3 text-sm px-4 text-white rounded btn --bg-primary --bg-primary-hover mt-1">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex"
export default {
    props:['show_edit_message_function', 'uid', 'message'],
    computed: {
        ...mapState({
            state: state => state.group_messages.room_messages.state
        }),
    },
    async mounted() {
        this.$refs.message_textarea.value = this.message
    },
    methods: {
        ...mapMutations('group_messages/room_messages', [
            'setState'
        ]),
        ...mapActions('group_messages/room_messages', [
            'updateMessageEntry',
            'fetchByUID',
        ]),
        async updateMessage(){
            console.log("Update Message");
            await this.updateMessageEntry(this.uid);
            if(this.$route.params.uid) {
                await this.fetchByUID(this.$route.params.uid);
            }
            this.show_edit_message_function();
            this.$refs.update_message_form.reset();
            
        }
    },
}
</script>