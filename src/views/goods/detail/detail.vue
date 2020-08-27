<template>
  <div class="goodsDetail">
    <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="产品标题">
        <a-input class="line" placeholder="请输入产品标题" />
      </a-form-model-item>
      <a-form-model-item label="产品图片">
        <a-upload
          name="avatar"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          @change="handleChange"
        >
          <div v-if='form.imageUrl.length != 10'>
            <a-icon :type="loading ? 'loading' : 'plus'" />
            <div class="ant-upload-text">
              Upload
            </div>
          </div>
          <img v-for='item in form.imageUrl' :key='item' :src="item" alt="avatar" />
        </a-upload>
      </a-form-model-item>
      <a-form-model-item label="产品价格">
        <a-input class="line" type='number' placeholder="请输入产品价格" />
      </a-form-model-item>
      <a-form-model-item label="划线价格">
        <a-input class="line" type='number' placeholder="请输入划线价格" />
      </a-form-model-item>
      <a-form-model-item label="库存">
        <a-input class="line" type='number' placeholder="请输入商品库存" />
      </a-form-model-item>
      <a-form-model-item label="虚拟销量">
        <a-input class="line" type='number' placeholder="请输入虚拟销量" />
      </a-form-model-item>
      <a-form-model-item label="商家信息">
        <div v-for='(item, index) in form.shopinfo' :key='index'>
          <a-form-model layout='inline'>
            <a-form-model-item label="商家名称">
              <a-input v-model="item.name" placeholder="请输入商家名称" />
            </a-form-model-item>
            <a-form-model-item label="地址信息">
              <a-input v-model="item.address" placeholder="请输入商家地址信息" />
            </a-form-model-item>
            <a-form-model-item label="经纬度">
              <a-input v-model="item.latLng" @click="visible = true, changeindex = index" style="background: #ffffff;" placeholder="请输入商家经纬度" />
            </a-form-model-item>
            <a-form-model-item label="电话">
              <a-input v-model="item.phone" placeholder="请输入商家电话" />
            </a-form-model-item>
            <a-form-model-item>
              <a-button @click="addshopinfo" type="primary" shape="circle" icon="plus" />
            </a-form-model-item>
            <a-form-model-item v-if='form.shopinfo.length != 1'>
              <a-button type="danger" shape="circle" icon="minus" />
            </a-form-model-item>
          </a-form-model>
        </div>
      </a-form-model-item>
      <a-form-model-item label="产品描述">
        <div style='width: 800px;'>
          <editor/>
        </div>
      </a-form-model-item>
      <a-form-model-item label="上架时间">
        <a-time-picker :default-value="moment(form.start_time, 'HH:mm:ss')" size="large" />
        <span style='margin: 0 10px;'>至</span>
        <a-time-picker :default-value="moment(form.end_time, 'HH:mm:ss')" size="large" />
      </a-form-model-item>
    </a-form-model>

    <a-modal v-model="visible" :width='"800px"' title="选择地图" ok-text="确认" cancel-text="取消" @ok="changeModal">
      <tencent-map @setLonaLat='setLonaLat'/>
    </a-modal>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'goodsDetail',
  created(){
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
        images: [],
        price: 0,
        line_price: 0,
        stock: 0,
        sold: 0,
        shopinfo: [
          {name: '', address: '', latLng: '', phone: ''}
        ],
        edit: '',
        start_time: '12:08:23',
        end_time: '12:08:23',
        imageUrl: []
      },
      loading: false
    }
  },
  methods: {
    moment,
    handleChange(e){
      console.log(e)
    },
    changeModal(e){
      this.visible = !this.visible
      console.log(e)
    },
    setLonaLat(e){
      console.log(this.changeindex,e)
      this.form.shopinfo[this.changeindex].latLng = e.latLng.toString()
    },
    addshopinfo(){
      this.form.shopinfo.push({name: '', address: '', latLng: '', phone: ''})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.goodsDetail{}
.line{
  width: auto;
}
</style>
