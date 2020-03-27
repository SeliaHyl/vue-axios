<template>
  <div class="home">
  	<!-- 联系人列表 -->
	<van-contact-list
	    :list="list"
	    @add="onAdd"
	    @edit="onEdit"
  />
    <!-- 联系人编辑 -->
	<van-popup v-model="showEdit" position="bottom">
	  <van-contact-edit
	    :contact-info="editingContact"
	    :is-edit="isEdit"
	    @save="onSave"
	    @delete="onDelete"
	  />
	</van-popup>
  </div>
</template>

<script>
import axios from 'axios'
import {ContactList, Toast, ContactEdit, Popup} from 'vant'

export default {
  name: 'ContactList',
  components: {
  	[ContactList.name]: ContactList,
  	[ContactEdit.name]: ContactEdit,
  	[Popup.name]: Popup
  },
  data() {
  	return {
  		// list:[{
  		// 	id: 1,
  		// 	name: '',
  		// 	tel: ''
  		// }]
  		list: [],
  		instance: null ,//axios实例
  		showEdit: false, //编辑弹窗的显隐
  		isEdit: false, //新建或编辑
  		editingContact: {} //正在编辑的联系人数据
  	}
  },
  created() {
  	this.instance = axios.create({
  		baseURL:'http://localhost:9000/api',
  		timeout: 1000
  	})
  	this.getList()
  },
  methods: {
  	//获取联系人列表
  	getList(){
  		this.instance.get('/contactList').then(res=>{
  		this.list = res.data.data
  		console.log(res.data.data)
  	}).catch(err=>{
  		console.log(err)
  		Toast("请求失败，请稍后重试")
  	})
  	},
  	//添加联系人
  	onAdd(){
  		this.showEdit = true
  		this.isEdit = false
  	},
  	//编辑联系人
  	onEdit(info){
  		this.showEdit = true
  		this.isEdit = true
  		this.editingContact = info
  	},
  	//保存联系人
  	onSave(info){
  		if(this.isEdit){
  			//编辑保存
  			this.instance.put('/contact/edit',info).then(res=>{
  				if(res.data.code === 200){
  					Toast("编辑成功")  //保存成功
  					this.showEdit = false
  					this.getList()
  				}
  			}).catch(err=>{
  				Toast("请求失败，请稍后重试")
  			})
  		} else {
  			//新建保存
  			/*this.instance.post('/contact/new/json',info).then(res=>{
  				if(res.data.code === 200){
  					Toast("新建成功")
	  				this.showEdit = false
	  				this.getList()
  				}
  				
  			}).catch(err=>{
  				Toast("请求失败，请稍后重试")
  			})*/
  			this.instance.post('/contact/new/form',info).then(res=>{
  				if(res.data.code === 200){
  					Toast("新建成功")
	  				this.showEdit = false
	  				this.getList()
  				}
  			}).catch(err=>{
  				Toast("请求失败，请稍后重试")
  			})
  		}
  	},
  	//删除联系人
  	onDelete(info){
  		this.instance.delete('/contact',{
  			params:{
  				id: info.id
  			}
  		}).then(res=>{
  			Toast("删除成功")
  			this.showEdit = false
  			this.getList()
  		}).catch(err=>{
  			Toast("请求失败，请稍后重试")
  		})
  	}
  }
}
</script>

<style scoped>
	.van-contact-list__add {
		z-index: 0
	}
	.van-popup {
		height: 100%
	}
</style>
