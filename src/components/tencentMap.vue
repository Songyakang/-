<template>
  <div id="tencentMap">
    <a-form-model layout='inline'>
      <a-form-item label='搜索地址'>
        <a-auto-complete 
          @change="search" 
          :data-source='willdata' 
          class="search" 
          v-model='address'/>
      </a-form-item>
      <a-form-item label='城市'>
        <a-input class="searc" v-model="city"/>
      </a-form-item>
      <a-form-item>
        <a-button @click="search" type='primary'>搜索</a-button>
      </a-form-item>
    </a-form-model>
    
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
      map: null,
      marker: null,
      searchService: null,
      city: '苏州市',
      address: '咖啡馆',
      willdata: [],
      mapcilck: null,
      markersArray: []
    }
  },
  methods: {
    init (){
      const config = {
        zoom: 13,
        cneter: new qq.maps.LatLng(39.914850, 116.403765),
        panControl: true,
        panControlOptions: {
          position:  qq.maps.ControlPosition.RIGHT_CENTER
        }
      }
      const latlngBounds = new qq.maps.LatLngBounds()
      this.map = new qq.maps.Map(this.$refs.container, config)
      this.searchService = new qq.maps.SearchService({
        complete: (e) => {
          this.markersArray = []
          this.willdata = Array.from(new Set(e.detail.pois.map(e => e.address)))
          this.$emit('setLonaLat', {latLng: e.detail.pois[0].latLng})
          for(let i of e.detail.pois){
            latlngBounds.extend(i.latLng)
            this.setMarker(new qq.maps.LatLng(i.latLng.lat, i.latLng.lng))
          }
          if(e.detail.pois.length == 1){
            this.setMarker(new qq.maps.LatLng(e.detail.pois[0].latLng.lat, e.detail.pois[0].latLng.lng))
            this.map.panTo(new qq.maps.LatLng(e.detail.pois[0].latLng.lat, e.detail.pois[0].latLng.lng))
          }
          this.map.fitBounds(latlngBounds);
        }
      })
      this.mapcilck = new qq.maps.event.addListener(this.map, 'click', this.mapclick)
    },
    /***
     * 地图点击事件
     */
    mapclick (e) {
      if(this.marker){
        this.markersArray.map((e) => {
          e.setMap(null)
        })
      }
      this.setMarker(new qq.maps.LatLng(e.latLng.lat, e.latLng.lng))
      this.$emit('setLonaLat', {latLng: e.latLng})
    },
    /**
     * 设置标注点
     */
    setMarker (latLng = new qq.maps.LatLng(39.914850, 116.403765)){
      this.marker = new qq.maps.Marker({
        position: latLng,
        map: this.map
      })
      this.markersArray.push(this.marker)
    },
    /**
     * 搜索
     */
    search(){
      this.searchService.setLocation(this.city)
      this.searchService.search(this.address)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
#tencentMap{
  position: relative;
  .search{
    width: 200px;
    margin-bottom: 20px;
  }
}

</style>
