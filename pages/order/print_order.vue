<template>
    <div class="main-order-page">
        <page-lists />
    </div>
</template>
<script>
import PageLists from "@page_components/main-order/PrintList.vue";

export default {
    name: "MainOrderPage",
    middleware: ['auth'],
    ssr: false,
    components: {
        PageLists,
    },
    head() {
        return {
            title: 'Order' + this.theAppTitle
        }
    },
}
</script>