<template>
    <div>
        <app-header></app-header>
        rooms
    </div>
</template>

<script>
import AppHeader from './app-header'

export default {
  name: 'Rooms',
  components: { AppHeader },
  props: ['socket'],
  created () {
  },
  methods: {
  },
  data: function () {
    return {
    }
  }
}
</script>

<style scoped>

</style>
