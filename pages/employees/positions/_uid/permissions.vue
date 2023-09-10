<template>
    <div class="employees-index-page mb-10">
        <page-header />

        <div class="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 gap-4">
            <div>
                <page-search />
            </div>

            <div>

            </div>
            <div>

            </div>

            <div>
                <page-form />
            </div>

        </div>
        
        <page-lists class="mt-5" />

    </div>
</template>
<script>
import PageHeader from "@page_components/employees-positions-permission/PageHeader.vue";
import PageLists from "@page_components/employees-positions-permission/Lists.vue";
import PageSearch from "@page_components/employees-positions-permission/Search.vue";
import PageForm from "@page_components/employees-positions-permission/Form.vue";

import { mapState, mapActions } from "vuex";
import defaults from "~/defaults.js";

export default {
    name: "EmployeesPermissionPositionIndexPage",
    layout: "main",
    middleware: ['auth', 'organizationUID', 'permission'],
    ssr: false,
    meta: {
        permissionKey: `permission_position_manage`
    },
    head() {
        return {
            title: `${this.position.position} - Permissions` + this.theAppTitle
        }
    },
    async asyncData({ params, error, $axios, store }) {
        try {
            const res = await $axios.get(`/${store.state.global.state.organizationUID}/positions/${params.uid}`);
            store.commit('employees/position_permission/setState', { handle: 'state', key: 'position', value: res.data.response });
            return { position: res.data.response }
        } catch(err) {
            error({
                statusCode: 404, 
                message: defaults.notfound
            });
        }
    },
    components: {
        PageHeader,
        PageLists,
        PageSearch,
        PageForm
    },
    computed: {
        ...mapState({
            state: state => state.employees.position_permission.state
        })
    },
    methods: {
        ...mapActions('employees/position_permission', [
            'fetchEntry'
        ])
    },
    async mounted() {
        await this.fetchEntry();
    }
}
</script>