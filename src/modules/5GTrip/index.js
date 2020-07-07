import Vue from 'vue'
import App from './App'
import router from './router'
import vueLazyload from 'vue-lazyload'

import 'amfe-flexible'

Vue.config.productionTip = false

Vue.use(vueLazyload, {
  preLoad: 1.3,
  attempt: 1,
  listenEvents: [ 'scroll' ]
})

Vue.prototype.report = name => {
  try {
    const nv = '5GTrip'
    const event = nv + '_' + name
    window.Webtrends.multiTrack({
      args: {
        'DCS.dcsuri': '/event.gif',
        'WT.nv': nv,
        'WT.event': event,
        'WT.mobile': '',
      },
      delayTime: 20
    })
  } catch (e) {}
}

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
