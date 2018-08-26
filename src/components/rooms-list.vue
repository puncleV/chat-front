<template>
    <div>
        <div v-if="rooms.length" v-for="room of sortedRooms" v-bind:key="room.id">
            room
            {{ room }}
        </div>
        <div v-else >No rooms here.</div>
    </div>
</template>

<script>
export default {
  name: 'RoomsList',
  props: ['rooms'],
  computed: {
    sortedRooms: function () {
      return Array.from(this.rooms).sort(a => !a.private)
    }
  }
}
</script>

<style scoped>

</style>
