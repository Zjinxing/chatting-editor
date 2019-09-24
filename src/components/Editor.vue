<template>
  <div ref="editor" class="editor">
    <div class="editor-tools">
      <el-popover placement="top-start" trigger="click" v-model="emojiVisible">
        <span slot="reference" style="cursor: pointer" @click="getFocus">😀</span>
        <Emoji @select-emoji="onSelectEmoji" />
      </el-popover>
    </div>
    <div
      ref="editorContent"
      class="editor-content"
      contenteditable="true"
      @focus="onFocus"
      @blur="onBlur"
      @keyup.shift.50.exact="onMention"
    ></div>
    <ul v-show="memberListVisible" ref="memberList" class="member-list">
      <li
        class="member-list-item"
        v-for="member in memberList"
        :key="member.id"
        @click="insertMention(member.name, member.id)"
      >
        {{ member.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import Emoji from './Emoji'

export default {
  name: 'Editor',
  props: {
    memberList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      emojiVisible: false,
      memberListVisible: false,
    }
  },
  mounted() {
    this.getFocus()
  },
  methods: {
    insertMention(name, id) {
      console.log(name, id)
      const sel = document.getSelection()
      const range = sel.getRangeAt(0)
      const el = this.$refs.editorContent
      const { fontSize } = getComputedStyle(el)
      const canvas = document.createElement('canvas')
      const width = parseInt(fontSize, 10) * (name.length + 1) + 10
      const height = parseInt(fontSize, 10) + 10
      console.log({ width, height })
      canvas.width = width
      canvas.height = height
      canvas.style.background = '#fff'
      const ctx = canvas.getContext('2d')
      ctx.font = `${fontSize} Arial`
      ctx.fillText(`@${name}`, 5, 5 + parseInt(fontSize, 10))
      ctx.save()
      const dataURL = canvas.toDataURL()
      console.log(dataURL)
      const img = document.createElement('img')
      img.src = dataURL
      img.setAttribute('data-name', `@${name}`)
      img.setAttribute('data-id', id)
      img.style.verticalAlign = 'text-bottom'
      sel.removeAllRanges()
      range.insertNode(img)
      range.collapse()
      this.memberListVisible = false
    },
    getFocus() {
      const el = this.$refs.editorContent
      el.focus()
    },
    // 获取光标相对父元素的位置
    onMention() {
      const el = this.$refs.editor
      const sel = document.getSelection()
      const range = sel.getRangeAt(0)
      const [rect] = range.getClientRects()
      const [content] = el.getClientRects()
      console.log(rect)
      console.log(content)
      const left = rect.x - content.x
      const top = rect.y - content.y
      const memberListEle = this.$refs.memberList
      memberListEle.style.left = `${left}px`
      memberListEle.style.top = `${top}px`
      this.memberListVisible = true
    },
    onSelectEmoji(code) {
      const el = this.$refs.editorContent
      el.focus()
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
      const memberList = document.querySelector('.member-list')
      const { path } = e
      if (path.includes(toolBar) || path.includes(memberList)) {
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

  .member-list {
    position: absolute;
    max-height: 150px;
    background: #fff;
    border: 1px solid #ececec;
    list-style: none;
    box-shadow: 0 0 10px #ccc;
    overflow: auto;
    padding: 0;
    margin: 0;

    &-item {
      display: flex;
      align-items: center;
      padding: 5px 12px;
      cursor: pointer;
      text-align: center;

      &:hover {
        background: #ececec;
      }
    }
  }
}
</style>
