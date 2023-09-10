<template>
    <div class="settings-index-page">

        <div class="mb-10 mt-5">
            <h3 class="text-lg mb-3 --text-heading font-semibold">Organization Settings</h3>
            <breadcrumbs
            :lists="[
                { text: 'Organization Setting' }
            ]"
            />
        </div>

        <div v-if="!loading" class="w-1/3">
            <EditOrgForm/>
        </div>

    </div>
</template>
<script>
import EditOrgForm from "@components/editforms/Organization.vue";

import Breadcrumbs from "@components/reusables/Breadcrumbs.vue";
import { mapMutations, mapState } from "vuex"
export default {
    name: 'OrganizationSettingsPage',
    middleware: ['auth'],
    layout: 'main',
    components: {
        Breadcrumbs,
        EditOrgForm
    },
    data() {
        return {
            loading: true
        }
    },
    head() {
        return {
            title: 'Organization Settings' + this.theAppTitle
        }
    },
    computed: {
        ...mapState({
            orgstate: state => state.administration.organizations.state
        })
    },
    async mounted() {
        try {
            this.loading = true;
            this.nuxtload();
            const res = await this.$axios.get(`/organization/${this.getOrgUID}`);
            this.orgSetState({
                selected: {
                    ...res.data.response,
                    __title: res.data.response.organization
                }
            });
            this.nuxtunload();
            this.loading = false;
        } catch(err) {
            this.notFound();
        }
    },
    methods: {
        ...mapMutations({
            orgSetState: 'administration/organizations/setState',
        }),
    },
    beforeDestroy() {
        this.orgSetState({ selected: {} });
    }
}
</script>