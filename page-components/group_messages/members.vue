<template>
    <div class="files-content bg-gray-100 rounded-lg mt-5 pt-3">
        <div class="files-title px-3 pb-2 border-b border-gray-300 relative">
            <h3 class="text-lg relative">
                <span>Members</span>
                <span @click="opeAddMemberFunction" class="absolute right-0 top-0 cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path></svg></span>
            </h3>
        </div>
        <div class="members-content-limis">
            <div v-for="data in state.group_members" :key="data.id" class="file-uploaded cursor-pointer px-3 py-2 transition ease-in-out hover:bg-gray-200 relative">
                <div class="flex items-center relative">
                    <div class="file-details ml-2 pr-20">
                        <div class="file-name">
                            <p>{{ data.user.name }}</p>
                        </div>
                        <div class="file-date-upload">
                            <p class="text-sm text-gray-600">{{ data.user.email }}</p>
                        </div>
                        <div class="member-remove absolute top-0 right-0 cursor-pointer h-full flex items-center">
                            <p @click="opeRemoveMemberFunction(data.uid)">Remove</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.members-content-limis{
    max-height: 200px;
    overflow-y: scroll;
}
</style>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {  
  props: ['opeRemoveMemberFunction', 'opeAddMemberFunction'],
    computed: {
        ...mapState({
            state: state => state.group_messages.group_messages_users.state
        }),
    },
  data(){
    return {
        vfor_sample:[
            {
                "id": 1,
                "name": "Joseph Sayon"
            },{},{},{},{},{},{},{}
        ],
    }
  },
    async mounted() {
        await this.fetchGroupMembers(this.$route.params.uid);
        console.log("MEMBERS STATE", this.state);
    },
    methods: {
        ...mapMutations('group_messages/group_messages_users', [
            'setState'
        ]),
        ...mapActions('group_messages/group_messages_users', [
            'fetchGroupMembers',
        ]),
        show_remove_files_function(remove_id) {
            this.remove_id = remove_id;
            this.show_remove_files = !this.show_remove_files;
        }
    }
}
</script>
    