<template>
    <v-date-picker 
    v-bind="$attrs" 
    v-on="$listeners"
    :is24hr="is24hours"
    :popover="{ visibility: 'click', transition: 'none', hideDelay: 0 }"
    :masks="{ input: datetimemask }"
    :modelConfig="{ type: 'string', mask: datetimeformat }"
    is-range
    ref="daterange"
    :datePicker="{ updateOnInput: true }"
    >
        <template v-slot="{ inputValue, inputEvents, isDragging }">
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
                class="flex-grow pl-8 p-2 border rounded w-full --text-dark"
                :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                :value="inputValue.start"
                v-on="inputEvents.start"
                readonly
            />

            </div>
            <span class="flex-shrink-0 m-2">
            <svg
                class="w-4 h-4 stroke-current text-gray-600"
                viewBox="0 0 24 24"
            >
                <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
            </svg>
            </span>
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
                class="flex-grow pl-8 p-2 border rounded w-full --text-dark"
                :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                :value="inputValue.end"
                v-on="inputEvents.end"
                readonly
            />
            </div>
        </div>

        <div v-if="isComponentClearable" class="reset-link">
            <a v-if="inputValue.start" href="#" @click.prevent="clearDatePicker" class="block text-xs mt-2 mb-5 --text-primary --text-primary-hover">Clear</a>
        </div>
        </template>
    </v-date-picker>
</template>


<script>
export default {
    props: {
        isComponentClearable: {
            type: Boolean,
            default: true
        }
    },
    components: {
        vDatePicker: async () => {
            if(process.client) {
                const vDatePicker = await import('v-calendar/lib/components/date-picker.umd');
                return vDatePicker;
            }
        },
    },
    methods: {
        clearDatePicker() {
            this.$emit('clearDate');
        }
    }
}
</script>