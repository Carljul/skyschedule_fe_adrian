<template>
    <div class="chat-media-files-container fixed z-50 bg-opacity-40 w-full h-full bg-black top-0 left-0 flex">
        <div class="chat-media-files w-96 bg-white m-auto rounded-lg relative">
            <div @click="openMediaFilesFunction" class="chat-files-close-btn absolute top-1 right-1 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
            <div class="p-5">
                <div class="modal-details">
                    <h3 class="profile-name text-xl">{{ user_selected_data.user.full_name }}</h3>
                    <h6 class="job-title text-sm text-gray-600">{{ user_selected_data.user.position.position }}</h6>
                </div>
                <div class="files-content bg-gray-100 rounded-lg mt-5 pt-3">
                    <div class="files-title px-3 pb-2 border-b border-gray-300">
                        <h3 class="text-lg">Files</h3>
                    </div>
                    <div class="files-content-limit">
                        <div v-for="data in state.group_message_files" :key="data.id" class="file-uploaded cursor-pointer px-3 py-2 transition ease-in-out hover:bg-gray-200 pr-20 relative">
                            <a :href="data.path" download class="flex items-center">
                                <div class="file-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                    </svg>
                                </div>
                                <div class="file-details ml-2">
                                    <div class="file-name">
                                        <p>{{ data.name }}</p>
                                    </div>
                                    <div class="file-date-upload">
                                        <p class="text-sm text-gray-600">
                                            <span>{{ data.date_uploaded }}</span>
                                            <span class="ml-1">{{ data.readsize }}</span>
                                        </p>
                                    </div>
                                </div>
                            </a>
                            <div class="absolute right-3 top-0 h-full flex items-center">
                                <span @click="show_remove_files_function(data.uid)">
                                    Remove 
                                </span>
                            </div>                           
                        </div>
                        <removefilesmodal v-if="show_remove_files" :show_remove_files_function="show_remove_files_function" :remove_id="remove_id"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.files-content-limit{
    max-height: 300px;
    overflow-y: scroll;
}
</style>
<script>
import removefilesmodal from "@page_components/messages/removefilesmodal.vue";
import { mapState, mapMutations, mapActions } from "vuex";
export default {  
    props: ['openMediaFilesFunction', 'user_selected_data'],
    components: {
        removefilesmodal
    },
    computed: {
        ...mapState({
            state: state => state.group_messages.room_messages.state
        }),
    },
    data(){
        return {
            show_remove_files: false,
            vfor_sample: [{
                id: 1,
                name: "Sample File Upload.zip",
                size: "100 KB",
                date: "Dec. 25, 2022"
            }, {}, {}, {}, {}, {}, {}, {}],
        }
    },
    async mounted() {
        console.log("user_selecteduser_selecteduser_selected", this.user_selected_data);
        await this.fetchByUID(this.$route.params.uid);
        console.log(this.state);
    },
    methods: {
        ...mapMutations('group_messages/room_messages', [
            'setState'
        ]),
        ...mapActions('group_messages/room_messages', [
            'fetchByUID',
        ]),
        show_remove_files_function(remove_id) {
            this.remove_id = remove_id;
            this.show_remove_files = !this.show_remove_files;
        }
    }
}
</script>