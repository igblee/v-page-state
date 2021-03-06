# v-page-state

page state base on vue &amp; vuex

# install

```

yarn add @glennlee/v-page-state
or
npm install @glennlee/v-page-state --save

```

# add page-state-config.js like

```

import page1 from '@/store/modules/page1/'
import page2 from '@/store/modules/page2/'
import root from '@/store/modules/root/'
import pageState from '@glennlee/v-page-state'

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
export const { store, updatePageModule, generateVuexMapUtil, } = pageState(config)
export default store

```

# add beforeEach hook

```
import {updatePageModule} from ''// page-state.config.js
 router.beforeEach(async (to, from, next) => {
  await updatePageModule(to, from)
  next()
})

```
