<template>
  <div ref="editor" class="editor">
    <div class="editor-tools">
      <el-popover placement="top-start" trigger="click" v-model="emojiVisible">
        <span slot="reference" style="cursor: pointer">😀</span>
        <Emoji @select-emoji="onSelectEmoji" />
      </el-popover>
    </div>
    <div
      class="editor-content"
      contenteditable="true"
      @focus="onFocus"
      @blur="onBlur"
      @keyup.shift.50.exact="onKeyup"
    ></div>
  </div>
</template>

<script>
import Emoji from './Emoji'

export default {
  name: 'Editor',
  data() {
    return {
      emojiVisible: false,
    }
  },
  methods: {
    onKeyup() {
      const el = this.$refs.editor
      const sel = document.getSelection()
      const range = sel.getRangeAt(0)
      const [rect] = range.getClientRects()
      console.log(rect)
      const [content] = el.getClientRects()
      console.log(content)
    },
    onSelectEmoji(code) {
      const sel = getSelection()
      const range = sel.getRangeAt(0)
      const textNode = document.createTextNode(code)
      range.insertNode(textNode)
      sel.removeAllRanges()
      range.collapse()
      sel.addRange(range)
      this.emojiVisible = false
    },
    onFocus() {
      console.log('focus')
      document.addEventListener('mousedown', this.preventDefault)
    },
    onBlur() {
      console.log('blur')
      document.removeEventListener('mousedown', this.preventDefault)
    },
    preventDefault(e) {
      console.log(e)
      const toolBar = document.querySelector('.editor-tools')
      const { path } = e
      if (path.includes(toolBar)) {
        console.log('preventDefault')
        e.preventDefault()
      }
    },
  },
  components: {
    Emoji,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.editor {
  position: relative;
  width: 100%;
  height: 100%;
  padding-top: 20px;
  text-align: left;
  border: 1px solid #acacac;
  border-radius: 3px;

  &-tools {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 20px;
    padding: 0 5px 5px;
    background: #acf;
  }

  &-content {
    width: 100%;
    min-width: 600px;
    height: 100%;
    min-height: 220px;
    background: #fdc;
    padding: 10px 5px;
    outline: none;
  }
}
</style>
