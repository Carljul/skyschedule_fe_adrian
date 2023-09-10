<template>
    <button :class="`relative ${btnloading}`" v-bind="$attrs" v-on="$listeners" :disabled="loading">
        <span :class="slotclass"><slot /></span>
        <loader v-if="!loadingtext" :class="`btn-loader absolute ${loadingclass}`" />
        <span v-else :class="`btn-loader loadertext absolute ${loadingclass}`">{{loadingtext}}</span>
    </button>
</template>
<script>
import Loader from "@components/reusables/Loader.vue";
export default {
    props: ['loadingtext'],
    components: {
        Loader
    },
    data() {
        return {
            loading: false
        }
    },
    computed: {
        slotclass() {
            if(this.loadingtext && this.loading) {
                return 'hidden';
            }
            return !this.loading ? 'opacity-100' : 'opacity-0';
        },
        loadingclass() {
            if(this.loadingtext && this.loading) {
                return 'relative';
            }
            return this.loading ? 'opacity-100' : 'opacity-0'
        },
        btnloading() {
            return this.loading ? 'opacity-50 cursor-default' : '';
        }
    }
}
</script>

<style lang="scss" scoped>
.btn-loader {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.loadertext {
    left: auto;
    top: auto;
    transform: none;
}
</style>