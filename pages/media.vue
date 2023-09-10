<template>
    <div class="administration-media-page mb-10">

        <div class="mb-10 mt-5">
            <breadcrumbs
            :lists="[
                { text: 'Administration' },
                { text: 'Media' }
            ]"
            />
        </div>

        <dropzone class="media-no-margin" ref="medias" :ispage="true" :multiple="true" title="Media Files" :nofiltercurpath="true" />

    </div>
</template>
<script>
import Breadcrumbs from "@components/reusables/Breadcrumbs.vue";
import Dropzone from "@components/reusables/Dropzone.vue";
export default {
    name: "AdministrationMediaPage",
    layout: "main",
    middleware: ['auth'],
    components: {
        Breadcrumbs,
        Dropzone
    },
    head() {
        return {
            title: 'Media' + this.theAppTitle
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.$refs.medias.open = true;
        });
    }
}
</script>