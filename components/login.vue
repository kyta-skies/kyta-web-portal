<template>
  <div class="h-screen flex flex-col justify-center items-center gap-8 ">
    <IconsWifi class="text-[#980E70] text-3xl" />
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
            value="Log in">
        </div>
      </form>
      <footer class="flex justify-between">
        <NuxtLink to="/resetPassword" class="text-[#980E70] hover:text-pink-700 text-sm float-left">
          Forget Password
        </NuxtLink>
        <NuxtLink to="/createAccount" class="text-[#980E70] hover:text-pink-700 text-sm float-left">
          Create Account
        </NuxtLink>
      </footer>
    </div>
    <div class="flex flex-col w-full text-center gap-4 max-w-xs">
      <h1 class="">Access Expired ?</h1>
      <NuxtLink to="/buyData"
        class="w-full max-w-sm group p-5 cursor-pointer relative  text-xl font-semibold border-0 flex items-center justify-center bg-transparent text-[#980E70] h-auto overflow-hidden transition-all duration-100">
        <span class="group-hover:w-full absolute left-0 h-full w-5 border-y border-l border-[#980E70]  transition-all duration-500">
        </span>
        <p class="group-hover:opacity-0 group-hover:translate-x-[-100%] absolute translate-x-0 transition-all
         duration-200">Renew here</p>
        <span
          class="group-hover:translate-x-0  group-hover:opacity-100 absolute  translate-x-full opacity-0  transition-all duration-200">Thank
          you!
        </span>
        <span
          class="group-hover:w-full absolute right-0 h-full w-5  border-y border-r  border-[#980E70] transition-all duration-500">
        </span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref('');
const password = ref('');
const message = ref('');

const SESSION_TIMEOUT = 15 * 60 * 1000; // 15 minutes
let sessionTimeoutTimer = null;

async function handleLogin() {
  try {
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username.value, password: password.value }),
    });
    const data = await response.json();

    if (data.success) {
      message.value = 'Login successful!';
      
      // Set session expiration time
      const expirationTime = Date.now() + SESSION_TIMEOUT;
      localStorage.setItem('sessionExpiration', expirationTime);

      // Redirect to success page and start session timer
      router.push('/success');
      startSessionTimer();
    } else {
      message.value = 'Invalid credentials. Please try again.';
    }
  } catch (error) {
    console.error('Error during login:', error);
    message.value = 'Server error. Please try again later.';
  }
}

// Start session timer to check expiration
function startSessionTimer() {
  stopSessionTimer(); // Clear any existing timer
  sessionTimeoutTimer = setInterval(checkSessionExpiration, 1000); // Check every second
}

// Clear session timer
function stopSessionTimer() {
  if (sessionTimeoutTimer) {
    clearInterval(sessionTimeoutTimer);
    sessionTimeoutTimer = null;
  }
}

// Check if the session is expired
function checkSessionExpiration() {
  const expirationTime = localStorage.getItem('sessionExpiration');
  if (Date.now() > expirationTime) {
    handleLogout();
  }
}

// Logout the user
function handleLogout() {
  localStorage.removeItem('sessionExpiration');
  message.value = 'Session expired. Please log in again.';
  stopSessionTimer();
  router.push('/buyData'); // Redirect to buyData page
}

// Start session timer when the component mounts
onMounted(() => {
  const expirationTime = localStorage.getItem('sessionExpiration');
  if (expirationTime && Date.now() < expirationTime) {
    startSessionTimer();
  }
});

// Clear session timer when the component is unmounted
onBeforeUnmount(() => {
  stopSessionTimer();
});
</script>

