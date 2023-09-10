<template>
    <div class="chat-messages-wrap flex-1 p:2 sm:px-6 sm:pt-0 justify-between flex overflow-y-auto flex-col-reverse" style="max-height: calc(100vh - 43vh);">        
        <div class="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch pt-12 flex-col-reverse">
            <!-- <div class="chat-message-main-container mt-0"> -->
                <div class="chat-message-main-container mt-0" v-for="data in state.group_message" :key="data.id">
                    <!-- {{  entry  }} -->
                    <div v-if="data.from != $auth.$state.user.uid" class="chat-message mt-6">
                        <div class="flex items-end">
                            <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                                <div class="relative pr-5">
                                    <span class="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                                        {{  data.message  }}
                                    </span>
                                    <!-- <messageoptions :message="data.message" :uid="data.uid"/> -->
                                </div>
                            </div>
                            <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" class="w-6 h-6 rounded-full order-1">
                        </div>
                    </div>
                    <div v-if="data.from == $auth.$state.user.uid" class="chat-message mt-6 w-fit ml-auto mr-0">
                        <div class="flex items-end">
                            <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                                <div class="relative pr-5">
                                    <span class="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-blue-600 text-white">
                                        {{  data.message  }}
                                    </span>
                                    <messageoptions :message="data.message" :uid="data.uid"/>
                                </div>
                            </div>
                            <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" class="w-6 h-6 rounded-full order-1">
                        </div>
                    </div>
                </div>
            <!-- </div> -->
        </div>
    </div>
</template>

<style>
.scrollbar-w-4::-webkit-scrollbar {
  width: 0.35rem;
  height: 0.25rem;
}

.scrollbar-track-blue-lighter-4::-webkit-scrollbar-track {
  --bg-opacity: 1;
  background-color: #6b6b6b;
  background-color: rgba(247, 250, 252, var(--bg-opacity));
}

.scrollbar-thumb-blue-4::-webkit-scrollbar-thumb {
  --bg-opacity: 1;
  background-color: #acacac;
  /* background-color: rgba(237, 242, 247, var(--bg-opacity)); */
}

.scrollbar-thumb-rounded-4::-webkit-scrollbar-thumb {
  border-radius: 0.25rem;
}
</style>

<script>
import Loader from "@components/reusables/Loader.vue";
import IconEdit from "@components/reusables/IconEdit.vue";
import IconTrash from "@components/reusables/IconTrash.vue";
import IconRestore from "@components/reusables/IconRestore.vue";
import Page from "@components/reusables/Pagination.vue";
import AlertConfirm from "@components/reusables/AlertConfirm.vue";
import messageoptions from "@page_components/group_messages/messageoptions.vue";

import { mapState, mapMutations, mapActions } from "vuex"
export default {
    name: 'RoomLists',
        components: {
            Loader,
            IconEdit,
            IconTrash,
            IconRestore,
            Page,
            AlertConfirm,
            messageoptions
        },
        computed: {
        ...mapState({
            state: state => state.group_messages.room_messages.state
        }),
    },
    data() {
        return {
            options_show: false,
        }
    },
    async mounted() {
        this.nuxtload();
        this.listenForNewMessage();
        await this.fetchByUID(this.$route.params.uid);
 

        this.nuxtunload();
        
        // if(this.$route.params.uid) {
        //     this.nuxtload();
        //     await this.fetchByUID(this.$route.query.uid);
        //     this.nuxtunload();
        // }
    },
    mutations: {
        addMessage (state, data) {
            // mutate state
            state.customers.push(data)
        }
    },
    methods:{
        ...mapMutations('group_messages/room_messages', [
            'setState'
        ]),
        ...mapActions('group_messages/room_messages', [
            'fetchEntry',
            'removeEntry',
            'restoreEntry',
            'fetchByUID'
        ]),
        paginate(data) {
            this.setState({ entry: { ...this.state.entry, filter: { ...this.state.entry.filter, page: data.page } } });
            this.setState({ entry: { ...this.state.entry, filter: { ...this.state.entry.filter, limit: data.limit } } });
            this.fetchEntry();
        },
        listenForNewMessage() {
            this.$echo.channel('ChatNotificationChannel')
            .listen('ChatNotificationEvent', (e) => {                
                if(this.$route.params.uid) {
                
                    this.fetchByUID(this.$route.params.uid);

                }
            }); 
         
        },
    }
}
</script>