<template>
  <div style='position: relative;'>
    <div id="editor"></div>
    <div style='position: absolute; top: 6px; right: 10px;' @click="visible = true">插入代码</div>
    <a-modal v-model="visible" :width='"800px"' title="选择地图" ok-text="确认" cancel-text="取消" @ok="posthtml">
      <a-form-model style='margin-bottom: 20px;'>
        <a-form-model-item>
          <a-textarea :auto-size="{ minRows: 4, maxRows: 10 }" v-model="data" placeholder="请输入跟进记录" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import wangeditor from 'wangeditor'
export default {
  name: 'editor',
  props: {
    data: String,
    menus: {
      type: Array,
      default: () => {
        return [
          'head',  // 标题
          'bold',  // 粗体
          'fontSize',  // 字号
          'fontName',  // 字体
          'italic',  // 斜体
          'underline',  // 下划线
          'strikeThrough',  // 删除线
          'foreColor',  // 文字颜色
          'backColor',  // 背景颜色
          'link',  // 插入链接
          'list',  // 列表
          'justify',  // 对齐方式
          'quote',  // 引用
          'emoticon',  // 表情
          'image',  // 插入图片
          'table',  // 表格
          'video',  // 插入视频
          'code',  // 插入代码
          'undo',  // 撤销
          'redo'  // 前进
        ]
      }
    },
    colors: {
      type: Array,
      default: () => {
        return [
          '#000000',
          '#eeece0',
          '#1c487f',
          '#4d80bf',
          '#c24f4a',
          '#8baa4a',
          '#7b5ba1',
          '#46acc8',
          '#f2f2f2',
          '#ffffff'
        ]
      }
    }
  },
  mounted(){
    this.editor = new wangeditor('#editor')
    this.editor.customConfig.onblur = (html) => {
      this.$emit('changeData', {data: html})
    }
    this.initImage()
    //配置菜单
    this.editor.customConfig.menus = this.menus
    this.editor.customConfig.zIndex = 100
    //配置默认颜色
    this.editor.customConfig.colors = this.colors
    this.editor.create()
    this.editor.txt.html(this.data)
  },
  data(){
    return {
      editor: null,
      visible: false
    }
  },
  methods: {
    posthtml(){
      this.visible = false
      this.editor.txt.html(this.data)
      this.$emit('changeData', {data: this.data})
    },
    initImage(){
      this.editor.customConfig.uploadImgServer = 'https://api.muyang.heiym.com/api/admin/common/upload'
      this.editor.customConfig.uploadFileName = 'file'
      this.editor.customConfig.uploadImgHeaders = {
          token: localStorage.token
      }
      this.editor.customConfig.uploadImgHooks = {
        success: function (xhr, editor, result) {
            // 图片上传并返回结果，图片插入成功之后触发
            // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
            console.log('true',xhr, editor, result)
        },
        fail: function (xhr, editor, result) {
            // 图片上传并返回结果，但图片插入错误时触发
            // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
            console.log('false',xhr, editor, result)
        },
        customInsert: function (insertImg, result) {
            insertImg(result.data.url)
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#editor{
  z-index: 9;
}
</style>
