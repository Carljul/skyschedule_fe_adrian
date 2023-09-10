<template>
    <div class="modal-details relative pr-8">
        <h3 class="profile-name text-xl">{{ groupHeaderTitle }}</h3>
        <h6 class="job-title text-sm text-gray-600">Group Description</h6>
        <div class="absolute right-3 top-1 h-full">
            <p @click="show_group_details_function" class="options leading-3 text-3xl cursor-pointer select-none">
                ...
            </p>
        </div>
        <div v-if="show_group_options"  class="absolute right-0 top-10 z-50 option-choices bg-white shadow-lg rounded p-3">
            <p @click="show_edit_message_function" class="oc-remove cursor-pointer">
                Edit
            </p>
            <p @click="show_delete_group_function" class="oc-remove mb-1 cursor-pointer">
                Delete
            </p>
            <p @click="show_leave_group_function" class="oc-remove mb-1 cursor-pointer">
                Leave
            </p>
        </div>
        <leavegroupmodal v-if="show_leave_group" :show_leave_group_function="show_leave_group_function"/>
        <deletegroupmodal v-if="show_delete_group" :show_delete_group_function="show_delete_group_function" :openMediaFilesFunction="openMediaFilesFunction"/>
        <editgroupmodal v-if="show_edit_message" :show_edit_message_function="show_edit_message_function" :openMediaFilesFunction="openMediaFilesFunction"/>
    </div>
</template>
<script>
import leavegroupmodal from "@page_components/group_messages/leavegroupmodal.vue";
import deletegroupmodal from "@page_components/group_messages/deletegroupmodal.vue";
import editgroupmodal from "@page_components/group_messages/editgroupmodal.vue";
export default {
    props: ['openMediaFilesFunction', 'groupHeaderTitle'],
    components: {
        leavegroupmodal,
        deletegroupmodal,
        editgroupmodal,
    },
    data(){
        return {
            show_group_options: false,
            show_leave_group: false,
            show_delete_group:false,
            show_edit_message: false,
        }
    },
    methods:{
        show_group_details_function(){
            this.show_group_options =!this.show_group_options
        },
        show_delete_group_function(){
            this.show_delete_group = !this.show_delete_group;
            this.show_group_options = false;
        },
        show_leave_group_function(){
            this.show_leave_group = !this.show_leave_group;
            this.show_group_options = false;
        },
        show_edit_message_function(){
            this.show_edit_message =!this.show_edit_message;
            this.show_group_options = false;
        }
    }
}
</script>