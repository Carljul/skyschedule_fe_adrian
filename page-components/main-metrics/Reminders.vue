<template>
    <div class="reminders-tab mt-20" :class="{ 'opacity-50 pointer-events-none': state.entry.loading }">
        <h3 class="text-lg flex items-center mb-3 --text-heading font-semibold">Reminders  

            <span class="--text-dark cursor-pointer flex w-fit ml-4"
            v-if="permissionCheck(permissions.manage)"
            @click="() => {
                if(getReminder) {
                    setState({ 
                        handle: 'state', 
                        key: 'metricsReminderInput', 
                        value: getReminder
                    }); 
                } else {
                    resetRemindersInput();
                }
                setState({ handle: 'state', key: 'editmode', value: true });
            }"
            :title="appdefaults.edit" v-tooltip="appdefaults.edit"
            >
                <icon-edit />
            </span>
        </h3>

        <client-only v-if="state.editmode">
            <editor 
            :value="state.metricsReminderInput.metrics_value"
            @input="e => setState({ handle: 'state.metricsReminderInput', key: 'metrics_value', value: e })"
            />
            <async-button @click="saveReminder" ref="reminderasync" type="submit" 
            :class="`p-2 ${btnclassnormal} mt-3`"
            >Save</async-button>

            <button
            class="text-sm bg-gray-200 p-2 rounded --text-dark ml-1 px-4"
            type="button"
            @click="() => {
                setState({ handle: 'state', key: 'editmode', value: false }); 
                resetRemindersInput();
            }"
            >Cancel</button>
        </client-only>

        <div v-else>
            <div v-html="getReminder ? getReminder.metrics_value : ''" class="mr-3 --text-dark"></div>
        </div>

    </div>
</template>

<script>
import Editor from "@components/reusables/Editor.vue";
import AsyncButton from "@components/reusables/AsyncButton.vue";
import IconEdit from "@components/reusables/IconEdit.vue";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import permissions from "@permissions/metrics.js";

export default {
    name: 'MainMetricsReminders',
    components: {
        AsyncButton,
        Editor,
        IconEdit
    },
    computed: {
        ...mapState({
            state: state => state.main.metrics.state
        }),
        ...mapGetters('main/metrics', [
            'getReminder'
        ]),
        ...permissions
    },
    methods: {
        ...mapMutations('main/metrics', [
            'setState',
            'resetRemindersInput',
            'updateEntryDataResponse'
        ]),
        ...mapActions('main/metrics', [
            'saveReminderMetrics'
        ]),
        setLoading(loading) {
            const e = this;
            this.$nextTick(async () => {
                e.$refs.reminderasync.loading = loading;
            });
        },
        async saveReminder() {
            try {
                this.setLoading(true);
                await this.saveReminderMetrics();
            } catch($e) {
                this.errorHandle($e);
            }
        }
    }
}
</script>