<template>
  <div>
    Hi, Foo
    <button @click="clickMe">click me</button>
    <h1>{{this.$store.state.name}}</h1>
  </div>
</template>


<script>
export default {
  mounted() {
    this.$store.dispatch('changeName')
  },
  asyncData(store) { // 该方法只在服务端执行，并且只在页面组件中执行
  console.log('server run')
    return store.dispatch('changeName')
  },
  methods: {
    clickMe() {
      alert("hello~~")
    }
  }
}
</script>
