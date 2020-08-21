
import Vue from 'vue'
let bus = new Vue()
Vue.prototype.$bus=bus;

import axios from 'axios'
axios.defaults.baseURL='https://apimusic.linweiqin.com';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    bus.$emit('waitflag',true)
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    bus.$emit('waitflag',false)
    return response;
  }, function (error) {
    return Promise.reject(error);
});