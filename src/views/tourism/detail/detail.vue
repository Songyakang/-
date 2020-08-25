<template>
  <div class="tourismDetail">
    旅游详情
    <editor/>
  </div>
</template>

<script>
export default {
  name: 'tourismDetail',
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
.tourismDetail{}
</style>
