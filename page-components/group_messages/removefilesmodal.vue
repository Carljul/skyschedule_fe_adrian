<template>
    <div class="chat-media-files-container fixed z-50 bg-opacity-30 w-full h-full bg-black top-0 left-0 flex">
        <div class="chat-media-files w-96 bg-white m-auto rounded-lg relative">
            <div @click="show_remove_files_function" class="chat-files-close-btn absolute top-1 right-1 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
            <div class="p-5">
                <div class="modal-details">
                    <h3 class="profile-name text-xl">Remove File</h3>
                </div>
                <div>
                    <form>
                        <div class="mt-2">
                            <a @click="removeFile" href="javascript:void(0)" class="relative  p-3 text-sm px-4 text-white rounded btn --bg-primary --bg-primary-hover mt-1">Remove</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {  
    props: ['show_remove_files_function', 'remove_id'],
    computed: {
        ...mapState({
            state: state => state.group_messages.room_messages.state
        }),
    },
    methods: {
        ...mapMutations('group_messages/room_messages', [
            'setState'
        ]),
        ...mapActions('group_messages/room_messages', [
            'removeFileEntry',
            'fetchByUID',
        ]),
        async removeFile(){
            console.log("REMOVE", this.remove_id);
            await this.removeFileEntry(this.remove_id);
            this.show_remove_files_function();
            await this.fetchByUID(this.$route.params.uid);
        }
    }
}
</script>