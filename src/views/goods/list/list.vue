<template>
  <div class="goodsList">
    <a-form-model style='margin-bottom: 20px;' layout='inline'>
      <a-form-model-item label="名称">
        <a-input v-model="title" placeholder="请输入搜索名" />
      </a-form-model-item>
      <a-form-model-item>
        <a-button @click="searchData" type="primary" >搜索</a-button>
      </a-form-model-item>
      <a-form-model-item style="float: right;">
        <a-button @click="go" type="primary" >添加</a-button>
      </a-form-model-item>
    </a-form-model>
    <a-table :pagination='pagination' @change="handleTableChange" rowKey='id' :columns='columns' :data-source='list'>
      <template slot="photos" slot-scope="text, record">
        <img v-for='(item, index) in record.photos' :key='index' :src='item'>
      </template>
      <template slot="edit" slot-scope="text, record">
        <a-tag color="red" @click="deleteGood(record)">删除</a-tag>
        <a-tag color="blue" @click="editGood(record)">编辑</a-tag>
      </template>
    </a-table>
  </div>
</template>

<script>
import {getData} from '@/api/goods'
import {formatTime} from '@/utils/date'
export default {
  name: 'goodsList',
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
      size: 5,
      columns: [
        {title: '名称', dataIndex: 'title', key: 'title', width: '100px'},
        {title: '图片', dataIndex: 'photos', key: 'photos', scopedSlots: { customRender: 'photos' }},
        {title: '价格', dataIndex: 'money', key: 'money', width: '100px'},
        {title: '划线价', dataIndex: 'line_money', key: 'line_money', width: '100px'},
        {title: '库存', dataIndex: 'stock_nums', key: 'stock_nums', width: '100px'},
        {title: '虚拟销量', dataIndex: 'virtual_sales', key: 'virtual_sales', width: '100px'},
        {title: '编辑', dataIndex: 'edit', key: 'edit', scopedSlots: { customRender: 'edit' }},
      ],
      list: [],
      title:'',
      pagination: {
        defaultPageSize: 5,
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
        size: this.size,
        type: 2
      }
      if(this.title){
        params.title = this.title
      }
      getData(params).then(res => {
        console.log(res)
        this.pagination.total = res.count
        console.log(this.pagination)
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
      this.$router.push({path: "/goodsEditor", query:{data: e}})
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
.goodsList{}
img{
  width: 100px;
  height: 100px;
  margin-right: 2px;
}
</style>
