/* import './assets/main.css' */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios' // 导入axios的默认导入
import type { AxiosInstance,  InternalAxiosRequestConfig ,AxiosRequestHeaders } from 'axios' // 导入AxiosRequestConfig的类型导入

// 全局注册element-plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'

const app = createApp(App)
axios.defaults.baseURL = 'http://150.158.53.178:2053'

// 创建一个axios实例
const axiosInstance: AxiosInstance = axios.create()
// 设置 axios
// 添加请求拦截器
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    const jwtToken = localStorage.getItem('jwtToken')
    if (jwtToken) {
      if (!config.headers) {
        config.headers = {} as AxiosRequestHeaders
      }
      Object.assign(config.headers, { Authorization: `Bearer ${jwtToken}` });
    }
    return config 
  },
  (error) => {
    return Promise.reject(error)
  }
)
app.provide<AxiosInstance>('axios', axiosInstance)


app.use(router).use(ElementPlus)
app.mount('#app')
