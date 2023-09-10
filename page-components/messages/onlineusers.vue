<template>
    <div class="flex-1 h-full px-2 chatrooms">    
        <p @click="nuxtClosingLink" v-for="(entry, entryindex) in state.entry.data" :key="`group-entry-${genKey(entry)}`">
            <nuxt-link :to="'/messages/'+entry.user_uid" class="entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-white mb-4 rounded p-4 flex shadow-md border-right-green">
                <div class="flex-2 messenger-profile">
                    <div class="w-12 h-12 relative">
                        <img class="w-12 h-12 rounded-full mx-auto" :src="entry.image.url" alt="chat-user" />
                        <span class="absolute w-4 h-4 bg-green-400 rounded-full right-0 bottom-0 border-2 border-white"></span>
                    </div>
                </div>
                <div class="flex-1 px-2 messenger-content">
                    <div class="truncate w-40"><span class="--text-dark">{{entry.full_name}}</span></div>
                    <!-- <div><small class="--text-dark">Yeah, Sure!</small></div> -->
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
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex"
export default {
    props: ['nuxtClosingLink'],
    computed: {
        ...mapState({
            state: state => state.messages.direct_messages_users.state
        }),
    },
    async mounted() {
        await this.fetchOnlineUsers();

        //console.log(this.state);

        if(this.$route.query.uid) {
            this.nuxtload();
            // await this.fetchByUID(this.$route.query.uid);
            this.nuxtunload();
        }
    },
    methods: {
        ...mapActions('messages/direct_messages_users', [
            'fetchOnlineUsers',
        ]),
    },
}
</script>