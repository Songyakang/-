<template>
  <div class="tourismList">
    <a-form-model style='margin-bottom: 20px;' layout='inline'>
      <a-form-model-item label="昵称">
        <a-input v-model="nickname" placeholder="请输入用户昵称" />
      </a-form-model-item>
      <a-form-model-item label="姓名">
        <a-input v-model="real_name" placeholder="请输入用户姓名" />
      </a-form-model-item>
      <a-form-model-item label="手机号">
        <a-input v-model="mobile" placeholder="请输入用户手机号" />
      </a-form-model-item>
      <a-form-model-item>
        <a-button @click="searchData" type="primary" >搜索</a-button>
      </a-form-model-item>
    </a-form-model>
    <a-table :pagination='pagination' @change="handleTableChange" rowKey='id' :columns='columns' :data-source='list'>
      <template slot="profile_picture" slot-scope="text, record">
        <img :src='record.profile_picture'>
      </template>
      <template slot="real_name" slot-scope="text, record">
        <a-input v-model='record.real_name' @pressEnter="change(record)"/>
      </template>
      <template slot="edit" slot-scope="text, record">
        <a-tag v-if='record.is_admin == 0' color="green" @click="changeadmin(record)">升级管理员</a-tag>
        <a-tag v-if='record.is_admin == 1' color="red" @click="changeadmin(record)">取消管理员</a-tag>
      </template>
    </a-table>
  </div>
</template>

<script>
import {list, updateAdminStatus, editWechatUser} from '@/api/user'
import {formatTime} from '@/utils/date'
export default {
  name: 'userList',
  created(){
    this.searchData()
  },
  components:{
  },
  filters:{
  },
  data(){
    return {
      page: 1,
      size: 10,
      columns: [
        {title: '头像', dataIndex: 'profile_picture', key: 'profile_picture', width: '100px', scopedSlots: { customRender: 'profile_picture' }},
        {title: '昵称', dataIndex: 'nickname', key: 'nickname'},
        {title: '姓名', dataIndex: 'real_name', key: 'real_name', scopedSlots: { customRender: 'real_name' }, width: '200px'},
        {title: '手机号', dataIndex: 'mobile', key: 'mobile', width: '200px'},
        {title: '余额', dataIndex: 'balance', key: 'balance', width: '100px'},
        {title: '推荐人', dataIndex: 'pid_nickname', key: 'pid_nickname'},
        {title: '推荐人手机号', dataIndex: 'pid_mobile', key: 'pid_mobile', width: '200px'},
        {title: '编辑', dataIndex: 'edit', key: 'edit', scopedSlots: { customRender: 'edit' }},
      ],
      list: [],
      nickname: '',
      real_name: '',
      mobile: '',
      pagination: {
        defaultPageSize: 10,
        hideOnSinglePage: true,
        total: 0
      }
    }
  },
  methods: {
    handleTableChange(a){
      this.page = a.current
      this.searchData()
    },
    searchData(){
      let params = {
        page: this.page,
        size: this.size
      }
      if(this.nickname){
        params.nickname = this.nickname
      }
      if(this.mobile){
        params.mobile = this.mobile
      }
      if(this.real_name){
        params.real_name = this.real_name
      }
      console.log(params)
      
      list(params).then(res => {
        console.log(res)
        this.pagination.total = res.count
        this.list = res.data.map(e => {
          return {
            ...e,
            start_time: formatTime(new Date(e.start_time * 1000), 'hh:mm:ss'),
            end_time: formatTime(new Date(e.end_time * 1000), 'hh:mm:ss'),
          }
        })
      }).catch(() => {
        this.$message.info('查询失败')
        this.list = []
      })
    },
    changeadmin(e){
      console.log(e)
      updateAdminStatus({
        uid: e.uid,
        is_admin: !e.is_admin ? 1: 0
      }).then(() => {
        this.searchData()
        this.$message.info('操作成功')
      })
    },
    change (e) {
      if(e.real_name){
        editWechatUser({
          uid: e.uid,
          real_name: e.real_name
        }).then(res => {
          this.$message.info(res.msg)
        })
      }else{
        this.$message.error('请输入用户名称')
      }
      
    },
    lowadmin(e){
      console.log(e)
    },
    go(){
      this.$router.push({path: "/goodsEditor"})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
img{
  width: 50px;
  height: 50px;
  margin-right: 2px;
}
</style>
