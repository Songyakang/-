<template>
  <div class="tourismList">
    <editor/>
  </div>
</template>

<script>
export default {
  name: 'tourismList',
  created(){
  },
  components:{
  },
  filters:{
  },
  data(){
    return {
      test: '22222222'
    }
  },
  methods: {
    show(){
      console.log(this.test)
    },
    changeddd(e){
      this.test = e
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.tourismList{}
</style>
