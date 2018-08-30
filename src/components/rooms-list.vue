<template>
    <div>
        <div v-if="sortedRooms.length" v-for="room of sortedRooms" v-bind:key="room.hash">
            <div>Name: {{ room.name }}</div>
            <div>Type: {{ room.type | typeFilter }}</div>
            <div>Users: {{ room.usersCount }}</div>
            <div @click="goToRoom(room.hash)">JOIN</div>
            <div @click="removeRoom(room.hash)">x</div>
        </div>
        <div v-else >No rooms here.</div>
    </div>
</template>

<script>
export default {
  name: 'RoomsList',
  props: ['rooms', 'socket'],
  computed: {
    sortedRooms: function () {
      return Object.values(this.rooms).sort(a => !a.private)
    }
  },
  methods: {
    removeRoom: function (hash) {
      this.socket.emit('remove room', { hash })

      delete this.rooms[hash]
    },

    goToRoom: function (hash) {
      this.$router.push({
        name: 'Room',
        params: {
          hash: hash
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
