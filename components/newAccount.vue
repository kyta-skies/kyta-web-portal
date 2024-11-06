<template>
    <div>
        <h1>{{ message }}</h1>
        <p class="text-2xl font-bold">New account</p>
        <NuxtLink to="/" class="text-blue-600">Log in</NuxtLink>
    </div>
</template>

<script>
export default{
    name: 'newAccount',
    data(){
        return{
            message: 'Welcome',
        }
    }
}
</script>