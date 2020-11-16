<template>
  <div class="subscribeList">
    <a-form-model style='margin-bottom: 20px;' layout='inline'>
      <a-form-model-item label="状态">
        <a-select v-model="status" style="width: 120px" loading>
          <a-select-option value="">
             全部
          </a-select-option>
          <a-select-option value="1">
              预约成功
          </a-select-option>
          <a-select-option value="2">
             预约失败
          </a-select-option>
          <a-select-option value="3">
             已完成
          </a-select-option>
          <a-select-option value="0">
             未跟进
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="推荐人手机号">
        <a-input v-model="pid_mobile" placeholder="请输入推荐人手机号" />
      </a-form-model-item>
      <a-form-model-item label="手机号">
        <a-input v-model="mobile" placeholder="请输入用户手机号" />
      </a-form-model-item>
      <a-form-model-item label="时间">
        <a-range-picker :locale='locale' @change="onChange" />
      </a-form-model-item>
      <a-form-model-item>
        <a-button @click="searchData" type="primary" >搜索</a-button>
      </a-form-model-item>
    </a-form-model>

    <a-table :scroll="{ x: 1500 }" :pagination='pagination' @change="handleTableChange" rowKey='id' :columns='columns' :data-source='list'>
      <template slot="profile_picture" slot-scope="text, record">
        <img :src='record.profile_picture'>
      </template>
      <template slot="remarks" slot-scope="text, record">
        <div>{{record.pic}}</div>
        <a-popover title="跟进记录">
          <template slot="content">
            <p style='width: 500px;'>{{record.remarks}}</p>
          </template>
          <div style='width: 200px; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;'>{{record.remarks}}</div>
        </a-popover>
      </template>
      <template slot="edit" slot-scope="text, record">
        <a-tag color="blue" v-if='record.status == 0' @click="detail = {...record}; remarksModal = true;">未跟进</a-tag>
        <a-tag color="green" v-if='record.status == 1' @click="detail = {...record}; remarksModal = true;">预约成功</a-tag>
        <a-tag color="red" v-if='record.status == 2' @click="detail = {...record}; remarksModal = true;">预约失败</a-tag>
        <a-tag color="green" v-if='record.status == 3' @click="detail = {...record}; remarksModal = true;">已完成</a-tag>
        <a-tag color="green" v-if='record.pid != 0 && record.is_send == 0' @click="detail = {...record, price: 1}; priceModal = true;">发放佣金</a-tag>
      </template>
    </a-table>

    <a-modal v-model="priceModal" title="发放佣金" ok-text="确认" cancel-text="取消" @ok="postPrice">
      <a-form-model :labelCol='{span: 4}' :wrapperCol='{span: 20}' style='margin-bottom: 20px;'>
        <a-form-model-item label="商品名称">
          <a-input disabled style='background: #ffffff; color: #555555;' v-model="detail.item_title" placeholder="请输入推荐人手机号" />
        </a-form-model-item>
        <a-form-model-item label="佣金">
          <a-input v-model="detail.price" type='number' placeholder="请输入用户手机号" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>

    <a-modal v-model="remarksModal" title="添加跟进记录" ok-text="确认" cancel-text="取消" @ok="postRemarks">
      <a-form-model :labelCol='{span: 4}' :wrapperCol='{span: 20}' style='margin-bottom: 20px;'>
        <a-form-model-item label="商品名称">
          <a-input disabled style='background: #ffffff; color: #555555;' v-model="detail.item_title" placeholder="请输入推荐人手机号" />
        </a-form-model-item>
        <a-form-model-item label="跟进记录">
          <a-textarea :auto-size="{ minRows: 4, maxRows: 10 }" v-model="detail.remarks" placeholder="请输入跟进记录" />
        </a-form-model-item>
        <a-form-model-item label="跟进状态">
          <a-radio-group v-model="detail.status" @change="onChange">
            <a-radio :value="1">
              跟进成功
            </a-radio>
            <a-radio :value="2">
              跟进失败
            </a-radio>
            <a-radio :value="3">
              已完成
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import {list, addCommission, addRemarks} from '@/api/subscribe'
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN'
import {formatTime} from '@/utils/date'
import 'moment/locale/zh-cn'
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
      locale,
      page: 1,
      size: 10,
      columns: [
        {title: 'ID', dataIndex: 'id', key: 'id'},
        {title: '昵称', dataIndex: 'nickname', key: 'nickname'},
        {title: '手机号', dataIndex: 'mobile', key: 'mobile', width: '200px'},
        {title: '商品', dataIndex: 'item_title', key: 'item_title'},
        {title: '定位地址', dataIndex: 'location_addr', key: 'location_addr'},
        {title: '网络地址', dataIndex: 'ip_addr', key: 'ip_addr'},
        {title: '预约时间', dataIndex: 'created_at', key: 'created_at'},
        {title: '跟进记录', dataIndex: 'remarks', key: 'remarks', width: '200px', scopedSlots: { customRender: 'remarks' }},
        {title: '推荐人', dataIndex: 'pid_nickname', key: 'pid_nickname'},
        {title: '推荐人手机号', dataIndex: 'pid_mobile', key: 'pid_mobile', width: '200px'},
        {title: '编辑', dataIndex: 'edit', key: 'edit', fixed: 'right', scopedSlots: { customRender: 'edit' }},
      ],
      list: [],
      pid_mobile: '',
      mobile: '',
      pagination: {
        defaultPageSize: 10,
        hideOnSinglePage: true,
        total: 0
      },
      priceModal: false,
      remarksModal: false,
      book_date: '',
      detail:{},
      status: ''
    }
  },
  methods: {
    onChange(e, dateString){
      console.log(e, dateString)
      this.book_date = dateString
    },
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
      if(this.book_date){
        params.book_date = this.book_date
      }
      if(this.status){
        params.status = this.status
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
        this.priceModal = false
        this.remarksModal = false
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
    postPrice(){
      addCommission({
        id: this.detail.id,
        money: Number(this.detail.price)
      }).then(() => {
        this.$message.info('操作成功')
        this.searchData()
      })
    },
    /**
     * 添加备注
     */
    postRemarks(){
      addRemarks({
        id: this.detail.id,
        remarks: this.detail.remarks,
        status: this.detail.status
      }).then(() => {
        this.$message.info('操作成功')
        this.searchData()
      })
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
.ant-tag{
  cursor: pointer;
}
</style>
