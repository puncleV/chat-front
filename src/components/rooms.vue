<template>
    <div>
        <app-header></app-header>
        <div>
            <label>
                Room name:
                <input v-model="roomName"/>
            </label>
            <label>
                private
                <input type="checkbox" v-model="isPrivate"/>
            </label>
            <button @click="createRoom">create room</button>
            <label>
                Room id:
                <input v-model="hash"/>
            </label>
            <button @click="addRoom">add private room</button>
        </div>
        <rooms-list :socket="socket" :rooms="rooms"></rooms-list>
    </div>
</template>

<script>
import AppHeader from './app-header'
import RoomsList from './rooms-list'

export default {
  name: 'Rooms',
  components: { RoomsList, AppHeader },
  props: ['socket', 'rooms'],
  created () {
    if (this.socket.disconnected) {
      this.socket.open()
    }
  },
  methods: {
    createRoom () {
      this.socket.emit('create room', { name: this.roomName, type: this.isPrivate ? 1 : 0 })
    },
    addRoom () {
      this.socket.emit('add room', {hash: this.hash})
    }
  },
  data () {
    return {
      roomName: '',
      hash: '',
      isPrivate: 0
    }
  }
}
</script>

<style scoped>
</style>
