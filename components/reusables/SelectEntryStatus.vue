<template>
    <t-select
    v-bind="$attrs" 
    v-on="$listeners"
    :options="statusLists"
    :reduce="dd => dd.value"
    label="label"
    :clearable="false"
    :class="{'p-1.5':true}"
    >
    </t-select>
</template>
<script>
import TSelect from "@components/reusables/Select.vue";
export default {
    components: {
        TSelect
    },
    computed: {
        statusLists() {
            return [
                {
                    label: 'All',
                    value: {with_trashed:1,only_trashed:null}
                },
                {
                    label: 'Active',
                    value: {with_trashed:null,only_trashed:null}
                },
                {
                    label: 'Trashed',
                    value: {with_trashed:null,only_trashed:1}
                }
            ];
        }
    }
}
</script>