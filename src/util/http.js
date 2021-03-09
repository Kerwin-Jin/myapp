import axios from "axios"
import { Toast } from "vant"
const http = axios.create({
    baseURL:'https://m.maizuo.com',
    timeout:10000,
    headers:{
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1612578131297645528580097"}',
    }
})

// 请求拦截器
http.interceptors.request.use(function (config) {

    //每次ajax请求之前都提示加载中
    Toast.loading({
        message: '加载中...',
        forbidClick: true,
        overlay:true,
        duration:0
    });

    return config;
  }, function (error) {
    return Promise.reject(error);
  });

// 响应拦截器
http.interceptors.response.use(function (response) {

    //请求完成之后将加载中效果清除掉
    Toast.clear()

    return response;
  }, function (error) {
   
    return Promise.reject(error);
  });

export default http