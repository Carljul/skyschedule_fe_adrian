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
                    label: 'Pending',
                    value: '0',
                },
                {
                    label: 'Declined',
                    value: '2',
                },
                {
                    label: 'Approved',
                    value: '1'
                }
            ];
        }
    }
}
</script>