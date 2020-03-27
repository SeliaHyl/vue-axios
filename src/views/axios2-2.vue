<template>
  <div class="home">
  </div>
</template>

<script>
/**
 * axios请求方法
 * ger:获取数据
 * post:提交数据(表单提交和文件上传)
 * put:更新数据(所有数据推送到后端)
 * patch:更新数据(只将修改的数据推送到后端)
 * delete:删除数据
 */
import axios from 'axios'

export default {
  name: 'axios2-2',
  created() {
    /*1.get请求*/
    axios.get('/data.json', {
      params:{
        id: 12
      }
    }).then((res) => {
      console.log(res)
    })
    axios({
      method: 'get',
      url: '/data.json',
      params: {
        id: 12
      }
    }).then(res => {
      console.log(res)
    })
    /**
     * 2.post请求
     * form-data 表单提交(图片上传、文件上传)
     * applicition/json
     */
    //applicition/json
    let data = {
      id: 12
    }
    axios.post('/post', data).then(res => {
      console.log(res)
    })
    axios({
      method: 'post',
      url: '/post',
      data: data
    }).then(res => {
      console.log(res)
    })
    //form-data 请求
    let formData = new FormData()
    for(let key in data) {
      formData.append(key,data[key])
    }
    axios.post('/post',formData).then(res => {
      console.log(res)
    })
    //3.put请求
    axios.put('/put',data).then(res=>{
      console.log(res)
    })
    //4.patch请求
    axios.patch('/patch',data).then(res=>{
      console.log(res)
    })
    //5.delete请求
    axios.delete('/delete',{
      params: {
        id: 12
      }
    }).then(res => {
      console.log(res)
    })
     axios.delete('/delete',{
      data: {
        id: 12
      }
    }).then(res => {
      console.log(res)
    })
    axios({
      method: 'delete',
      url: '/delete',
      params: {},
      data: {}
    }).then(res => {
      console.log(res)
    })
  }
}
</script>
