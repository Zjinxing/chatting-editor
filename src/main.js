import Vue from 'vue'
import App from './App.vue'
import twemoji from 'twemoji'

import { Popover } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.directive('emoji', {
  inserted(el) {
    el.innerHTML = twemoji.parse(el.innerHTML)
  },
})

Vue.use(Popover)

new Vue({
  render: h => h(App),
}).$mount('#app')
