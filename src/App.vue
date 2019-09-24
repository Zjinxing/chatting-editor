<template>
  <div id="app">
    <Editor :memberList="memberList" />
  </div>
</template>

<script>
import Editor from './components/Editor.vue'

export default {
  name: 'app',
  data() {
    return {
      memberList: [
        { name: '张三', id: 'zhangsan' },
        { name: '李四', id: 'lisi' },
        { name: '王五', id: 'wangwu' },
        { name: '赵六', id: 'zhaoliu' },
        { name: '张三四', id: 'zhangsansi' },
        { name: '李四五', id: 'lisiwu' },
        { name: '王五六', id: 'wangwuliu' },
      ],
    }
  },
  components: {
    Editor,
  },
}
</script>
<style lang="stylus">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 330px;
}
</style>
