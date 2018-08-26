<template>
    <div id="app">
        <router-view :socket="socket" :rooms="rooms" class="content"/>
    </div>
</template>

<script>
import socketClient from 'socket.io-client'

export default {
  name: 'app',
  created () {
    this.socket = socketClient('http://localhost:4444')

    this.socket.on('rooms', rooms => {
      this.rooms = rooms
    })

    this.socket.on('new room', room => {
      this.rooms.push(room)
    })
  },
  methods: {
  },
  data () {
    return {
      socket: null,
      rooms: []
    }
  }
}
</script>

<style lang="css">
    #app, .content {
        height: 100%;
    }
</style>
