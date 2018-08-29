<template>
    <div id="app">
        <router-view :socket="socket" :rooms="rooms" class="content"/>
    </div>
</template>

<script>
import socketClient from 'socket.io-client'
import Vue from 'vue'

export default {
  name: 'app',
  created () {
    this.socket = socketClient('http://localhost:4444')

    this.socket.on('rooms', this.onRooms.bind(this))
    this.socket.on('new room', this.onNewRoom.bind(this))
    this.socket.on('create room success', this.onNewRoom.bind(this))
    this.socket.on('create room error', this.onCreateError.bind(this))
    this.socket.on('user joined', this.onUserJoined.bind(this))
    this.socket.on('user leave', this.onUserLeave.bind(this))
    this.socket.on('join room success', this.onJoinSuccess.bind(this))
    this.socket.on('join room error', this.onJoinError.bind(this))
  },
  methods: {
    onRooms: function (rooms) {
      rooms.forEach(room => {
        Vue.set(this.rooms, room.hash, room)
      })
    },
    onNewRoom: function (room) {
      Vue.set(this.rooms, room.hash, room)
    },
    onCreateError: function (msg) {
      window.alert(msg)
    },
    onJoinSuccess: function ({ username, roomHash, users }) {
      Vue.set(this.rooms[roomHash], 'usersCount', this.rooms[roomHash].usersCount + 1)
      Vue.set(this.rooms[roomHash], 'users', users)
    },
    onJoinError: function (msg) {
      window.alert(msg)

      this.$router.push({
        name: 'Rooms'
      })
    },
    onUserJoined: function ({ username, roomHash }) {
      Vue.set(this.rooms[roomHash], 'usersCount', this.rooms[roomHash].usersCount + 1)

      if (this.rooms[roomHash].users) {
        this.rooms[roomHash].users.push(username)
        Vue.set(this.rooms[roomHash], 'users', this.rooms[roomHash].users)
      }
    },
    onUserLeave: function ({ username, roomHash }) {
      Vue.set(this.rooms[roomHash], 'usersCount', this.rooms[roomHash].usersCount - 1)

      if (this.rooms[roomHash].users) {
        Vue.set(this.rooms[roomHash], 'users', this.rooms[roomHash].users.filter(user => user !== username))
      }
    }
  },
  data () {
    return {
      socket: null,
      rooms: {}
    }
  }
}
</script>

<style lang="css">
    #app, .content {
        height: 100%;
    }
</style>
