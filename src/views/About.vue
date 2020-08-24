<template>
  <div class="about">
    <h1>{{username}}</h1>
  </div>
</template>
<script>
export default {
  name: 'about',
  computed: {
    username(){
      return this.$store.state.user.name
    }
  },
  created(){
    this.todo()
  },
  methods: {
    todo(){
      console.log(this.$store.state.user)
    }
  }
}
</script>
