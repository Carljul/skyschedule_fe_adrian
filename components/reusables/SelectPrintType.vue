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
                    value: {printType:1}
                },
                {
                    label: 'Digital Cups',
                    value: {printType:'digital_cups'}
                },
                {
                    label: 'Digital Napkins',
                    value: {printType:'digital_napkins'}
                },
                {
                    label: 'Digital Other',
                    value: {printType:'digital_other'}
                },
                {
                    label: 'Hotstamp',
                    value: {printType:'hotstamp'}
                },
                {
                    label: 'Offset Cups',
                    value: {printType:'offset_cups'}
                },
                {
                    label: 'Offset Napkins',
                    value: {printType:'offset_napkins'}
                },
                {
                    label: 'Outsourced',
                    value: {printType:'outsourced'}
                },
                {
                    label: 'Pad',
                    value: {printType:'pad'}
                },
                {
                    label: 'Screen Cups',
                    value: {printType:'screen_cups'}
                },
                {
                    label: 'Screen Napkins',
                    value: {printType:'screen_napkins'}
                },

            ];
        }
    }
}
</script>