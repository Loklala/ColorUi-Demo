import Vue from 'vue'
import App from './App'

import mains from './pages/mains/home.vue'
Vue.component('mains',mains)

import earn from './pages/earn/home.vue'
Vue.component('earn',earn)

import about from './pages/about/home.vue'
Vue.component('about',about)

import icanH5Api from './common/ican-H5Api.js'
Vue.prototype.validid = icanH5Api;

import IdCard from './static/js/IdCard.js'
Vue.prototype.validid = IdCard;

import global from './common/common.vue'
Vue.prototype.COMMON = global

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()





