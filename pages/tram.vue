<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">Username</label>
        <input v-model="username" type="text" id="username" required />
      </div>
      <div>
        <label for="password">Password</label>
        <input v-model="password" type="password" id="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
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
  }
};
</script>

<style scoped>
/* Add your CSS here */
</style>
