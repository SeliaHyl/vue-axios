import axios from 'axios'
import service from './contactApi.js'
import {Toast} from 'vant'

//service循环遍历输出不同的请求方式
let instance = axios.create({
	baseURL: 'http://localhost:9000/api',
	timeout: 1000
})
const Http = {}; //包裹请求方法的容器

//请求格式或参数的统一
for(let key in service){
	let api = service[key];  //url,method
	//async作用：避免进入回调地狱
	Http[key] = async function(
			params, //请求参数 get：url,put,post,patch(data),delete:url
			isFormData = false, //标识是否是form-data请求
			config = {} //配置参数
		){
		let newParams = {} 

		//content-type是否是form-data的判断
		if(params && isFormData) {
			newParams = new FormData()
			for(let key in params) {
				newParams.append(key,params[key])
			}
		}else{
			newParams = params
		}
		//不同请求的判断
		let response = {}; //请求返回值
		if (api.method === 'put' || api.method === 'post' || api.method === 'patch') {
			try {
				response = await instance[api.method](api.url, newParams, config)
			}catch(err){
				response = err
			}
		} else if(api.method === 'delete' || api.method === 'get'){
			config.params = newParams
			try {
				response = await instance[api.method](api.url, config)		
			}catch(err){
				response = err
			}
		} 
		return response; //返回响应值
	}
} 

//拦截器添加
//1.请求拦截器
instance.interceptors.request.use(config=>{
	//发起请求前做什么
	Toast.loading({
		mask: false,
		duration: 0, //一直存在
		forbidClick: true , //禁止点击
		message: '加载中...'
	})
	return config
},err=>{
	//请求错误做什么
	Toast.clear()
	Toast('请求错误，请稍后再试')
})

//2.响应拦截器
instance.interceptors.response.use(res=>{
	//请求成功
	Toast.clear()
	return res.data
},err=>{
	//请求错误
	Toast.clear()
	Toast('请求错误，请稍后再试')
})

export default Http