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
                    label: 'Pending',
                    value: 'Pending',
                },
                {
                    label: 'For Review',
                    value: 'For Review',
                },
                {
                    label: 'Revisions',
                    value: 'Revisions',
                },
                {
                    label: 'New Site',
                    value: 'New Site',
                },
                {
                    label: 'Completed',
                    value: 'Completed'
                }
            ];
        }
    }
}
</script>