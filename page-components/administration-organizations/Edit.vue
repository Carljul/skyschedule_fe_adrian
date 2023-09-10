<template>
    <modal ref="modal_editentry" @close="() => {
        setState({ ...state, selected: null });
        $router.push('/administration/organizations');
    }" id="modaledit" nofooter contentclass="xl:w-5/12 md:w-6/12 sm:w-8/12">
        <template v-if="state.selected" slot="header">
            <h4 class="--text-heading text-lg font-semibold">
                <span>Edit Organization ({{state.selected.__title}})</span>
            </h4>
        </template>

        <template v-if="state.selected" slot="content">
            <EditForm/>
        </template>
    </modal>
</template>
<script>
import Modal from "@components/reusables/Modal.vue";
import EditForm from "@components/editforms/Organization.vue";

import { mapState, mapMutations } from "vuex";
export default {
    name: 'AdminOrganizationsEdit',
    components: {
        Modal,
        EditForm
    },
    computed: {
        ...mapState({
            state: state => state.administration.organizations.state
        })
    },
    methods: {
        ...mapMutations('administration/organizations', [
            'setState',
        ])
    }
}
</script>