<template>
    <div class="mb-10 mt-5">
        <h3 class="text-lg mb-3 --text-heading font-semibold">Permissions</h3>
        <breadcrumbs
        :lists="[
            { text: 'Employees', link: '/employees' },
            { text: state.employee.full_name, link: `/employees?uid=${state.employee.uid}` },
            { text: 'Permissions' }
        ]"
        />
    </div>
</template>
<script>
import Breadcrumbs from "@components/reusables/Breadcrumbs.vue";
import { mapState } from "vuex";

export default {
    name: 'EmployeesIndexPermissionPageHeader',
    components: {
        Breadcrumbs
    },
    computed: {
        ...mapState({
            state: state => state.employees.employee_permission.state
        })
    }
}
</script>