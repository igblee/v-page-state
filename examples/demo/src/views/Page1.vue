<template>
  <div class="page1">
    <h1>Page1</h1>
    <div>$path: "{{$path}}"</div>
    <div> page: "{{page}}"</div>
    <div> $customPath: "{{$customPath}}"</div>

  </div>
</template>

<script>
import {mapState} from 'vuex'
import { generateVuexMapUtil } from '@/store/page-state.config.js'
const { mapPageState, } = generateVuexMapUtil('page1')

export default {
  name: 'Page1',
  computed: {
    ...mapPageState(['$path', 'page']),
    ...mapState(['$customPath']),
  }

};
</script>
