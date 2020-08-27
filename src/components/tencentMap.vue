<template>
  <div id="tencentMap">
    <div ref='container'  style="width:100%; height:500px"></div>
  </div>
</template>

<script>
export default {
  name: 'tencentMap',
  props: {
    mapkey: {
      type: String,
      default: 'XY3BZ-C733X-LND4L-7QIKK-UKONF-NVFOE'
    }
  },
  mounted(){
    this.init()
  },
  data(){
    return {
      editor: null,
      map: null
    }
  },
  methods: {
    init (){
      const config = {
        zoom: 13,
        cneter: new qq.maps.LatLng(39.914850, 116.403765)
      }
      this.map = new qq.maps.Map(this.$refs.container, config)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
