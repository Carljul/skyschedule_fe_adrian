<template>
    <div class="flex sm:items-center justify-between py-3 border-b border-gray-200">
        <div class="relative py-2 pl-0 pr-3 cursor-pointer rounded flex items-center space-x-4 transition ease-in-out hover:bg-gray-200">
            <div @click="backBtnFunction()" class="block xl:hidden mobile-back-btn cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </div>
            <div @click="openMediaFilesFunction" class="relative">
                <span class="absolute text-green-500 right-0 bottom-0">
                    <svg width="20" height="20">
                        <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                    </svg>
                </span>
                <img src="https://scontent.fceb6-1.fna.fbcdn.net/v/t1.15752-9/250483964_833998700628526_3836990489268180870_n.png?stp=dst-png_p100x100&_nc_cat=105&ccb=1-7&_nc_sid=4de414&_nc_eui2=AeG2MMvbLGmGIIRu99xvZuw1CO87vf70gw4I7zu9_vSDDmwvUL34f3QvV0mR1oyHTCQuKtmH0zxf6LlevHLXZ_gL&_nc_ohc=h2FXxSHNsFYAX-vYyNM&_nc_ht=scontent.fceb6-1.fna&oh=03_AdSQJ860QkrouQKYthCLffp9PdohFGAcETEamm_TqUXk9A&oe=63F262E7" alt="" class="w-10 sm:w-16 h-10 sm:h-16 rounded-full">
            </div>
            <div @click="openMediaFilesFunction(state.selected_group.title)" class="flex flex-col leading-tight">
                <div class="text-lg mt-1 flex items-center">
                <span v-if="state.selected_group != null" class="text-gray-700 mr-3">{{ state.selected_group.title }}</span>                
                </div>
                <span class="text-sm text-gray-600">Group Description</span>
            </div>
        </div>
        <div class="flex items-center space-x-2">
            <button type="button" class="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
            </button>
            <button type="button" class="hidden inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                </svg>
            </button>
            <button type="button" class="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                </svg>
            </button>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex"
export default {
    
    props: ['openMediaFilesFunction'],
    data(){
        return {
        }
    },
    computed: {
        ...mapState({
            state: state => state.group_messages.group_messages_users.state
        }),
    },
    async mounted() {
        if(this.$route.params.uid) {
            await this.fetchGroup(this.$route.params.uid);
            console.log("HEADER STATE", this.state);
        }        
    },
    methods:{
        ...mapActions('group_messages/group_messages_users', [
            'fetchGroup',
        ]),
        backBtnFunction(){
            if(document.body.classList.contains("open-navigation-mobile")){
                document.body.classList.remove("open-navigation-mobile");
            }else{
                document.body.classList.add("open-navigation-mobile");
            }
        }
    }
}
</script>

