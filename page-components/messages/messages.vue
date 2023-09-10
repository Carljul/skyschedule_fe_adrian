<template>
    <div class="chat-messages-wrap flex-1 p:2 sm:px-6 sm:pt-0 justify-between flex overflow-y-auto flex-col-reverse" style="max-height: calc(100vh - 43vh);">
        <div class="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch pt-12 flex-col-reverse">
            <div class="chat-message-main-container mt-0" v-for="message in state.messages" :key="message.id">
                <div v-if="message.to != $route.params.uid" class="chat-message mt-6">
                    <div class="flex items-end">
                        <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                            <div class="relative pr-5">
                                <span class="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">{{ message.message }}</span>
                                <!-- <messageoptions/> -->
                            </div>
                        </div>
                        <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" class="w-6 h-6 rounded-full order-1">
                    </div>
                </div>
                <div v-if="message.to == $route.params.uid" class="chat-message mt-6 w-fit ml-auto mr-0">
                    <div class="flex items-end">
                        <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                            <div class="relative pr-5">
                                <span class="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">{{ message.message }}</span>                                
                                <messageoptions :message="message.message" :messageuid="message.uid"/>
                            </div>
                        </div>
                        <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" class="w-6 h-6 rounded-full order-1">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.scrollbar-w-2::-webkit-scrollbar {
  width: 0.25rem;
  height: 0.25rem;
}

.scrollbar-track-blue-lighter::-webkit-scrollbar-track {
  --bg-opacity: 1;
  background-color: #f7fafc;
  background-color: rgba(247, 250, 252, var(--bg-opacity));
}

.scrollbar-thumb-blue::-webkit-scrollbar-thumb {
  --bg-opacity: 1;
  background-color: #edf2f7;
  background-color: rgba(237, 242, 247, var(--bg-opacity));
}

.scrollbar-thumb-rounded::-webkit-scrollbar-thumb {
  border-radius: 0.25rem;
}

.chat-message-main-container.mt-0 {
    margin-top: 0 !important;
}
</style>

<script>
import { mapState, mapMutations, mapActions } from "vuex"
import messageoptions from "@page_components/messages/messageoptions.vue";
import messageoptions_other from "@page_components/messages/messageoptions_other.vue";
export default {
    components: {
        messageoptions,
        messageoptions_other
    },
    computed: {
        ...mapState({
            state: state => state.messages.direct_messages_users.state
        }),
    },
    async mounted() {
        if(this.$route.params.uid) {
            this.listenForNewMessage();
            await this.fetchMessages(this.$route.params.uid);
            //console.log("Messages STATE", this.state);
        }
    },
    methods:{
        ...mapActions('messages/direct_messages_users', [
            'fetchMessages',
        ]),
        listenForNewMessage() {
            this.$echo.channel('ChatNotificationChannel')
            .listen('ChatNotificationEvent', (e) => {                
                if(this.$route.params.uid) {
                
                this.fetchMessages(this.$route.params.uid);

                }
            }); 
         
        },
    }
}
</script>