<template>
    <nav class="flex" >
        <ol class="inline-flex items-center space-x-1">

            <li class="inline-flex items-center">
                <nuxt-link v-if="!disablemain" to="/" class="inline-flex items-center text-xs font-medium --text-primary --text-primary-hover">
                    Home
                </nuxt-link>
                <span v-else class="text-xs font-medium --text-dark">Home</span>
            </li>


            <template v-for="list in lists">
                <li aria-current="page" class="inline-flex items-center"
                v-if="!list.hidden"
                >

                    <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    <nuxt-link v-if="list.link" :to="list.link" class="ml-1 text-xs font-medium md:ml-2 --text-primary --text-primary-hover">{{list.text}}</nuxt-link>
                    <span v-else class="ml-1 text-xs font-medium --text-dark">{{list.text}}</span>
                </li>
            </template>

        </ol>
    </nav>
</template>
<script>
    export default {
        props: ['lists', 'disablemain']
    }
</script>