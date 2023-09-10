<template>
    <div class="--pref-wrap --bg-theme --text-gray xl:text-white">
        <div class="flex items-center justify-center min-h-screen login-bg">
            <div class="max-w-md w-full">
                    <nuxt />
            </div>
        </div>
    </div>
</template>
<style scoped>
.login-bg{
    background-image: url('http://localhost:3000/login-bg.jpg');
    background-size: cover;
    background-position: center;
}
</style>
<script>

export default {
    name: 'AuthLayout'
}
</script>
