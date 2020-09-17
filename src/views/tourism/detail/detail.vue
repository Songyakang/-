<template>
  <div class="toutismDetail">
    <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="产品标题">
        <a-input v-model="form.title" class="line" placeholder="请输入产品标题" />
      </a-form-model-item>
      <a-form-model-item label="推广语">
        <a-input v-model="form.desc" class="line" placeholder="请输入产品标题" />
      </a-form-model-item>
      <a-form-model-item label="产品图片">
        <a-upload
          name="file"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          action="https://api.muyang.heiym.com/api/admin/common/upload"
          :headers='headers'
          @change="handleChange"
        >
          <div v-if='form.photos.length < 10'>
            <a-icon :type="loading ? 'loading' : 'plus'" />
            <div class="ant-upload-text">
              Upload
            </div>
          </div>
        </a-upload>
        <div class="img-list" v-for='(item, index) in form.photos' :key='index'>
          <img :src='item'>
        </div>
      </a-form-model-item>
      <a-form-model-item label="产品价格">
        <a-input @keyup='test("money")' v-model='form.money' class="line" type='number' placeholder="请输入产品价格" />
      </a-form-model-item>
      <a-form-model-item label="划线价格">
        <a-input @keyup='test("line_money")' v-model="form.line_money" class="line" type='number' placeholder="请输入划线价格" />
      </a-form-model-item>
      <a-form-model-item label="库存">
        <a-input @keyup='test("stock_nums")' v-model='form.stock_nums' class="line" type='number' placeholder="请输入商品库存" />
      </a-form-model-item>
      <a-form-model-item label="是否销售">
        <a-switch default-checked checked-children="销售" un-checked-children="下架"  v-model='form.status'/>
      </a-form-model-item>
      <a-form-model-item label="虚拟销量">
        <a-input v-model="form.virtual_sales" class="line" type='number' placeholder="请输入虚拟销量" />
      </a-form-model-item>
      <a-form-model-item label="商家信息">
        <div v-for='(item, index) in form.shops' :key='index'>
          <a-form-model layout='inline'>
            <a-form-model-item label="商家名称">
              <a-input v-model="item.shop_name" placeholder="请输入商家名称" />
            </a-form-model-item>
            <a-form-model-item label="地址信息">
              <a-input v-model="item.shop_addr" placeholder="请输入商家地址信息" />
            </a-form-model-item>
            <a-form-model-item label="经度">
              <a-input v-model="item.longitude" @click="visible = true, changeindex = index" style="background: #ffffff;" placeholder="请输入商家经纬度" />
            </a-form-model-item>
            <a-form-model-item label="纬度">
              <a-input v-model="item.latitude" @click="visible = true, changeindex = index" style="background: #ffffff;" placeholder="请输入商家经纬度" />
            </a-form-model-item>
            <a-form-model-item label="电话">
              <a-input v-model="item.shop_phone" placeholder="请输入商家电话" />
            </a-form-model-item>
            <a-form-model-item>
              <a-button @click="addshopinfo" type="primary" shape="circle" icon="plus" />
            </a-form-model-item>
            <a-form-model-item v-if='form.shops.length != 1'>
              <a-button @click.stop='deleteshop(index)' type="danger" shape="circle" icon="minus" />
            </a-form-model-item>
          </a-form-model>
        </div>
      </a-form-model-item>
      <a-form-model-item label="产品描述">
        <div style='width: 800px;'>
          <editor :data='form.details' @changeData='writeEditor'/>
        </div>
      </a-form-model-item>
      <a-form-model-item label="上架时间">
        <a-time-picker format='HH:mm:ss' valueFormat='HH:mm:ss' v-model='form.start_time' size="large" />
        <span style='margin: 0 10px;'>至</span>
        <a-time-picker format='HH:mm:ss' valueFormat='HH:mm:ss' v-model='form.end_time'  size="large" />
      </a-form-model-item>
      <a-form-model-item>
        <a-button @click="post">提交</a-button>
      </a-form-model-item>
    </a-form-model>

    <a-modal v-model="visible" :width='"800px"' title="选择地图" ok-text="确认" cancel-text="取消" @ok="changeModal">
      <tencent-map @setLonaLat='setLonaLat'/>
    </a-modal>
  </div>
</template>

<script>
import {postData, changeData} from '@/api/goods'
export default {
  name: 'toutismDetail',
  created(){
    Object.prototype.hasOwnProperty.call(this.$route.query,'data') ? this.form ={...JSON.parse(this.$route.query.data) , status: JSON.parse(this.$route.query.data) == 1 ? true : false} : null
  },
  components:{
    editor: () => import('@/components/editor'),
    tencentMap: () => import('@/components/tencentMap')
  },
  filters:{
  },
  data(){
    return {
      visible: false,
      changeindex: null,
      labelCol: { span: 2 },
      wrapperCol: { span: 22 },
      form: {
        title: '',
        desc: '',
        photos: [],
        money: 0,
        line_money: 0,
        stock_nums: 0,
        sold: 0,
        type: 1,
        status: true,
        virtual_sales: 0,
        shops: [
          {shop_name: '', shop_addr: '', longitude: '', latitude: '', shop_phone: ''}
        ],
        details: '',
        start_time: '12:08:23',
        end_time: '22:33:44',
        imageUrl: []
      },
      headers: {
        token: localStorage.token
      },
      loading: false
    }
  },
  methods: {
    handleChange(e){
      console.log(e.file.response)
      if(e.file.response){
        if(e.file.response.code == 200){
          console.log(e.file.response.data)
          this.form.photos.push(e.file.response.data.url)
        }else{
          this.$message.error(e.file.response.msg)
        }
      }
    },
    changeModal(){
      this.visible = !this.visible
    },
    setLonaLat(e){
      console.log(this.changeindex,e)
      this.form.shops[this.changeindex] = {
        ...this.form.shops[this.changeindex],
        longitude: e.latLng.lng,
        latitude: e.latLng.lat
      }
    },
    addshopinfo(){
      this.form.shops.push({shop_name: '', shop_addr: '', longitude: '', latitude: '', shop_phone: ''})
    },
    deleteshop(index){
      console.log(11111111)
      this.form.shops.splice(index,1)
    },
    /**
     * 填写富文本信息
     * @params {string} e.data 富文本内容
     */
    writeEditor(e){
      this.form.details = e.data
    },
    post(){
      setTimeout(() => {
        if(this.$route.query.data){
          changeData({...this.form, status: this.form.status ? 1 : 0}).then(res => {
             this.$message.success(res.msg,10)
             this.$router.go(-1)
          })
        }else{
          postData({...this.form, status: this.form.status ? 1 : 0}).then(res => {
            this.$message.success(res.msg,10)
            this.$router.go(-1)
          })
        }
      }, 100)
    },
    changetime(e) {
      this.form.end_time = e
    },
    test(e){
      this.form[e] = this.form[e].replace(/^0{1,9}/g, '')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.line{
  width: auto;
}
.avatar-uploader{
  display: table;
  float: left;
  width: 104px;
  height: 104px;
  margin-right: 8px;
  margin-bottom: 8px;
  text-align: center;
  vertical-align: top;
  background-color: #fafafa;
  border-radius: 4px;
  cursor: pointer;
}
.img-list{
  display: table;
  float: left;
  width: 104px;
  height: 104px;
  margin-right: 8px;
  margin-bottom: 8px;
  text-align: center;
  vertical-align: top;
  background-color: #fafafa;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  cursor: pointer;
  transition: border-color 0.3s ease;
  img{
    width: 100px;
    height: 100px;
  }
}
</style>
