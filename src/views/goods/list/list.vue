<template>
  <div class="goodsList">
    <a-table rowKey='id' :columns='columns' :data-source='list'>
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
      size: 10,
      columns: [
        {title: '姓名', dataIndex: 'title', key: 'title', width: '100px'},
        {title: '图片', dataIndex: 'photos', key: 'photos', scopedSlots: { customRender: 'photos' }},
        {title: '价格', dataIndex: 'money', key: 'money', width: '100px'},
        {title: '划线价', dataIndex: 'line_money', key: 'line_money', width: '100px'},
        {title: '库存', dataIndex: 'stock_nums', key: 'stock_nums', width: '100px'},
        {title: '虚拟销量', dataIndex: 'virtual_sales', key: 'virtual_sales', width: '100px'},
        {title: '编辑', dataIndex: 'edit', key: 'edit', scopedSlots: { customRender: 'edit' }},
      ],
      list: []
    }
  },
  methods: {
    searchData(){
      let params = {
        page: this.page,
        size: this.size
      }
      if(this.title){
        params.title = this.title
      }
      getData(params).then(res => {
        console.log(res)
        this.list = res.data.map(e => {
          return {
            ...e,
            start_time: formatTime(new Date(e.start_time * 1000), 'hh:mm:ss'),
            end_time: formatTime(new Date(e.end_time * 1000), 'hh:mm:ss'),
          }
        })
      })
    },
    editGood(e){
      this.$router.push({path: "/goodsEditor", query:{data: e}})
    },
    deleteGood(e){
      console.log(e)
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
