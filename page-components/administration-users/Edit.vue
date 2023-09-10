<template>
    <modal ref="modal_editentry" @close="() => {
        setState({ ...state, selected: null });
        $router.push('/administration/administrators');
    }" id="modaledit" nofooter contentclass="xl:w-3/12 lg:w-4/12 md:w-5/12 sm:w-7/12">
        <template v-if="state.selected" slot="header">
            <h4 class="--text-heading text-lg font-semibold">
                <span>Edit User ({{state.selected.__title}})</span>
            </h4>
        </template>

        <template v-if="state.selected" slot="content">
            <EditForm/>
        </template>
    </modal>
</template>
<script>
import Modal from "@components/reusables/Modal.vue";
import EditForm from "@components/editforms/Admin.vue";

import { mapState, mapMutations } from "vuex"
export default {
    name: 'AdminUsersEdit',
    components: {
        Modal,
        EditForm
    },
    computed: {
        ...mapState({
            state: state => state.administration.users.state
        })
    },
    methods: {
        ...mapMutations('administration/users', [
            'setState',
        ])
    }
}
</script>