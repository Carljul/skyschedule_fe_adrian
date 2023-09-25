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
import { mapState, mapMutations, mapActions } from "vuex";
export default {
    name: 'MainOrderPrintButton',
    computed: {
        ...mapState({
            state: state => state.order.order.state
        }),
    },
    methods: {
        ...mapMutations('order/order', [
            'setState'
        ]),
        ...mapActions('order/order', [
            'fetchEntry'
        ])
    }
}
</script>