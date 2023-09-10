<template>
    <div class="mb-10 mt-5">
        <h3 class="text-lg mb-3 --text-heading font-semibold">Administrators</h3>
        <breadcrumbs
        :lists="[
            { text: 'Administration' },
            { text: 'Administrators' }
        ]"
        />
    </div>
</template>
<script>
import Breadcrumbs from "@components/reusables/Breadcrumbs.vue";
export default {
    name: 'AdminUsersPageHeader',
    components: {
        Breadcrumbs
    },
}
</script>