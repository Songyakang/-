<template>
  <div class="subscribeList">
    <a-form-model style='margin-bottom: 20px;' layout='inline'>
      <a-form-model-item label="手机号">
        <a-input v-model="mobile" placeholder="请输入用户手机号" />
      </a-form-model-item>
      <a-form-model-item label="管理员">
        <a-select v-model="status" style="width: 120px">
          <a-select-option value="">
             全部
          </a-select-option>
          <a-select-option v-for='item in adminList' :key='item.uid'  :value="item.uid">
             {{item.nickname}}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="时间">
        <a-range-picker :locale='locale' @change="onChange" />
      </a-form-model-item>
      <a-form-model-item>
        <a-button @click="searchData" type="primary" >搜索</a-button>
      </a-form-model-item>
      <a-form-model-item label='总加款' style='float: right;'>
        {{total_add_money}}
      </a-form-model-item>
      <a-form-model-item label='总减款' style='float: right;'>
        {{total_subtract_money}}
      </a-form-model-item>
    </a-form-model>
    <a-table :pagination='pagination' @change="handleTableChange" rowKey='id' :columns='columns' :data-source='list'>
      <template slot="profile_picture" slot-scope="text, record">
        <img :src='record.profile_picture'>
      </template>
      <template slot="edit" slot-scope="text, record">
        <a-tag color="blue" @click="editGood(record)">编辑</a-tag>
      </template>
      <template slot="is_send" slot-scope="text, record">
        <a-tag color="blue" v-if='record.is_send == 0'>提现中</a-tag>
        <a-tag color="green" v-if='record.is_send == 1'>已发放</a-tag>
        <a-tag color="red" v-if='record.is_send == 2'>提现失败</a-tag>
      </template>
    </a-table>
  </div>
</template>

<script>
import {transactionDetails} from '@/api/recommend'
import {formatTime} from '@/utils/date'
import {list} from '@/api/user'
import 'moment/locale/zh-cn'
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN'
export default {
  name: 'subscribeList',
  created(){
    this.searchData()
    list({page: 1, size: 100, is_admin: 1}).then(res => {
      this.adminList = res.data
    })
  },
  components:{
  },
  filters:{
  },
  data(){
    return {
      total_add_money: 0,
      total_subtract_money: 0,
      locale,
      page: 1,
      size: 10,
      columns: [
        {title: 'ID', dataIndex: 'id', key: 'id'},
        {title: '昵称', dataIndex: 'nickname', key: 'nickname'},
        {title: '手机号', dataIndex: 'mobile', key: 'mobile', width: '200px'},
        {title: '类型', dataIndex: 'remarks', key: 'remarks'},
        {title: '金额', dataIndex: 'money', key: 'money'},
        {title: '获得方式', dataIndex: 'title', key: 'title'},
        {title: '时间', dataIndex: 'created_at', key: 'created_at'},
        {title: '是否发放', dataIndex: 'is_send', key: 'is_send', scopedSlots: { customRender: 'is_send' }}
      ],
      list: [],
      mobile: '',
      pagination: {
        defaultPageSize: 10,
        hideOnSinglePage: true,
        total: 0
      },
      status: '',
      book_date: '',
      adminList: []
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
      if(this.mobile){
        params.mobile = this.mobile
      }
      if(this.status){
        params.wechat_admin_uid = this.status
      }
      if(this.book_date){
        params.transaction_date = this.book_date
      }
      transactionDetails(params).then(res => {
        console.log(res)
        this.total_subtract_money = res.data.total_subtract_money
        this.total_add_money = res.data.total_add_money
        this.pagination.total = res.count
        this.list = res.data.list.map(e => {
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
    editGood(e){
      this.$router.push({path: "/tourismEditor", query:{data: e}})
    },
    deleteGood(e){
      console.log(e)
    },
    go(){
      this.$router.push({path: "/goodsEditor"})
    },
    onChange(e, dateString){
      console.log(e, dateString)
      this.book_date = dateString
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
