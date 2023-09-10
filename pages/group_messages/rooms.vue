<template>
    <div class="chatrooms-main-col overflow-y-scroll overflow-x-hidden">
        <div class="chatrooms-group-message py-2">
            <div @click="openHideChats('channels')" class="cursor-pointer chatrooms-group-placeholder flex items-center">
                <span class="mr-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 rotate-90">
                        <path fill-rule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clip-rule="evenodd" />
                    </svg>
                </span>
                <span class="text-display select-none">Channels</span>
            </div>
            <div class="flex-1 h-full px-2 chatrooms">
                
                <p @click="nuxtClosingLink">
                    <nuxt-link v-for="(entry, entryindex) in state.entry.data" :key="`department-entry-${genKey(entry)}`"  :to="'../messages/' + entry.uid" class="entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-white mb-4 rounded p-4 flex shadow-md border-right-green">
                        
                        <div class="flex-2 messenger-profile">
                            <div class="w-12 h-12 relative">
                                <img class="w-12 h-12 rounded-full mx-auto" src="https://scontent.fceb6-1.fna.fbcdn.net/v/t1.15752-9/250483964_833998700628526_3836990489268180870_n.png?stp=dst-png_p100x100&_nc_cat=105&ccb=1-7&_nc_sid=4de414&_nc_eui2=AeG2MMvbLGmGIIRu99xvZuw1CO87vf70gw4I7zu9_vSDDmwvUL34f3QvV0mR1oyHTCQuKtmH0zxf6LlevHLXZ_gL&_nc_ohc=h2FXxSHNsFYAX-vYyNM&_nc_ht=scontent.fceb6-1.fna&oh=03_AdSQJ860QkrouQKYthCLffp9PdohFGAcETEamm_TqUXk9A&oe=63F262E7" alt="chat-user" />
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
            <div class="flex-1 h-full px-2 chatrooms">
                <p @click="nuxtClosingLink">
                    <nuxt-link to="/messages/8192389283" class="entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-white mb-4 rounded p-4 flex shadow-md border-right-green">
                        <div class="flex-2 messenger-profile">
                            <div class="w-12 h-12 relative">
                                <img class="w-12 h-12 rounded-full mx-auto" src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144" alt="chat-user" />
                                <span class="absolute w-4 h-4 bg-green-400 rounded-full right-0 bottom-0 border-2 border-white"></span>
                            </div>
                        </div>
                        <div class="flex-1 px-2 messenger-content">
                            <div class="truncate w-40"><span class="--text-dark">Jundel Agbo</span></div>
                            <div><small class="--text-dark">Yeah, Sure!</small></div>
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

import { mapState, mapMutations, mapActions } from "vuex"
export default {
    name: 'RoomLists',
        components: {
            Loader,
            IconEdit,
            IconTrash,
            IconRestore,
            Page,
            AlertConfirm
        },
        computed: {
        ...mapState({
            state: state => state.messages.rooms.state
        }),
    },
    async mounted() {
        await this.fetchEntry();
        
        if(this.$route.query.uid) {
            this.nuxtload();
            await this.fetchByUID(this.$route.query.uid);
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
            'restoreEntry'
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
            console.log(gc_chats);
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