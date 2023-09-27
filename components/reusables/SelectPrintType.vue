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
                    value: {query:''}
                },
                {
                    label: 'Digital Cups',
                    value: {query:'digital_cups'}
                },
                {
                    label: 'Digital Napkins',
                    value: {query:'digital_napkins'}
                },
                {
                    label: 'Digital Other',
                    value: {query:'digital_other'}
                },
                {
                    label: 'Hotstamp',
                    value: {query:'hotstamp'}
                },
                {
                    label: 'Offset Cups',
                    value: {query:'offset_cups'}
                },
                {
                    label: 'Offset Napkins',
                    value: {query:'offset_napkins'}
                },
                {
                    label: 'Outsourced',
                    value: {query:'outsourced'}
                },
                {
                    label: 'Pad',
                    value: {query:'pad'}
                },
                {
                    label: 'Screen Cups',
                    value: {query:'screen_cups'}
                },
                {
                    label: 'Screen Napkins',
                    value: {query:'screen_napkins'}
                },

            ];
        }
    }
}
</script>