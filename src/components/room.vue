<template>
    <div>
        <app-header></app-header>
        <div class="messages">
            <div class="message" v-for="message of messages" :key="message.from+message.datetime">
                <div>from: {{ message.from }}</div>
                <div>time: {{ message.datetime | datetimeFilter }}</div>
                <div>text: {{ message.text }}</div>
            </div>
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
      if (this.rooms[this.hash] !== undefined) {
        return this.rooms[this.hash].messages
      }

      return []
    }
  },

  filters: {
    datetimeFilter: function (datetime) {
      return new Date(datetime).toLocaleString()
    }
  }
}
</script>

<style scoped>
     .messages {
         display: flex;
         flex-direction: column;
         overflow-y: scroll;
         height: 50rem;
         padding: 5px;
         margin: 5px;
     }

    .message {
        background-color: #fff;
        padding: 5px;
        margin: 5px;
    }

    .message:nth-child(2n) {
        background-color: aliceblue;
    }
</style>
