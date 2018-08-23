<template>
    <div id="app">
        <router-view class="content"/>
    </div>
</template>

<script>
import socket from 'socket.io-client'
export default {
  name: 'app',
  created () {
    this.socket = socket('http://localhost:4444')
  },
  data () {
    return {
      socket: null
    }
  }
}
</script>

<style lang="css">
    #app, .content {
        height: 100%;
    }
</style>
