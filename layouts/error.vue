<template>
    <div class="--pref-wrap --bg-theme text-gray-600 xl:text-white">
        <div class="nuxtwrappingcolor">
            <div class="container m-auto">
                <!-- BEGIN: Error Page -->
                <div class="p-5 error-page flex flex-col lg:flex-row items-center justify-center h-screen text-center lg:text-left">
                    <div class="- lg:mr-20">
                        <img alt="Midone - HTML Admin Template" class="h-48 lg:h-auto" src="~/static/error-illustration.svg" style="max-width:500px;">
                    </div>
                    <div class="text-white mt-10 lg:mt-0">
                        <div class=" text-8xl font-medium" v-if="theErrorData.statusCode">{{theErrorData.statusCode}}</div>
                        <div class=" text-xl lg:text-3xl font-medium mt-5" v-if="theErrorData.title">{{theErrorData.title}}</div>
                        <div class=" text-lg mt-3">{{theErrorData.message}}</div>
                        <p class="block mt-10">
                            <nuxt-link :class="btnclass" to="/">Back to Home</nuxt-link>
                        </p>
                    </div>
                </div>
                <!-- END: Error Page -->
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'ErrorLayout',
        props: ['error'],
        head() {
            return {
                title: `${this.theErrorData.title ? this.theErrorData.title : 'Error Page'} - SKY SCHEDULER`
            }
        },
        computed: {
            theErrorData() {
                if(!this.error || this.error.statusCode == 404) {
                    return {
                        statusCode: 404,
                        title: 'Oops. This page has gone missing.',
                        message: 'You may have mistyped the address or the page may have moved.'
                    }
                }

                return this.error;
            }
        }
    }
</script>