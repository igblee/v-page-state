
import page1 from '@/store/modules/page1/'
import page2 from '@/store/modules/page2/'
import root from '@/store/modules/root/'
import pageState from '@glennlee/v-page-state'
console.log('[app debug]: pageState', pageState)

const config = {
  root: {
    store: root,

  },
  routeModules: {
    page1: {
      store: page1,
    },
    page2: {
      store: page2,
      keepStateKeys: ['keepState']
    },
  },
  routeModuleName: '__page__', // default __page__
  routePath: '$path', // default '$path'
  pathInRootState: '$customPath', // default `routePath`
}
export const { store, updatePageModule, generateVuexMapUtil, resetState } = pageState(config)
export default store
