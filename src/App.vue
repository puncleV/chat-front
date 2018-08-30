<template>
    <div id="app">
        <router-view :socket="socket" :rooms="rooms" leave-room="onLeaveRoom" class="content"/>
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
    this.socket.on('add room error', this.onAddError.bind(this))
    this.socket.on('remove room error', this.onRemoveError.bind(this))
    this.socket.on('new message', this.onMessage.bind(this))
    this.socket.on('new message success', this.onMessage.bind(this))
    this.socket.on('new message error', this.onMessageError.bind(this))
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

    onAddError: function (msg) {
      window.alert(msg)
    },

    onRemoveError: function (msg) {
      window.alert(msg)
    },

    onJoinSuccess: function ({ username, hash: roomHash, users, messages }) {
      Vue.set(this.rooms[roomHash], 'usersCount', this.rooms[roomHash].usersCount + 1)
      Vue.set(this.rooms[roomHash], 'users', users)
      Vue.set(this.rooms[roomHash], 'messages', messages)
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

      if (username === localStorage.getItem('username')) {
        Vue.set(this.rooms[roomHash], 'users')
        Vue.set(this.rooms[roomHash], 'messages')
      } else if (this.rooms[roomHash].users) {
        Vue.set(this.rooms[roomHash], 'users', this.rooms[roomHash].users.filter(user => user !== username))
      }
    },

    onMessage: function ({ from, message, datetime, roomHash }) {
      const roomMessages = this.rooms[roomHash].messages

      roomMessages.push({
        from,
        text: message,
        datetime
      })

      Vue.set(this.rooms[roomHash], 'messages', roomMessages)
    },

    onMessageError: function (msg) {
      window.alert(msg)
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
