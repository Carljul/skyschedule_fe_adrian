<template>
    <div v-click-outside="vclickoutside" class="relative">
        <div @click="open=!open" :class="`inline ${parentclass?parentclass:''} ${open&&openparentclass?openparentclass:''} ${!open&&closeparentclass?closeparentclass:''}`">
            <slot name="parent" :status="open"></slot>
        </div>
        <div :class="`${childclass ? childclass : ''} ${childslotclass}`">
            <slot :status="open" />
        </div>
    </div>
</template>
<script>
export default {
    props: ['clickoutside', 'openclass', 'closeclass', 'childclass', 'parentclass', 'openparentclass', 'closeparentclass'],
    data() {
        return {
            open: false
        }
    },
    computed: {
        childslotclass() {
            if(this.openclass && this.open) { return this.openclass; }
            if(this.closeclass && !this.open) { return this.closeclass; }
            return '';
        }
    },
    methods: {
        vclickoutside() {
            if(this.clickoutside) { return; }
            this.open = false;
        }
    }
}
</script>
