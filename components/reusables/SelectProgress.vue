<template>
    <t-select
    v-bind="$attrs" 
    v-on="$listeners"
    :options="priorityLists"
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
        priorityLists() {
            return [
                {
                    label: '0%',
                    value: '0%',
                },
                {
                    label: '10%',
                    value: '10%',
                },
                {
                    label: '25%',
                    value: '25%',
                },
                {
                    label: '50%',
                    value: '50%',
                },
                {
                    label: '100%',
                    value: '100%'
                }
            ];
        }
    }
}
</script>