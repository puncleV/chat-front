<template>
    <div id="app">
        <router-view class="content"/>
    </div>
</template>

<script>
export default {
  name: 'app',
  data: function () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="css">
    #app, .content {
        height: 100%;
    }
</style>
