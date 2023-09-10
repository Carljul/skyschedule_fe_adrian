<template>
    <div>

        <transition name="backdrop">
            <div 
            v-if="open"
            class="fixed inset-0 z-40 backdrop modalmodule bg-modal"
            @click="() => {
                if(backdrop) {
                    this.closeModal();
                }
            }"
            ></div>
        </transition>

        <transition name="backdropcontent">
            <div
            v-if="open"
            tabindex="-1"
            aria-hidden="true" 
            class="overflow-y-auto overflow-x-hidden fixed justify-center items-center inset-0 z-50"
            >
                <div :class="`relative m-auto p-0 sm:p-4 w-full z-50 pointer-events-auto ${contentclass}`">

                        <div 
                        :class="`relative sm:h-auto bg-white rounded-none sm:rounded shadow ${wrapclass}`">
                            <div v-if="!noheader" class="flex justify-between items-start p-5 pb-0 rounded-t">
                                <slot name="header" />
                                <button v-if="enableclose" @click="closeModal" type="button" class="--text-dark bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="default-modal">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div v-if="!nocontent"  class="p-6 space-y-6">
                                <slot name="content" />
                            </div>
                            <div v-if="!nofooter" class="flex items-center p-6 space-x-2 rounded-b ">
                                <slot name="footer" />
                            </div>
                        </div>

                </div>
            </div>
        </transition>

    </div>
</template>
<script>
export default {
    props: {
        enableclose: {
            type: Boolean,
            default: true
        },
        backdrop: {
            type: Boolean,
            default: true
        },
        contentclass: {
            type: String,
            default: ''
        },
        wrapclass: {
            type: String,
            default: ''
        },
        nocontent: {
            type: Boolean,
            default: false
        },
        nofooter: {
            type: Boolean,
            default: false
        },
        noheader: {
            type: Boolean,
            default: false
        },
        openmodal: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        openmodal(val) {
            this.open = val;
        },
        open(val) {
            this.$emit('modalTrigger', val);
        }
    },
    data() {
        return {
            open: false
        }
    },
    mounted() {
        this.open = this.openmodal;
    },
    methods: {
        openModal() {
            this.open = true;
        },
        closeModal() {
            const e = this;
            e.open = false;
            setTimeout( function() {
                e.$emit('close');
            }, 500);
        }
    }
}
</script>

<style lang="scss" scoped>
.backdrop-enter-active,
.backdrop-leave-active {
  transition: opacity .3s linear;
}

.backdrop-enter,
.backdrop-leave-to {
  opacity: 0;
}

.backdropcontent-enter-active,
.backdropcontent-leave-active {
  transition: transform 0.2s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.2s linear;
}

.backdropcontent-enter,
.backdropcontent-leave-to {
  opacity: 0;
  transform: scale(0.5) translateY(-20%);
}

.z-index-hidden {
    z-index: -50;
    transition: z-index 1s linear;
}
</style>