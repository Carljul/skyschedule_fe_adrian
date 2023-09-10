<template>
    <div class="chat-media-files-container fixed z-50 bg-opacity-40 w-full h-full bg-black top-0 left-0 flex">
        <div class="chat-media-files w-96 bg-white m-auto rounded-lg relative">
            <div @click="opeRemoveMemberFunction" class="chat-files-close-btn absolute top-1 right-1 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
            <div class="p-5">
                <div class="modal-details">
                    <h3 class="profile-name text-xl">Remove Member</h3>
                </div>
                <div>
                    <div>
                        <div class="mt-2">
                            <button @click="removeFile" class="relative  p-3 text-sm px-4 text-white rounded btn --bg-primary --bg-primary-hover mt-1">Remove</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {  
    props: ['opeRemoveMemberFunction', 'remove_member_uid'],
    computed: {
        ...mapState({
            state: state => state.group_messages.group_messages_users.state
        }),
    },
    methods: {
        ...mapMutations('group_messages/group_messages_users', [
            'setState'
        ]),
        ...mapActions('group_messages/group_messages_users', [
            'removeMemberEntry',
            'fetchGroupMembers',
        ]),
        async removeFile(){
            console.log("REMOVE UID", this.remove_member_uid);
            await this.removeMemberEntry(this.remove_member_uid);
            this.opeRemoveMemberFunction();
            await this.fetchGroupMembers(this.$route.params.uid);
            // await this.fetchByUID(this.$route.params.uid);
        }
    }
}
</script>