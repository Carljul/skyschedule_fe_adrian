<template>
    <client-only>
        <v-date-picker
        v-bind="$attrs" 
        v-on="$listeners"
        :is24hr="is24hours"
        :popover="{ visibility: 'click', transition: 'none', hideDelay: 0 }"
        :modelConfig="{ type: 'string', mask: datetimeformat }"
        >
            <template v-slot="{ inputValue, inputEvents }">
            <div class="flex flex-col sm:flex-row justify-start items-center">
                <div class="relative flex-grow">
                <svg
                    class="text-gray-600 w-4 h-full mx-2 absolute pointer-events-none"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                </svg>
                <input
                    class="flex-grow pl-8 p-2 border rounded w-full --text-dark appearance-none"
                    :value="inputValue"
                    v-on="inputEvents"
                    readonly
                />
                </div>
            </div>
            </template>
        </v-date-picker>
    </client-only>
</template>

<script>
export default {
    components: {
        vDatePicker: async () => {
            if(process.client) {
                const vDatePicker = await import('v-calendar/lib/components/date-picker.umd');
                return vDatePicker;
            }
        },
    }
}
</script>