<template>
    <div class="main-ability-page mb-10">
        
        <div class="mb-10 mt-5">
            <breadcrumbs
            :lists="[
                { text: 'Ability' }
            ]"
            />
        </div>

        <page-search />

        <page-lists />

        <page-form />

    </div>
</template>
<script>
import Breadcrumbs from "@components/reusables/Breadcrumbs.vue";
import PageFilter from "@page_components/main-ability/Filter.vue";
import PageSearch from "@page_components/main-ability/Search.vue";
import PageLists from "@page_components/main-ability/Lists.vue";
import PageForm from "@page_components/main-ability/Form.vue";

import { mapActions } from "vuex";

export default {
    name: "MainAbilityPage",
    layout: "main",
    middleware: ['auth'],
    ssr: false,
    components: {
        PageFilter,
        PageLists,
        Breadcrumbs,
        PageSearch,
        PageForm
    },
    head() {
        return {
            title: 'Ability' + this.theAppTitle
        }
    },
    methods: {
        ...mapActions('main/ability', [
            'fetchEntry',
            'fetchByUID'
        ]),
        ...mapActions('global', [
            'assignPage',
        ]),
    },
    watch: {
        $route: async function(to, from) {
            if(to.query.uid) {
                this.nuxtload();
                await this.fetchByUID(to.query.uid);
                this.nuxtunload();
            } else {
                this.findPageComponent('MainAbilityForm').$refs.adjustmentmodal.open=false;
            }
        }
    },
    async created() {
        await this.assignPage('Abilities')
    },
    async mounted() {
        
        this.fetchEntry();

        if(this.$route.query.uid) {
            this.nuxtload();
            await this.fetchByUID(this.$route.query.uid);
            this.nuxtunload();
        }
    }
}
</script>