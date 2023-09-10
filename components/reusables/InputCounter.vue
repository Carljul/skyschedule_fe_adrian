<template>
    <span class="block text-xs --text-dark font-bold float-right">{{getLength}}/{{getMax}}</span>
</template>
<script>
export default {
    props: ['value', 'max'],
    computed: {
        getMax() {
            const max = parseInt(Number(this.max));
            return isNaN(max) ? 0 : max;
        },
        getLength() {
            if(!this.value) { return 0; }
            const vallength = parseInt(Number(this.value.length));
            return isNaN(vallength) ? 0 : vallength;
        }
    }
}
</script>
