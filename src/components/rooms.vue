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
            <label>
                Room id:
                <input v-model="roomId"/>
            </label>
            <button @click="createRoom">create room</button>
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
      if (typeof this.roomName === 'string') {
        this.socket.emit('create room', this.roomName, this.isPrivate ? 1 : 0)
      }
    },
    addRoom () {
      if (typeof this.roomId === 'string') {
        this.socket.emit('add room', this.roomId)
      }
    }
  },
  data () {
    return {
      roomName: '',
      roomId: '',
      isPrivate: 0
    }
  }
}
</script>

<style scoped>

</style>
