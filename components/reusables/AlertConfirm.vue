<template>
    <modal
    :ref="`alert-confirm-${nuxtuniqid}`"
    contentclass="xl:w-3/12 md:w-4/12 sm:w-5/12 h-full flex items-center"
    :closable="false"
    :noheader="true"
    :nofooter="true"
    v-bind="$attrs" 
    v-on="$listeners"
    >
        <template slot="content">
            <div>
                <h5 class="--text-dark text-lg font-semibold">{{message.title}}</h5>
                <div v-html="message.html" class="text-sm --text-dark"></div>
                <slot name="buttons">
                    <div class="mt-2 flex items-center justify-end">
                        <async-button 
                        @click="execAlert"
                        ref="execAlert"
                        :class="`text-sm px-4 text-white rounded btn font-medium px-4 py-2 mt-2 ${message.yesclass}`">
                            {{message.yes}}
                        </async-button>

                        <button 
                        @click="() => $refs[`alert-confirm-${nuxtuniqid}`].open=false"
                        class="ml-2 text-sm px-4 text-white rounded btn bg-gray-400 hover:bg-gray-500 font-medium px-4 py-2 mt-2">
                            {{message.cancel}}
                        </button>
                    </div>
                </slot>
            </div>
        </template>
    </modal>
</template>

<script>
const defaultState = () => ({
    title: 'Message',
    html: '',
    yes: 'Yes',
    yesclass: '--bg-danger --bg-danger-hover',
    cancel: 'Cancel',
    execute: async () => {}
});

import AsyncButton from "@components/reusables/AsyncButton.vue";
import Modal from '@components/reusables/Modal.vue';
export default {
    props: {
        alertFunction: {
            type: Function,
            default: () => {}
        }
    },
    data() { return {
        message: defaultState()
    } },
    components: {
        Modal,
        AsyncButton
    },
    methods: {
        $alert($args) {
            this.message = { ...defaultState(), ...$args };
            this.$refs[`alert-confirm-${this.nuxtuniqid}`].open=true;
        },
        async execAlert() {
            this.$refs.execAlert.loading=true;
            await this.message.execute();
            this.$refs[`alert-confirm-${this.nuxtuniqid}`].open=false;
        }
    }
}
</script>