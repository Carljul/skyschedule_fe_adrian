<template>
    <div class="items-center space-x-3 flex">

        <!-- avatar button -->
        <dropdown ref="popupdduser" class="relative"
        openclass="block relative z-10" 
        closeclass="hidden"
        >
            <template slot="parent">
                <button class="p-1 bg-gray-200 rounded-full focus:outline-none focus:ring">

                    <template>
   
                        <img
                           
                            class="object-cover w-8 h-8 rounded-full"
                            src="~/static/user-profile.png"
                            :alt="$auth.user.name"
                        />
                    </template>

                    <!-- <template v-if="appIsOrganization">
                        <img
                            v-if="$auth.user.organization.logo && $auth.user.organization.logo.url"
                            class="object-cover w-8 h-8 rounded-full"
                            :src="$auth.user.organization.logo.url"
                            :alt="$auth.user.name"
                        />
                        <img
                            v-else
                            class="object-cover w-8 h-8 rounded-full"
                            src="~/static/user-profile.png"
                            :alt="$auth.user.name"
                        />
                    </template> -->
                </button>
                <!-- green dot -->
                <div class="absolute right-0 p-1 bg-green-400 rounded-full bottom-3 animate-ping"></div>
                <div class="absolute right-0 p-1 bg-green-400 border border-white rounded-full bottom-3"></div>
            </template>

            <!-- Dropdown card -->
            <div
            class="absolute mt-4 transform -translate-x-full bg-white rounded-md shadow min-w-max ml-10"
            >
                <div class="flex flex-col p-4 space-y-1 font-medium border-b">
                    <span class="text-gray-800 text-capitalize">{{$auth.user.name}}</span>
                    <a :href="`mailto:${$auth.user.email}`" :class="linkclass">{{$auth.user.email}}</a>
                </div>
                <ul class="flex flex-col p-2 my-2 space-y-1">
                    <li>
                        <a href="/settings" @click.prevent="navigateTo('/settings')" class="block px-2 py-1 transition rounded-md hover:bg-gray-100 text-sm">Settings</a>
                    </li>
                    <li>
                        <a href="#" class="block px-2 py-1 transition rounded-md hover:bg-gray-100 text-sm">Preferences</a>
                    </li>
                    <li>
                        <a href="#" @click.prevent="logout" class="block px-2 py-1 transition rounded-md hover:bg-gray-100 text-sm">Logout</a>
                    </li>
                </ul>
            </div>
        </dropdown>

    </div>
</template>

<script>
import Dropdown from "@components/reusables/Dropdown.vue";
export default {
    components: {
        Dropdown
    },
    methods: {
        async logout() {
            this.$refs.popupdduser.open=false;
            await this.$auth.logout();
            window.location.href="/";
        },
        navigateTo(href) {
            this.$router.push(href);
            this.$refs.popupdduser.open = false;
        }
    }
}
</script>