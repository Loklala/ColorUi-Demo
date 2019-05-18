import Vue from 'vue'
import App from './App'

//元素
// import basics from './pages/basics/home.vue'
// Vue.component('basics',basics)
//组件
// import components from './pages/component/home.vue'
// Vue.component('components',components)

// import plugin from './pages/plugin/home.vue'
// Vue.component('plugin',plugin)
//
import mains from './pages/mains/home.vue'
Vue.component('mains',mains)

import earn from './pages/earn/home.vue'
Vue.component('earn',earn)

import about from './pages/about/home.vue'
Vue.component('about',about)

// import burse from './pages/burse/home.vue'
// Vue.component('burse',burse)




import IdCard from './static/js/IdCard.js'
Vue.prototype.validid = IdCard;

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()





