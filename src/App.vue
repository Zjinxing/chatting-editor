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
        { name: '张三', id: 'zhangsan', selected: false },
        { name: '李四', id: 'lisi', selected: false },
        { name: '王五', id: 'wangwu', selected: false },
        { name: '赵六', id: 'zhaoliu', selected: false },
        { name: '张三四', id: 'zhangsansi', selected: false },
        { name: '李四五', id: 'lisiwu', selected: false },
        { name: '王五六', id: 'wangwuliu', selected: false },
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
