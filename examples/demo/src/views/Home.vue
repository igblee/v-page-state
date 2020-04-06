<template>
  <div class="home">
   <h1>Home</h1>
  <div> page: "{{page}}"</div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'Home',
  computed: {
    ...mapState(['page', '$path'])
  },
}
</script>
