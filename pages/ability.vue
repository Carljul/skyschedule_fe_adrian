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
        <page-form />
        <edit-form />
        <page-lists />

        

    </div>
</template>
<script>
import Breadcrumbs from "@components/reusables/Breadcrumbs.vue";
import PageFilter from "@page_components/main-ability/Filter.vue";
import PageSearch from "@page_components/main-ability/Search.vue";
import PageLists from "@page_components/main-ability/Lists.vue";
import PageForm from "@page_components/main-ability/Form.vue";
import EditForm from "@page_components/main-ability/Edit.vue";
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
        PageForm,
        EditForm
    },
    head() {
        return {
            title: 'Ability' + this.theAppTitle
        }
    },
    methods: {
        ...mapActions('main/ability', [
            'fetchEntry',
            'fetchByID'
        ]),
    },
    watch: {
        $route: async function(to, from) {
            if(to.query.id) {
                this.nuxtload();
                await this.fetchByID(to.query.id)
                this.nuxtunload();
            } else {                
                this.findPageComponent('AbilityIndexEdit').$refs.modal_editentry.open=false;

            }
        }
    },
    async mounted() {
        
        this.fetchEntry();

        if(this.$route.query.id) {
            this.nuxtload();
            await this.fetchByID(this.$route.query.id);
            this.nuxtunload();
        }
    }
}
</script>