<template>
    <modal ref="permissionsmodal" 
    nofooter 
    contentclass="xl:w-3/12 md:w-5/12 sm:w-7/12"
    @close="() => {
        setState({ handle: 'state.entry', key: 'data', value: [] })
    }"
    >
        <template slot="header">
            <h4 class="--text-heading text-lg font-semibold">
                <span class="block">{{state.data.full_name}}</span>
                <span class="block --text-primary">Notifications</span>
            </h4>
        </template>

        <template slot="content">
            <div class="mb-5">
                <SwitchToggle 
                :value="getNotificationValues.system"
                @input="e => {
                    entryPostOrUpdate({ key: notificationKeys.system, value: e });
                }"
                > <span class="--text-dark text-sm">System Notification</span></SwitchToggle>
            </div>
            
            <div class="mb-5">
                <SwitchToggle 
                :value="getNotificationValues.email"
                @input="e => {
                    entryPostOrUpdate({ key: notificationKeys.email, value: e });
                }"
                > <span class="--text-dark text-sm">Email Notification</span></SwitchToggle>
            </div>

            <div class="mb-5">
                <SwitchToggle 
                :value="getNotificationValues.slack"
                @input="e => {
                    entryPostOrUpdate({ key: notificationKeys.slack, value: e });
                }"
                > <span class="--text-dark text-sm">Slack Notification</span></SwitchToggle>
            </div>

        </template>
    </modal>
</template>

<script>
import Modal from "@components/reusables/Modal.vue";
import SwitchToggle from "@components/reusables/SwitchToggle.vue";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
    name: 'EmployeesLeavesModal',
    components: {
        Modal,
        SwitchToggle
    },
    computed: {
        ...mapState({
            state: state => state.employees.employee_notification.state
        }),
        notificationKeys() {
            return {
                email: '__NOTIFICATION_EMAIL',
                slack: '__NOTIFICATION_SLACK',
                system: '__NOTIFICATION_SYSTEM'
            }
        },
        getNotificationValues() {
            const email = this.state.entry.data.find(row => row.meta_key == this.notificationKeys.email);
            const slack = this.state.entry.data.find(row => row.meta_key == this.notificationKeys.slack);
            return {
                email: email && parseInt(email.meta_value),
                slack: slack && parseInt(slack.meta_value)
            }
        }
    },
    methods: {
        ...mapMutations('employees/employee_notification', [
            'resetInputs',
            'setState'
        ]),
        ...mapActions('employees/employee_notification', [
            'entryPostOrUpdate'
        ])
    }
}
</script>