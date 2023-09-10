<template>
    <dropzone 
    ref="media" 
    @onselected="(media) => $emit('input', isObject ? setDropzone(media[0]) : setDropzone(media[0]).url)" 
    :selected="value"
    v-bind="$attrs" 
    v-on="$listeners"
    >
        <template slot="files">
        <div class="img-picker">

            <img v-if="value" :src="getImgSRC" class="h-14 object-cover max-w-full" />
            
            <button type="button" 
            class="btnimg border-gray-300 border rounded text-xs py-2 px-4 --text-dark rounded focus:outline-none focus:shadow-outline relative " 
            v-else @click="$refs.media.openMedia()">
                Select File
            </button>

            <div v-if="value" class="btnicons mt-2 --text-dark">
            <button type="button" @click="$refs.media.openMedia()" title="Change File" v-tooltip="'Change File'">
                <icon-edit />
            </button>
            <button type="button" @click="$emit('input', null)" title="Remove File" v-tooltip="'Remove File'">
                <icon-trash />
            </button>
            </div>
        </div>
        </template>
    </dropzone>
</template>
<script>
import "~/assets/dropzone.scss";
import Dropzone from "@components/reusables/Dropzone.vue";
import IconEdit from "@components/reusables/IconEdit.vue";
import IconTrash from "@components/reusables/IconTrash.vue";

export default {
    components: {
        Dropzone,
        IconEdit,
        IconTrash
    },
    props: {
        value: {
            type: [Object, String]
        },
        isObject: {
            type: Boolean,
            default: () => { return true; }
        }
    },
    computed: {
        getImgSRC() {
            if(this.isObject) {
                return this.$imagebymimes(this.value.url);
            }
            return this.$imagebymimes(this.value);
        }
    }
}
</script>