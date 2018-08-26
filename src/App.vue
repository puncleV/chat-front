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

    this.socket.on('rooms', this.onRooms.bind(this))
    this.socket.on('new room', this.onNewRoom.bind(this))
    this.socket.on('create room success', this.onNewRoom.bind(this))
    this.socket.on('create room error', this.onCreateError.bind(this))
  },
  methods: {
    onRooms: function (rooms) {
      this.rooms = rooms
    },
    onNewRoom: function (room) {
      this.rooms.push(room)
    },
    onCreateError: function (msg) {
      window.alert(msg)
    }
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
