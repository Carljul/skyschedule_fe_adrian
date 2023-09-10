<template>
    <div class="mb-10 mt-5">
        <h3 class="text-lg mb-3 --text-heading font-semibold">Organizations</h3>
        <breadcrumbs
        :lists="[
            { text: 'Administration' },
            { text: 'Organizations' }
        ]"
        />
    </div>
</template>
<script>
import Breadcrumbs from "@components/reusables/Breadcrumbs.vue";
export default {
    name: 'AdminOrganizationsPageHeader',
    components: {
        Breadcrumbs
    },
}
</script>