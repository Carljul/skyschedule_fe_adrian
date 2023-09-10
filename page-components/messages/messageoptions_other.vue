<template>
    <div class="absolute left-0 top-0 inline-block flex items-start h-full">
        <p @click="options_show_function" class="options leading-3 text-3xl cursor-pointer select-none">
            ...
        </p>
        <div v-if="options_show" class="absolute -bottom-14 z-50 option-choices bg-white shadow-lg rounded p-3">
            <p @click="show_remove_message_function" class="oc-remove mb-1 cursor-pointer">
                Remove
            </p>
            <p @click="show_edit_message_function" class="oc-remove cursor-pointer">
                Edit
            </p>
        </div>
        <removemssagemodal :messageuid="messageuid" v-if="show_remove_message" :show_remove_message_function="show_remove_message_function"/>
        <editmessagemodal v-if="show_edit_message" :show_edit_message_function="show_edit_message_function"/>
    </div>
</template>
<script>
import removemssagemodal from "@page_components/messages/removemessagemodal.vue";
import editmessagemodal from "@page_components/messages/editmessagemodal.vue";
import { mapState, mapMutations, mapActions } from "vuex"
export default {
    props: ['messageuid'],
    components: {
        removemssagemodal,
        editmessagemodal
    },
    data(){
        return {
            options_show: false,
            show_remove_message: false,
            show_edit_message: false,
        }
    },
    methods:{
        options_show_function(){
            this.options_show =!this.options_show;            
        },
        show_remove_message_function() {
            this.show_remove_message =!this.show_remove_message;
            this.options_show = false;
        },
        show_edit_message_function() {
            this.show_edit_message =!this.show_edit_message;
            this.options_show = false;
        }
    }
}
</script>