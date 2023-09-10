<template>
    <div class="main-user-page mb-10">
        
        <div class="mb-10 mt-5">
            <breadcrumbs
            :lists="[
                { text: 'User' }
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
import PageFilter from "@page_components/main-user/Filter.vue";
import PageSearch from "@page_components/main-user/Search.vue";
import PageLists from "@page_components/main-user/Lists.vue";
import PageForm from "@page_components/main-user/Form.vue";

import { mapActions } from "vuex";

export default {
    name: "MainUserPage",
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
            title: 'User' + this.theAppTitle
        }
    },
    methods: {
        ...mapActions('main/user', [
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
                this.findPageComponent('MainUserForm').$refs.adjustmentmodal.open=false;
            }
        }
    },
    async created() {
        await this.assignPage('Users')
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