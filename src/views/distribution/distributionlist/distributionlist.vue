<template>
  <div class="subscribeList">
    <a-form-model style='margin-bottom: 20px;' layout='inline'>
      <a-form-model-item label="推荐人手机号">
        <a-input v-model="pid_mobile" placeholder="请输入推荐人手机号" />
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
    </a-table>
  </div>
</template>

<script>
import {recommendList} from '@/api/recommend'
import {formatTime} from '@/utils/date'
export default {
  name: 'subscribeList',
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
        {title: '头像', dataIndex: 'profile_picture', key: 'profile_picture', scopedSlots: { customRender: 'profile_picture' }},
        {title: '昵称', dataIndex: 'nickname', key: 'nickname'},
        {title: '手机号', dataIndex: 'mobile', key: 'mobile', width: '200px'},
        {title: '余额', dataIndex: 'balance', key: 'balance', width: '200px'},
        {title: '推荐人', dataIndex: 'pid_nickname', key: 'pid_nickname'},
        {title: '推荐人手机号', dataIndex: 'pid_mobile', key: 'pid_mobile', width: '200px'},
      ],
      list: [],
      pid_mobile: '',
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
      if(this.pid_mobile){
        params.pid_mobile = this.pid_mobile
      }
      if(this.mobile){
        params.mobile = this.mobile
      }
      console.log(params)
      recommendList(params).then(res => {
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
    editGood(e){
      this.$router.push({path: "/tourismEditor", query:{data: e}})
    },
    deleteGood(e){
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
