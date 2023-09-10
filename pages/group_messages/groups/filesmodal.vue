<template>
    <div class="chat-media-files-container fixed z-50 bg-opacity-40 w-full h-full bg-black top-0 left-0 flex">
        <div class="chat-media-files w-96 bg-white m-auto rounded-lg relative">
            <div @click="openMediaFilesFunction" class="chat-files-close-btn absolute top-1 right-1 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
            <div class="p-5">
                <div class="modal-details">
                    <h3 class="profile-name text-xl">Jundel Agbo</h3>
                    <h6 class="job-title text-sm text-gray-600">Fullstack Developer</h6>
                </div>
                <div class="files-content bg-gray-100 rounded-lg mt-5 pt-3">
                    <div class="files-title px-3 pb-2 border-b border-gray-300">
                        <h3 class="text-lg">Files</h3>
                    </div>
                    <div class="file-uploaded cursor-pointer px-3 py-2 transition ease-in-out hover:bg-gray-200">
                        <div class="flex items-center">
                            <div class="file-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                </svg>
                            </div>
                            <div class="file-details ml-2">
                                <div class="file-name">
                                    <p>Sample File Upload.zip</p>
                                </div>
                                <div class="file-date-upload">
                                    <p class="text-sm text-gray-600">Dec. 25, 2022</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="file-uploaded cursor-pointer px-3 py-2 transition ease-in-out hover:bg-gray-200">
                        <div class="flex items-center">
                            <div class="file-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                </svg>
                            </div>
                            <div class="file-details ml-2">
                                <div class="file-name">
                                    <p>Sample File Upload.zip</p>
                                </div>
                                <div class="file-date-upload">
                                    <p class="text-sm text-gray-600">Dec. 25, 2022</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="file-uploaded cursor-pointer px-3 py-2 transition ease-in-out hover:bg-gray-200">
                        <div class="flex items-center">
                            <div class="file-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                </svg>
                            </div>
                            <div class="file-details ml-2">
                                <div class="file-name">
                                    <p>Sample File Upload.zip</p>
                                </div>
                                <div class="file-date-upload">
                                    <p class="text-sm text-gray-600">Dec. 25, 2022</p>
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
export default {  
  props: ['openMediaFilesFunction']
}
</script>