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
                    label: 'Complete',
                    value: {query:'complete'}
                },
                {
                    label: 'Held',
                    value: {query:'held'}
                },
                {
                    label: 'Loading Dock',
                    value: {query:'loading_dock'}
                },
                {
                    label: 'Outputting',
                    value: {query:'outputting'}
                },
                {
                    label: 'Packaging',
                    value: {query:'packaging'}
                },
                {
                    label: 'Printing',
                    value: {query:'printing'}
                },
                {
                    label: 'Proofing',
                    value: {query:'proofing'}
                },
                {
                    label: 'Screening',
                    value: {query:'screening'}
                },
                {
                    label: 'Shipping',
                    value: {query:'shipping'}
                },
                {
                    label: 'Woa',
                    value: {query:'woa'}
                },

            ];
        }
    }
}
</script>