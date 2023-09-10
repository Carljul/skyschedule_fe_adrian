<template>
    <div class="messages-page">
        <div class="mt-5">
            <h3 class="text-lg mb-3 --text-heading font-semibold">Messages</h3>
            <breadcrumbs
            :lists="[
                { text: 'Messages' }
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
                                <div class="sidebar hidden lg:flex w-1/4 flex-2 flex-col pr-6">
                                    <chatsearch />
                                    <chatrooms />
                                </div>
                                
                                <div class="chat-area flex-1 flex flex-col items-center">
                                    <chatnoroom />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import Breadcrumbs from "@components/reusables/Breadcrumbs.vue";
import chatrooms from "@page_components/group_messages/rooms.vue";
import chatstatus from "@page_components/group_messages/status.vue";
import chatsearch from "@page_components/group_messages/search.vue";
import chatnoroom from "@page_components/group_messages/noroom.vue";

export default {
    name: "MessagesPage",
    layout: "main",
    middleware: ['auth'],
    components: {
        Breadcrumbs,
        chatrooms,
        chatstatus,
        chatsearch,
        chatnoroom
    }
}
</script>