<template>
    <div class="login">
        <h1>Hello</h1>
        <div class="login-form">
            <div>
                <div>
                    <label>
                        <input placeholder="login" v-model="login"/>
                    </label>
                </div>
            </div>
            <button @click="loginClickHandler">login</button>
        </div>
    </div>
</template>

<script>
import AuthApi from '../api/auth'

export default {
  name: 'login',
  data () {
    return {
      login: ''
    }
  },
  methods: {
    loginClickHandler: async function () {
      const { message, status } = await AuthApi.login(this.login)

      if (status === 'success') {
        localStorage.setItem('username', this.login)
        this.$router.replace(this.$route.query.redirect || '/')
      } else {
        alert(`${status} ${message}`)
      }
    }
  }
}
</script>

<style scoped>
    .login {
        display: flex;
        align-items: center;
        vertical-align: center;
        justify-content: center;
    }

    .login-form {
        padding: 50px;
        display: flex;
    }
</style>
