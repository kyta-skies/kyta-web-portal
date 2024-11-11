<template>
    <div>
        <h1>Welcome, {{ username }}!</h1>
        <p>You have successfully logged in.</p>
        <p>Time remaining in session: {{ formattedTimeLeft }}</p>
        <button @click="handleLogout">Log out</button>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref('User'); // Replace with actual username if available

// Set session expiration time (from localStorage) and start countdown
const expirationTime = ref(localStorage.getItem('sessionExpiration') || Date.now());
const timeLeft = ref(expirationTime.value - Date.now());
let countdownTimer = null;

// Format the remaining time as mm:ss for display
const formattedTimeLeft = computed(() => {
    const minutes = Math.floor(timeLeft.value / 60000);
    const seconds = Math.floor((timeLeft.value % 60000) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
});

// Update the countdown timer every second
function startCountdown() {
    countdownTimer = setInterval(() => {
        timeLeft.value = expirationTime.value - Date.now();

        if (timeLeft.value <= 0) {
            clearInterval(countdownTimer);
            handleLogout(); // Log out when time is up
        }
    }, 1000);
}

// Log out user
function handleLogout() {
    localStorage.removeItem('sessionExpiration');
    clearInterval(countdownTimer);
    router.push('/login'); // Redirect to login page
}

// Start countdown on mount, stop on unmount
onMounted(() => {
    timeLeft.value = expirationTime.value - Date.now();
    startCountdown();
});

onBeforeUnmount(() => {
    clearInterval(countdownTimer);
});


</script>

