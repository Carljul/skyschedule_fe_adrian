<template>
    <div class="mb-10 mt-5">
        <h3 class="text-lg mb-3 --text-heading font-semibold">Permissions</h3>
        <breadcrumbs
        :lists="[
            { text: 'Employees', link: '/employees' },
            { text: 'Positions', link: '/employees/positions' },
            { text: state.position.position, link: `/employees/positions?uid=${state.position.uid}` },
            { text: 'Permissions' }
        ]"
        />
    </div>
</template>
<script>
import Breadcrumbs from "@components/reusables/Breadcrumbs.vue";
import { mapState } from "vuex";

export default {
    name: 'EmployeesPositionPermissionPageHeader',
    components: {
        Breadcrumbs
    },
    computed: {
        ...mapState({
            state: state => state.employees.position_permission.state
        })
    }
}
</script>