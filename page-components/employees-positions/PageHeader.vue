<template>
    <div class="mb-10 mt-5">
        <h3 class="text-lg mb-3 --text-heading font-semibold">Positions</h3>
        <breadcrumbs
        :lists="[
            { text: 'Employees', link: '/employees' },
            { text: 'Positions' }
        ]"
        />
    </div>
</template>
<script>
import Breadcrumbs from "@components/reusables/Breadcrumbs.vue";
export default {
    name: 'EmployeesPositionsPageHeader',
    components: {
        Breadcrumbs
    },
}
</script>