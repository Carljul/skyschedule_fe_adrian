<template>
    <label class="inline-block cursor-pointer"
    >
        <slot name="prepend"/>
        <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in"
        :title="!tooltipEnabled ? '' : getTooltipTitle" 
        v-tooltip="!tooltipEnabled ? '' : getTooltipTitle"
        >
            <input type="checkbox"
            :checked="value" 
            @change="$emit('input', $event.target.checked ? 1 : 0)"
            :id="`switch-toggle-${nuxtuniqid}`" 
            class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-2 appearance-none cursor-pointer"/>
            <span class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></span>
        </div>
        <slot/>
    </label>
</template>


<script>
export default {
    props: {
        value: {
            type: Number,
            default: () => 0
        },
        tooltipEnabled: {
            type: Boolean,
            default: () => true
        },
        titleTrue: {
            type: String,
            default: () => `Disable`
        },
        titleFalse: {
            type: String,
            default: () => `Enable`
        }
    },
    computed: {
        getTooltipTitle() {
            if(this.value==1) {
                return this.titleTrue;
            }
            return this.titleFalse;
        }
    }
}
</script>

<style lang="scss" scoped>
.toggle-checkbox:checked {
    right: 0;
    border-color: var(--pref-color-success);
}
.toggle-checkbox:checked + .toggle-label {
    background-color: var(--pref-color-success);
}
</style>