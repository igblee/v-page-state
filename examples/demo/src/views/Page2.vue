<template>
  <div class="page2">
    <h1>Page2</h1>
    <div>$path: "{{$path}}"</div>
    <div> page: "{{page}}"</div>
    <div>$customPath: "{{$customPath}}"</div>
    <div> keepState: {{keepState}}</div>
    <button @click="changeKeepState">change keepState</button>
    <div> notKeepState: {{notKeepState}}</div>
    <button @click="changeKeepNotState">change notKeepState</button>
    <button @click="handleResetState">reset state</button>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import { generateVuexMapUtil,resetState } from '@/store/page-state.config.js'
const { mapPageState, } = generateVuexMapUtil('page2')
export default {
  name: 'Page2',
  computed: {
    ...mapPageState(['$path', 'page', 'keepState', 'notKeepState']),
    ...mapState(['$customPath'])
  },
  methods: {
    changeKeepState() {
      const payload = parseInt(Math.random() * 10)
      this.$store.commit(`${this.$path}UPDATE_KEEP_STATE`, payload)
    },
    changeKeepNotState() {
      const payload = parseInt(Math.random() * 10)
      this.$store.commit(`${this.$path}UPDATE_NOT_KEEP_STATE`, payload)
    },
    handleResetState() {
      resetState('page2')
    }
  }
};
</script>
