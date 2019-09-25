import Vue from 'vue'
import twemoji from 'twemoji'
import App from './App.vue'
import './style/index.stylus'

import { Popover, Upload } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.directive('emoji', {
  inserted(el) {
    el.innerHTML = twemoji.parse(el.innerHTML)
  },
})

Vue.use(Popover).use(Upload)

new Vue({
  render: h => h(App),
}).$mount('#app')
