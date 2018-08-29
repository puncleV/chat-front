<template>
    <div>
        <app-header></app-header>
        <div>
            room
        </div>
    </div>
</template>

<script>
import AppHeader from './app-header'
export default {
  name: 'room',
  components: {AppHeader},
  props: ['socket'],
  created () {
    this.socket.emit('join room', this.$route.params.hash)
  },
  methods: {}
}
</script>

<style scoped>

</style>
