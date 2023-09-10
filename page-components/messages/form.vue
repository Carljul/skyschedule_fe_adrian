<template>
    <div class="flex-2 pt-4 pb-10">
        <div v-if="number_of_files > 0" class="files-contents-to-upload w-full">
                <span>
                    {{ number_of_files }} files will be uploaded.
                </span>
            </div>
        <form ref="message_form" @submit.prevent="addMessage" class="write flex-wrap bg-white shadow flex rounded-lg">            
            <!-- <div class="flex-3 flex content-center items-center text-center p-4 pr-0">
                <span class="block text-center text-gray-400 hover:text-gray-800">
                    <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24" class="h-6 w-6"><path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </span>
            </div> -->
            <div class="flex-1">
               
                <textarea ref="message_textarea" @input="e => {
                    setState({ inputs: { ...state.inputs, message: e.target.value, to: $route.params.uid } });
                }" name="message" rows="1" placeholder="Type a message..." autofocus="autofocus" class="w-full block outline-none py-4 px-4 bg-transparent resize-none text-xs --text-dark mt-1" spellcheck="false"></textarea>
                <!-- <textarea name="message" class="w-full block outline-none py-4 px-4 bg-transparent resize-none text-xs --text-dark mt-1" rows="1" placeholder="Type a message..." autofocus></textarea> -->
            </div>
            <div class="flex-2 w-32 p-2 flex content-center items-center">
                <div class="flex-1 text-center">
                    <span class="text-gray-400 hover:text-gray-800">
                        <span @click="open_file_type" class="cursor-pointer inline-block align-text-bottom">
                            <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24" class="w-6 h-6"><path d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
                        </span>
                        <input @change="getFiles"                        
                        @input="e => {
                            setState({ inputs: { ...state.inputs, file: e.target.files } });
                        }"
                        class="hidden" type="file" multiple name="message_file_upload" ref="message_file_upload"/>
                        <!-- <input @change="getFiles"                        
                        @input="e => {
                            setState({ inputs: { ...state.inputs, file: e.target.files } });
                        }"
                        class="hidden" type="file" multiple name="message_file_upload" ref="message_file_upload"/> -->
                    </span>
                </div>
                <div class="flex-1">
                    <async-button class="bg-blue-400 w-10 h-10 rounded-full inline-block">
                        <span class="inline-block align-text-bottom">
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-4 h-4 text-white"><path d="M5 13l4 4L19 7"></path></svg>
                        </span>
                    </async-button >
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import AsyncButton from "@components/reusables/AsyncButton.vue";
import Modal from "@components/reusables/Modal.vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import VMsg from "@components/reusables/VeeMessage.vue";
import DropzoneMin from "@components/reusables/DropZoneMin.vue";

import { mapState, mapMutations, mapActions } from "vuex"
export default {
    name: 'MessagesForm',
    components: {
        AsyncButton,
        Modal,
        ValidationProvider,
        ValidationObserver,
        VMsg,
        DropzoneMin
    },
    data(){
        return{
            number_of_files: 0,
            readyFiles: [],
        }
    },
    computed: {
        ...mapState({
            state: state => state.messages.direct_messages_users.state
        }),
    },
    methods: {
        ...mapMutations('messages/direct_messages_users', [
            'setState'
        ]),
        ...mapActions('messages/direct_messages_users', [
            'StoreMessageEntry',
            'fetchMessages',
        ]),
        async addMessage() {
            try {
                // this.$refs.newdepartment_btn.loading = true;
                await this.StoreMessageEntry();
                // this.$refs.newdepartment_btn.loading = false;
                // this.$refs.modal_newdepartment.open = false;
                if(this.$route.params.uid) {
                    await this.fetchMessages(this.$route.params.uid);
                }
                this.$refs.message_form.reset();
            } catch($e) {
                this.errorHandle($e, 'newdepartment');
                // this.$refs.newdepartment_btn.loading = false;
            }
        },        
        getApi() {
            if(!this.api) { return `/uploads`; }
            return this.api;
        },
        open_file_type(){
            this.$refs.message_file_upload.click();
        },
        previewFiles(event){
            this.number_of_files = event.target.files.length;
        },
        
        getnofiltercurpath() {
            return !this.nofiltercurpath;
        },
        getReadyFiles() {
            console.log("READDDD FUIKLE",this.readyFiles);
            return this.readyFiles.filter(row => !row.done).sort((a, b) => a.progress - b.progress);
        },
        async getFiles(e) {
            console.log("test");
        },
        
        getMimes() {
            if(!this.mimes) {
                return [
                    'image/jpg',
                    'image/jpeg',
                    'image/png',
                    'image/gif',
                    'image/svg',
                    'video/mp4',
                    'audio/mp3',
                    'application/pdf',
                    'application/doc',
                    'application/docx'
                ].join(',');
            }
            return this.mimes.join(',');
        },

    }
}
</script>