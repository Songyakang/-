<template>
  <div id="tencentMap">
    <div id="container" style="width:500px; height:300px"></div>
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
    this.loadScript()
  },
  data(){
    return {
      editor: null
    }
  },
  methods: {
    loadScript (){
      const script = document.createElement("script")
      script.type = "text/javascript"
      script.src = `https://map.qq.com/api/js?v=2.exp&key=${this.mapkey}`
      //script.src = 'https://webapi.amap.com/maps?v=1.4.15&key=3a04fab20d0d7c49367233e3764df061'
      document.body.appendChild(script)
      script.onload = () => {
        console.log('加载完毕')
      }
    },
    init (){
      const myLatlng = window.qq.maps.LatLng(-34.397, 150.644)
      const myOptions = {
        zoom: 8,
        center: myLatlng,
        mapTypeId: window.qq.maps.MapTypeId.ROADMAP
      }
      window.AMap.Map('container');
      window.qq.maps.Map(document.getElementById("container"), myOptions)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
