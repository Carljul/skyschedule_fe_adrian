<template>
    <div class="messages-page">
        <div class="mt-5">
            <h3 class="text-lg mb-3 --text-heading font-semibold">Messages</h3>
            <breadcrumbs
            :lists="[
                { text: 'Messages', link: '/messages' },
                { text: 'Jundell Agbo' },
            ]"
            />
        </div>

        <div class="w-full" style="height: calc(100vh - 22vh);">
            <div class="flex h-full">
                <div class="flex-1 w-full h-full">
                    <div class="main-body h-full flex flex-col">
                        
                        <chatstatus />
        
                        <div class="main flex-1 flex flex-col">
                            <div class="flex-1 flex h-full">
                                <!-- <div class="sidebar hidden lg:flex w-1/4 flex-2 flex-col pr-6"> -->
                                <div class="sidebar  flex w-1/4 flex-2 flex-col pr-6">
                                    <div @click="closeBtnFunction()" class="block xl:hidden close-mobile-menu-nav">
                                        <div class="cursor-pointer w-fit mx-auto mr-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </div>
                                    </div>
                                    <chatsearch />
                                    <chatrooms :openAddChannelFunction="openAddChannelFunction"/>
                                </div>
                                
                                <div class="chat-area flex-1 flex flex-col">
                                    <chatheader :openMediaFilesFunction="openMediaFilesFunction" :openMediaFilesFunctionDirect="openMediaFilesFunctionDirect" />
                                    <chatmessages />
                                    <chatbox />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <filesmodal v-if="openMediaFiles" :openMediaFilesFunction="openMediaFilesFunction" :user_selected_data="user_selected_data"/>
        <addgroupmodal v-if="openAddChannel" :openAddChannelFunction="openAddChannelFunction"/>
    </div>
</template>
<style scoped>
@media (max-width: 1025px){
    .sidebar {
        position: fixed;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        z-index: 11111111111;
        background: #fff;
        padding: 10px;
        transition: 0.5s;
    }
    body.open-navigation-mobile .sidebar {
        left: 0;
    }
}
</style>
<script>
import Breadcrumbs from "@components/reusables/Breadcrumbs.vue";
import chatrooms from "@page_components/messages/rooms.vue";
import chatmessages from "@page_components/messages/messages.vue";
import chatbox from "@page_components/messages/form.vue";
import chatstatus from "@page_components/messages/status.vue";
import chatsearch from "@page_components/messages/search.vue";
import chatheader from "@page_components/messages/header.vue";
import filesmodal from "@page_components/messages/filesmodal.vue";
import addgroupmodal from "@page_components/messages/addgroupmodal.vue";
export default {
    name: "MessageRoomPage",
    layout: "main",
    middleware: ['auth'],
    components: {
        Breadcrumbs,
        chatrooms,
        chatmessages,
        chatbox,
        chatstatus,
        chatsearch,
        chatheader,
        filesmodal,
        addgroupmodal
    },
    data() {
        return {
            openMediaFiles: false,            
            openAddChannel: false,
            user_selected_data: [],
        }
    },
    methods:{
        closeBtnFunction(){
            if(document.body.classList.contains("open-navigation-mobile")){
                document.body.classList.remove("open-navigation-mobile");
            }else{
                document.body.classList.add("open-navigation-mobile");
            }
        },
        openMediaFilesFunction(){
            this.openMediaFiles = !this.openMediaFiles;
        },
        openMediaFilesFunctionDirect(dataFile){
            console.log(dataFile);
            this.user_selected_data = dataFile;
            this.openMediaFiles = !this.openMediaFiles;
        },
        openAddChannelFunction(){
            this.openAddChannel = !this.openAddChannel;
        },
    }
}
</script>