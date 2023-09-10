<template>
    <div class="mb-10 mt-5">
        <h3 class="text-lg mb-3 --text-heading font-semibold">Departments</h3>
        <breadcrumbs
        :lists="[
            { text: 'Employees', link: permissionCheck(permissions.manage) ? '/employees' : null },
            { text: 'Departments' }
        ]"
        />
    </div>
</template>
<script>
import Breadcrumbs from "@components/reusables/Breadcrumbs.vue";
import permissions from "@permissions/employee.js";

export default {
    name: 'EmployeesDepartmentPageHeader',
    components: {
        Breadcrumbs
    },
    computed: {
        ...permissions
    }
}
</script>