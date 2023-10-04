<template>
    <modal ref="modal_editentry" @close="() => {
        setState({ ...state, selected: null });
        $router.push('/user');
    }" nofooter contentclass="xl:w-6/12 md:w-9/12 sm:w-11/12">
        <template v-if="state.selected" slot="header">
            <h4 class="--text-heading text-lg font-semibold">
                <span>Edit Employee ({{ state.selected.__title }})</span>
            </h4>
        </template>

        <template v-if="state.selected" slot="content">
            <EditForm />
        </template>
    </modal>
</template>

<script>
import Modal from "@components/reusables/Modal.vue";
import EditForm from "@components/editforms/Employee.vue";

import { mapState, mapMutations } from "vuex";
export default {
    name: 'UsersIndexEdit',
    components: {
        Modal,
        EditForm
    },
    computed: {
        ...mapState({
            state: state => state.main.user.state
        }),
    },
    methods: {
        ...mapMutations('main/user', [
            'setState'
        ])
    }
}
</script>