<template>
    <div class="app-header">
        header
        <button @click="onLogout">logout</button>
    </div>
</template>

<script>
export default {
  name: 'AppHeader',
  data: function () {
    return {
    }
  },
  methods: {
    onLogout: function () {
      this.$router.replace({name: 'Logout'})
    }
  }
}
</script>

<style scoped>
    .app-header {
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-between;
    }
</style>
