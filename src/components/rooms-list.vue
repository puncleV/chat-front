<template>
    <div>
        <div v-if="sortedRooms.length" v-for="room of sortedRooms" v-bind:key="room.hash" @click="goToRoom(room.hash)">
            room
            {{ room }}
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
