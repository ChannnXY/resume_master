import axios from 'axios'

axios.defaults.baseURL="http://192.168.137.1:3000/"

axios.interceptors.request.use(function (config) {
    window.console.log(config.headers.common);
    if(config.url!=="/users/login"){
        // if(config.data instanceof FormData){
        //     config.data.append('token',localStorage.token)
        // }else{
        //     config.data.token = localStorage.token;
        // }
        config.headers.common.Authorization = localStorage.token
    }
    return config
  }, function (error) {
    // 请求错误时弹框提示，或做些其他事
    return Promise.reject(error)
})

export default {
    install: function (Vue) {
      Vue.prototype.post = (url, params) => axios.post(url, params);
      Vue.prototype.get = (url, params) => axios.get(url, params)
    }
  }