<template>
  <div id="app">
    <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider  v-model="collapsed" :trigger="null" collapsible>
      <div class="logo">
        <img :src='avatar'>
        <div v-show='!collapsed'>{{name}}</div>
      </div>
      <a-menu  theme="dark" style='height: calc(100vh - 64px);' mode="inline">
        <template v-for='(item) in routesfmt'>
          <a-sub-menu v-if='item.children.length > 0' :key="item.name">
            <div class='menu-item' slot="title">
              <a-icon v-if='item.icon' :type="item.icon" />
              <span v-show='!collapsed'>{{item.name}}</span>
            </div>
            <a-menu-item @click='go(chitem)' v-for='(chitem) in item.children' :key="chitem.name">
              <a-icon v-if='chitem.icon' :type="chitem.icon" />
              <span>{{chitem.name}}</span>
            </a-menu-item>
          </a-sub-menu>
          <a-menu-item v-else @click='go(item)' :key="item.name">
            <a-icon v-if='item.icon' :type="item.icon" />
            <span>{{item.name}}</span>
          </a-menu-item>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
        <a-popover trigger="hover">
          <div style='position: absolute; right: 0px; padding: 0 40px;'>
            <a-icon  type="down" />
          </div>
            <template slot="content">
              <p @click.stop='cancellation'>注销</p>
            </template>
          </a-popover>
      </a-layout-header>
      <a-layout-content
        style='max-height: calc(100vh - 64px); overflow-y: scroll;'
      >
        <div class="content"> 
          <app-main />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
  </div>
</template>
<script>
import appMain from './components/appMain'
export default {
  name: 'app',
  components: {
    appMain
  },
  computed: {
    routesfmt() {
      let route = this.$router.options.routes.map(e => {
        let data = {
          icon: '', 
          ...e
        }
        if(Object.prototype.hasOwnProperty.call(e,'children')){
          data.children = e.children.filter(i => !i.hidden).map(i => {
            return {
              icon: '',
              ...i
            }
          })
        }
        return data
      }).filter(e => !e.hidden)
      console.log(route)
      return route
    },
    avatar() {
      return this.$store.state.user.avatar
    },
    name() {
      return this.$store.state.user.name
    }
  },
  data () {
    return {
      collapsed: false,
    }
  },
  created(){
  },
  methods: {
    cancellation(){
      this.$store.dispatch('user/logout').then(() => {
        this.$router.push({path: '/login'})
      })
    },
    /**
     * 路由跳转
     * @date 2020/8/19
     * @author 咸鱼康宝宝
     */
    go(e){
      this.$router.push({path: e.path})
    }
  }
}
</script>
<style scoped>
.logo{
  height: 64px;
  line-height: 64px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
.logo > img{
  width: 40px;
  border-radius: 50%;
}
.logo > div{
  margin-left: 10px;
}
.menu-item{
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.ant-menu-item{
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.header{
  background: #fff;
  border-bottom: 1px solid #f2f2f2;
  padding: 0 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
}
.content{
  margin: 24px 16px;
  padding: 24px;
  background: #fff;
  min-height: 280px;
}
</style>
