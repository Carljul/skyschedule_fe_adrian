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
                    value: {status:1}
                },
                {
                    label: 'Complete',
                    value: {status:'complete'}
                },
                {
                    label: 'Held',
                    value: {status:'held'}
                },
                {
                    label: 'Loading Dock',
                    value: {status:'loading_dock'}
                },
                {
                    label: 'Outputting',
                    value: {status:'outputting'}
                },
                {
                    label: 'Packaging',
                    value: {status:'packaging'}
                },
                {
                    label: 'Printing',
                    value: {status:'printing'}
                },
                {
                    label: 'Proofing',
                    value: {status:'proofing'}
                },
                {
                    label: 'Screening',
                    value: {status:'screening'}
                },
                {
                    label: 'Shipping',
                    value: {status:'shipping'}
                },
                {
                    label: 'Woa',
                    value: {status:'woa'}
                },

            ];
        }
    }
}
</script>