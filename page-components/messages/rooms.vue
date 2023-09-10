<template>
    <div class="chatrooms-main-col overflow-y-scroll overflow-x-hidden">
        <div class="chatrooms-group-message py-2">
            <div @click="openHideChats('channels')" class="cursor-pointer chatrooms-group-placeholder flex items-center relative">
                <span class="mr-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 rotate-90">
                        <path fill-rule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clip-rule="evenodd" />
                    </svg>
                </span>
                <span class="text-display select-none">Channels</span>
                <span @click.stop="openAddChannelFunction" class="absolute right-0 top-0"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg></span>
            </div>
            <div class="flex-1 h-full px-2 chatrooms" v-for="(entry, entryindex) in state.entry.data" :key="`group-entry-${genKey(entry)}`">
                
                <p @click="nuxtClosingLink" v-for="(member, group_members) in entry.group_members" :key="`group-entry-${genKey(member)}`"  >
                    <nuxt-link  :to="'../group_messages/' + entry.uid" v-if="member.user_uid == $auth.$state.user.uid"  class="entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-white mb-4 rounded p-4 flex shadow-md border-right-green">
                        <div class="flex-2 messenger-profile">
                            <div class="w-12 h-12 relative">
                                <h2 class="channells-first-letter w-12 h-12 rounded-full mx-auto">{{ Array.from(entry.title)[0] }}</h2>
                                <span class="absolute w-4 h-4 bg-green-400 rounded-full right-0 bottom-0 border-2 border-white"></span>
                            </div>
                        </div>
                        <div class="flex-1 px-2 messenger-content">
                            <div class="truncate w-40"><span class="--text-dark">{{ entry.title }}</span></div>
                            <!-- <div><small class="--text-dark">Sent a video!</small></div> -->
                        </div>
                        <div class="flex-2 text-right messenger-info">
                            <div class="message-date-sent"><small class="--text-dark">15 April</small></div>
                            <div class="message-notif-number">
                                <small class="text-xs bg-green-500 text-white rounded-full h-6 w-6 leading-6 text-center inline-block">
                                    23
                                </small>
                            </div>
                        </div>
                    </nuxt-link>
                </p>
                
                
            </div>
        </div>
        <div class="chatrooms-direct-message py-2">
            <div @click="openHideChats('direct-message')" class="cursor-pointer chatrooms-group-placeholder flex items-center">
                <span class="mr-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 rotate-90">
                        <path fill-rule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clip-rule="evenodd" />
                    </svg>
                </span>
                <span class="text-display select-none">Direct Messages</span>
            </div>
            <onlineusers :nuxtClosingLink="nuxtClosingLink"/>
        </div>
    </div>
</template>
<style scoped>
.chatrooms-group-placeholder.chatrooms-group-placeholder svg {
    transition: 0.2s;
}
.chatrooms-group-message.hidden-arrow.hidden-arrow .chatrooms-group-placeholder.chatrooms-group-placeholder svg {
    transform: rotate(0deg);
}
.chatrooms-group-message.hidden-arrow .chatrooms {
    display: none;
}
.chatrooms-group-message.hidden-arrow .text-display {
    font-weight: bold;
}
.chatrooms-group-placeholder.chatrooms-group-placeholder svg {
    transition: 0.2s;
}
.chatrooms-direct-message.hidden-arrow.hidden-arrow .chatrooms-group-placeholder.chatrooms-group-placeholder svg {
    transform: rotate(0deg);
}
.chatrooms-direct-message.hidden-arrow .chatrooms {
    display: none;
}
.chatrooms-direct-message.hidden-arrow .text-display {
    font-weight: bold;
}
.chatrooms-main-col.overflow-y-scroll {
    height: 68vh;
}
/* width */
.chatrooms-main-col.overflow-y-scroll::-webkit-scrollbar {
  width: 8px;
}

/* Track */
.chatrooms-main-col.overflow-y-scroll::-webkit-scrollbar-track {
  background: #FFFFFF; 
}
 
/* Handle */
.chatrooms-main-col.overflow-y-scroll::-webkit-scrollbar-thumb {
  background: #888; 
}

/* Handle on hover */
.chatrooms-main-col.overflow-y-scroll::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
.chatrooms > a {
    flex-wrap: wrap;
}

.chatrooms > a .messenger-profile {
    max-width: 23%;
}

.chatrooms > a .messenger-content {
    max-width: 77%;
}

.chatrooms > a .messenger-info {
    min-width: 100%;
    display: flex;
}
.message-notif-number {
    margin: auto 0 auto 0;
}

.message-date-sent {
    margin: auto 10px auto auto;
}
.channells-first-letter{
    font-size: 35px;
    background: #43a047;
    line-height: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
}
@media (max-width: 1025px){
    .chatrooms-main-col.overflow-y-scroll {
        height: 100%;
    }
}
</style>
<script>
import Loader from "@components/reusables/Loader.vue";
import IconEdit from "@components/reusables/IconEdit.vue";
import IconTrash from "@components/reusables/IconTrash.vue";
import IconRestore from "@components/reusables/IconRestore.vue";
import Page from "@components/reusables/Pagination.vue";
import AlertConfirm from "@components/reusables/AlertConfirm.vue";
import onlineusers from "@page_components/messages/onlineusers.vue";

import { mapState, mapMutations, mapActions } from "vuex"
export default {
    props: ["openAddChannelFunction"],
    name: 'RoomLists',
    components: {
        Loader,
        IconEdit,
        IconTrash,
        IconRestore,
        Page,
        AlertConfirm,
        onlineusers
    },
    computed: {
        ...mapState({
            state: state => state.messages.rooms.state
        }),
    },
    async mounted() {
        await this.fetchEntry();
        await this.fetchOnlineUsers();
        // state.entry
        ////console.log("ONLINE USERS", this.state)        
        ////console.log("TESTSHU",this.state.entry.data);
        if(this.$route.query.uid) {
            this.nuxtload();
            // await this.fetchByUID(this.$route.query.uid);
            this.nuxtunload();
        }
    },
    methods:{
        ...mapMutations('messages/rooms', [
            'setState'
        ]),
        ...mapActions('messages/rooms', [
            'fetchEntry',
            'removeEntry',
            'restoreEntry',
        ]),
        ...mapActions('messages/direct_messages_users', [
            'fetchOnlineUsers',
        ]),
        paginate(data) {
            this.setState({ entry: { ...this.state.entry, filter: { ...this.state.entry.filter, page: data.page } } });
            this.setState({ entry: { ...this.state.entry, filter: { ...this.state.entry.filter, limit: data.limit } } });
            this.fetchEntry();
        },
        openHideChats(_chat_name){
            var gc_chats = this.$el.querySelectorAll(".chatrooms-group-message");
            if(_chat_name == "direct-message"){
                gc_chats = this.$el.querySelectorAll(".chatrooms-direct-message");
            }
            // ////console.log(gc_chats);
            if(gc_chats.length > 0){
                if(gc_chats[0].classList.contains("hidden-arrow")){
                    gc_chats[0].classList.remove("hidden-arrow");
                }else{
                    gc_chats[0].classList.add("hidden-arrow");
                }
            }
        },
        nuxtClosingLink(){
            if(document.body.classList.contains("open-navigation-mobile")){
                document.body.classList.remove("open-navigation-mobile");
            }else{
                document.body.classList.add("open-navigation-mobile");
            }
        }
    }
}
</script>