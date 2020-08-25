<template>
  <div class="tourismList">
    旅游列表
    <editor/>
  </div>
</template>

<script>
export default {
  name: 'tourismList',
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
.tourismList{}
</style>
