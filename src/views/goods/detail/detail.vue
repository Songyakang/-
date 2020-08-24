<template>
  <div class="goodsDetail">
    商品详情
    <editor/>
  </div>
</template>

<script>
export default {
  name: 'goodsDetail',
  created(){
  },
  components:{
    editor: () => import('@/components/editor')
  },
  filters:{
  },
  data(){
    return {
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.goodsDetail{}
</style>
