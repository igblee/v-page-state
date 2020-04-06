import { cloneDeep, merge } from 'lodash'
import Vue from 'vue'
import Vuex, { createNamespacedHelpers } from 'vuex'
import { myTypeOf, nextTick } from './utils/'

Vue.use(Vuex)

function hasOwnProperty (target, prop) {
  return Object.hasOwnProperty.call(target, prop)
}
let generateVuexMapUtil = () => {
  throw new Error('[page-state error]', 'page-state not init')
}
let updatePageModule = () => {
  throw new Error('[page-state error]', 'page-state not init')
}
const defaultModule = {
  namespaced: true,
  state () {
    return {}
  },
  getters () {
    return {}
  },
  mutations () {
    return {}
  },
  actions () {
    return {}
  },
}
function handleRootStore (config) {
  const { root, routeModuleName, } = config
  return merge(root.store, {
    namespaced: true,
    modules: {
      [routeModuleName]: defaultModule,
    },
  })
}

function handleRouteModules (config) {
  const { routeModules, routeModuleName, } = config
  for (const key of Object.keys(routeModules)) {
    routeModules[key].store.namespaced = true
    routeModules[key].store.state[config.routePath] = `${routeModuleName}/${key}/`
    if (!hasOwnProperty(routeModules[key], 'clearState')) {
      routeModules[key].clearState = true
    }
    if (routeModules[key].modules) {
      const modules = routeModules[key].modules
      for (const key of Object.keys(modules)) {
        if (!hasOwnProperty(modules[key], 'namespaced')) {
          modules[key].namespaced = true
        }
      }
    }
  }
  return routeModules
}
function transformConfig (config) {
  config.root.store = handleRootStore(config)
  config.routeModules = handleRouteModules(config)
}
function updatePageModuleWrapper (config, store) {
  const { routeModuleName, pathInRootState, routeModules, } = config
  return function (to, from) {
    if (!routeModules[to.name]) {
      store.state[pathInRootState] = null
      return
    }
    let module = cloneDeep(routeModules[to.name].store)
    if (routeModules[to.name].modules) {
      module = merge(module, { modules: cloneDeep(routeModules[to.name].modules), })
    }
    const clearState = routeModules[to.name].clearState
    const keepStateKeys = routeModules[to.name].keepStateKeys || []
    const keepStateModules = routeModules[to.name].keepStateModules || []
    if (!module) {
      console.error('[page-state error]', `can not find module of route ${to.name}`)
      store.state[pathInRootState] = null
      return
    }
    store.state[pathInRootState] = `${routeModuleName}/${to.name}/`
    if (!store.state[routeModuleName][to.name]) {
      store.registerModule([routeModuleName, to.name, ], module)
    } else {
      if (clearState && to.name !== from.name) {
        const currPageState = store.state[routeModuleName][to.name]
        if (keepStateKeys && keepStateKeys.length) {
          keepStateKeys.forEach((key) => {
            if (Object.keys(currPageState).includes(key)) {
              module.state[key] = currPageState[key]
            }
          })
        }
        if (keepStateModules && keepStateModules.length) {
          keepStateModules.forEach((key) => {
            if (Object.keys(module.modules).includes(key)) {
              module.modules[key].state = currPageState[key]
            }
          })
        }
        nextTick(() => {
          store.unregisterModule([routeModuleName, to.name, ])
          store.registerModule([routeModuleName, to.name, ], module)
        })
      }
    }
  }
}

function generateVuexMapUtilWrapper (config) {
  return function (path) {
    path = `${config.routeModuleName}/${path}`
    const {
      mapState,
      mapActions,
      mapMutations,
      mapGetters,
    } = createNamespacedHelpers(path)
    return {
      mapPageState: mapState,
      mapPageGetters: mapGetters,
      mapPageMutations: mapMutations,
      mapPageActions: mapActions,
    }
  }
}
function checkParams (config) {
  const { root, routeModules, routeModuleName, routePath, } = config
  if (!routeModuleName) {
    config.routeModuleName = '__page__'
  }
  if (!routePath) {
    config.routePath = '$path'
  }
  if (!config.pathInRootState) {
    config.pathInRootState = config.routePath
  }
  if (!root) {
    throw new Error('[page-state error] `root` property of config is required')
  }
  if (!routeModules) {
    throw new Error('[page-state error] `routeModules` property of config is required')
  }
  if (root && !root.store) {
    throw new Error('[page-state error] `config.root.store` is required')
  }
  if (routeModules) {
    for (const key of Object.keys(routeModules)) {
      if (!routeModules[key].store) {
        throw new Error('[page-state error] `store` property of rootModules\'s item is required')
      }
      if (Object.hasOwnProperty.call(routeModules[key], 'clearState') && myTypeOf(routeModules[key].clearState) !== 'Boolean') {
        throw new Error('[page-state error] `clearState` property of rootModules\'s item must be boolean')
      }
    }
  }
}
function pageState (config) {
  checkParams(config)
  transformConfig(config)
  const store = new Vuex.Store(config.root.store)
  updatePageModule = updatePageModuleWrapper(config, store)
  generateVuexMapUtil = generateVuexMapUtilWrapper(config)
  return {
    store,
    updatePageModule,
    generateVuexMapUtil,
  }
}
export default pageState
