<template>
    <p class="text-xs text-red-600 block mt-1" v-if="error" v-html="getMessage" />
</template>
<script>
export default {
    props: ['error', 'message'],
    computed: {
        getMessage() {
            if(!this.message) {
                return this.error;
            }
            return this.message;
        }
    },
}
</script>
