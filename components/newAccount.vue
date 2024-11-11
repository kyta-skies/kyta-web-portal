<template>
    <div class="h-screen flex flex-col justify-center items-center gap-8 ">
      <IconsLoad class="text-[#980E70] text-3xl" />
      <div class="w-full max-w-xs bg-indigo-100 backdrop-filter-backdrop-blur-sm rounded p-5">
        <p v-if="errorMessage" class="text-red-600 text-center">{{ errorMessage }}</p>
        <header>
          <h1 class="text-center text-[#980E70] text-lg font-bold">KYTA SKIES</h1>
        </header>
        <form @submit.prevent="handleLogin">
          <div>
            <label class="block mb-2 text-[#980E70]" for="username">Username</label>
            <input
              class="w-full bg-gray-500 rounded p-2 mb-6 text-[#980E70] border-b-2 border-[#980E70] outline-none focus:bg-gray-300"
              type="text" v-model="username" name="username">
          </div>
          <div>
            <label class="block mb-2 text-[#980E70]" for="password">Password</label>
            <input
              class="w-full bg-gray-500 rounded p-2 mb-6 text-[#980E70] border-b-2 border-[#980E70] outline-none focus:bg-gray-300"
              type="password" v-model="password" name="password">
          </div>
          <div>
            <input class="w-full bg-[#980E70] hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded" type="submit"
              value="Create Account">
          </div>
        </form>
        <footer class="flex flex-col justify-center items-center gap-2">
          <h1 class="text-gray-600 text-sm float-left">
            Have an account ?
          </h1>
          <NuxtLink to="/" class="text-[#980E70] hover:text-pink-700 text-sm float-left">
            Log in
          </NuxtLink>
        </footer>
   
     
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'login',
    data() {
      return {
        username: '',
        password: '',
        errorMessage: ''
      }
    },
    methods: {
      async handleLogin() {
        try {
          const response = await this.$axios.post('/api/auth', {
            username: this.username,
            password: this.password
          });
          if (response.data.success) {
            window.location.href = response.data.redirectURL;
          } else {
            this.errorMessage = 'Authentication failed. Please try again.';
          }
        } catch (error) {
          this.errorMessage = 'An error occurred during login.';
        }
      }
    },
  }
  </script>