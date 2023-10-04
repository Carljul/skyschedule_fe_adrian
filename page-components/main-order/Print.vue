<template>
    <nuxt-link
        to="/order/print_order"
        target="_blank"
        class="p-2 border-solid border-2 border-green-600 rounded-md"
        exact>
        <span class="text-lg">Print</span>
    </nuxt-link>
</template>
<script>
export default {
    name: 'MainOrderPrintButton'
}
</script>