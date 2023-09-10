<template>
    <div v-if="appIsAdmin && getOrgUID">
        <async-button 
        @click="manageInOut"
        ref="manageinout"
        type="button" 
        :title="`You are managing ${$auth.user.admin.organization.organization}`"
        v-tooltip="`You are managing ${$auth.user.admin.organization.organization}`"
        class="btn py-2 px-5 rounded --text-light --bg-danger text-sm uppercase font-bold w-40 text-center cursor-pointer w-fit">
            Manage out
        </async-button>
    </div>
</template>
<script>
import AsyncButton from "@components/reusables/AsyncButton.vue";
import { mapActions } from "vuex"
export default {
    name: 'TimersManageInOut',
    components: {
        AsyncButton
    },
    methods: {
        ...mapActions('administration/organizations', [
            'organizationSignInOutAdmin'
        ]),
        async manageInOut(payload) {
            this.$refs.manageinout.loading = true;
            await this.organizationSignInOutAdmin(null);
            this.notify({ title: 'Done!', html: payload.value ? `Successfully In, you are now managing ${this.$auth.user.admin.organization.organization}` : 'Successfully Managed Out' });
        }
    }
}
</script>