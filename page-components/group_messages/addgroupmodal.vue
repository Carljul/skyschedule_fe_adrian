<template>
    <div class="chat-media-files-container fixed z-50 bg-opacity-40 w-full h-full bg-black top-0 left-0 flex">
        <div class="chat-media-files w-96 bg-white m-auto rounded-lg relative">
            <div @click="openAddChannelFunction" class="chat-files-close-btn absolute top-1 right-1 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
            <div class="p-5">
                <div class="modal-details">
                    <h3 class="profile-name text-xl">Add Channel</h3>
                </div>
                <div>
                    <form>
                        <div class="mt-2 mb-2">
                            <input type="text" class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border" placeholder="Channel Name" />
                        </div>
                        
                        <div class="mt-2">
                            <input type="text" class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border" placeholder="Add Member" />
                        </div>
                        <div class="mt-2">
                            <button class="relative  p-3 text-sm px-4 text-white rounded btn --bg-primary --bg-primary-hover mt-1">Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {  
  props: ['openAddChannelFunction']
}
</script>