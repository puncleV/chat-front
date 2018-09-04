<template>
    <div class="rooms-list">
        <div class="room" v-if="sortedRooms.length" v-for="room of sortedRooms" v-bind:key="room.hash">
            <div>Name: {{ room.name }}</div>
            <div>Type: {{ room.type | typeFilter }}</div>
            <div>Users: {{ room.usersCount }}</div>
            <div class="room-actions">
                <div @click="goToRoom(room.hash)">JOIN</div>
                <div v-if="room.type === 1" @click="removeRoom(room.hash)">x</div>
            </div>
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
  },

  filters: {
    typeFilter: function (type) {
      return type === 0 ? 'public' : 'private'
    }
  }
}
</script>

<style scoped>
    .rooms-list {
        display: flex;
        padding: 10px;
        flex-wrap: wrap;
    }

    .room {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: #fff;
        border-radius: 5px;
        width: 6rem;
        height: 6rem;
        margin: 5px;
        padding: 5px;
    }

    .room-actions {
        display: flex;
        justify-content: space-between;
    }
</style>
