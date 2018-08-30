<template>
    <div>
        <app-header></app-header>
        <div v-for="message of messages" :key="message.from+message.datetime">
            <div>from: {{ message.from }}</div>
            <div>time: {{ message.datetime }}</div>
            <div>text: {{ message.text }}</div>
        </div>
        <div>
            <label>
                <input v-model="message">
                <button @click="sendMessage">send</button>
            </label>
        </div>
    </div>
</template>

<script>
import AppHeader from './app-header'
export default {
  name: 'room',
  components: {AppHeader},
  props: ['socket', 'rooms'],

  created () {
    this.hash = this.$route.params.hash
    this.socket.emit('join room', { hash: this.$route.params.hash })
  },

  beforeDestroy () {
    this.socket.emit('leave room', { hash: this.$route.params.hash })
  },

  methods: {
    sendMessage: function () {
      this.socket.emit('new message', { roomHash: this.hash, message: this.message })
    }
  },

  data () {
    return {
      message: ''
    }
  },

  computed: {
    messages: function () {
      return this.rooms[this.hash].messages
    }
  }
}
</script>

<style scoped>

</style>
