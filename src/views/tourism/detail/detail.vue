<template>
  <div class="tourismDetail">
    <div v-for='(item, index) in arr' :key='index'>
      {{item.name}}
      <input type='file' @input="upload" :data-index='index' />
      <span v-for='(img, ii) in item.img' :key='ii'>
        <img :src='img.base64'  />
      </span>
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'tourismDetail',
  data(){
    return {
      arr: [{name: '1', img: []}, {name: '2', img: []}, {name: '3', img: []}, {name: '4', img: []}]
    }
  },
  methods: {
    upload(e){
      let filereader = new FileReader()
      let index = e.target.getAttribute('data-index')
      filereader.readAsDataURL(e.srcElement.files[0]) 
      
      filereader.onloadend = (res) => { //文件读取完毕
        console.log('原图大小',res.total / 1024)
        if(res.loaded > 1024*1024){ //判断文件大小
          this.yasuoimg(res.target.result).then(res => {
            this.$set(this.arr, index, {...this.arr[index], img: [...this.arr[index].img, {name: e.srcElement.files[0].name, base64: res}]})
            console.log(res.replace(/data:image\/(jpeg|png|gif);base64,/, '').length / 1024, '')
          })
          
        }else{
          this.$set(this.arr, index, {...this.arr[index], img: [...this.arr[index].img, {name: e.srcElement.files[0].name, base64: res.target.result}]})
        }
      }
    },
    /**
     * 压缩图片
     * @params {String} base64 base64格式的字符串
     */
    yasuoimg (base64){
      return new Promise((reslove) => {
        let canvas = document.createElement('canvas')
        let ca = canvas.getContext('2d')
        let img = new Image()
        img.src = base64
        canvas.width = 1024
        img.onload = () => {
          canvas.height = img.height / img.width * 1024
          ca.drawImage(img, 0, 0, canvas.width, canvas.height)
          reslove(canvas.toDataURL('image/jpeg'))
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.tourismDetail{}
img{
  width: 200px;
  height: auto;
}
</style>
