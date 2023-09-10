<template>
    <div class="chat-media-files-container fixed z-50 bg-opacity-40 w-full h-full bg-black top-0 left-0 flex">
        <div class="chat-media-files w-96 bg-white m-auto rounded-lg relative">
            <div @click="show_remove_message_function" class="chat-files-close-btn absolute top-1 right-1 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
            <div class="p-5">
                <div class="modal-details">
                    <h3 class="profile-name text-xl">Remove Message</h3>
                </div>
                <div>
                    <div>
                        <div class="mt-2">
                            <button @click="removeMessage" class="relative  p-3 text-sm px-4 text-white rounded btn --bg-primary --bg-primary-hover mt-1">Remove</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex"
export default {
    props:['show_remove_message_function', 'uid'],
    methods: {
        ...mapMutations('group_messages/room_messages', [
            'setState'
        ]),
        ...mapActions('group_messages/room_messages', [
            'removeMessageEntry',
            'fetchByUID',
        ]),
        async removeMessage(){
            try {
                // this.$refs.newdepartment_btn.loading = true;
                await this.removeMessageEntry(this.uid);
                // this.$refs.newdepartment_btn.loading = false;
                // this.$refs.modal_newdepartment.open = false;
                if(this.$route.params.uid) {
                    await this.fetchByUID(this.$route.params.uid);
                }
            } catch($e) {
                this.errorHandle($e, 'newdepartment');
                // this.$refs.newdepartment_btn.loading = false;
            }
        }
    }
}
</script>