import Vue from  'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import login from './module/login'
import civilized from './module/civilized'

export const store = new Vuex.Store({
    modules:{
        login,civilized
    }
})
