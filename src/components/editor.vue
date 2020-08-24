<template>
  <div id="editor">
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
      console.log('onblur', html)
    }
    //配置菜单
    this.editor.customConfig.menus = this.menus

    //配置默认颜色
    this.editor.customConfig.colors = this.colors
    this.editor.create()
    console.log(this.editor)
  },
  data(){
    return {
      editor: null
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
