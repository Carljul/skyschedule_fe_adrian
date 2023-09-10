<template>
     <client-only>
        <v-select 
        :components="{OpenIndicator, Deselect}"
        v-bind="$attrs" v-on="$listeners" class="border border-gray-300 --text-dark text-sm rounded block w-full p-1 input-focus-border tt-component-select">

            <template v-slot:no-options="{ search, searching }">
                <template v-if="searching">
                    <span class="--text-dark text-sm">No results found for {{ search }}.</span>
                </template>
                <span v-else class="--text-dark text-sm">Start typing to search from lists.</span>
            </template>

            <template v-slot:spinner="{ loading }">
                <div
                    v-if="loading"
                    style="border-left-color: var(--pref-color-primary);"
                    class="vs__spinner"
                >
                </div>
            </template>

            <template #list-footer>
                <slot name="footer" />
            </template>

        </v-select>
     </client-only>
</template>

<script>
import "vue-select/dist/vue-select.css";
import "~/assets/v-select.scss";
import OpenIndicator from "@components/reusables/vselectopenindicator.vue";
import Deselect from "@components/reusables/vselectdeselect.vue";
import vSelect from "vue-select";

export default {
    components: {
        vSelect
    },
    data() { return {
        OpenIndicator,
        Deselect,
    } }
}
</script>