<!---- Emoji 表情 ----->
<template>
  <div class="emoji-wrapper">
    <span v-emoji v-for="item in emojiArr" :key="item" class="emoji-item" @click="selectEmoji(item)">{{ item }}</span>
  </div>
</template>

<script>
import { emojiArr } from '../assets/emoji.json'

export default {
  data() {
    return {
      emojiArr,
    }
  },
  methods: {
    selectEmoji(code) {
      this.$emit('select-emoji', code)
    },
  },
}
</script>

<style lang="stylus" scoped>
.emoji-wrapper {
  display: flex;
  flex-wrap: wrap;
  width: 390px;
  height: 300px;
  padding: 0;
  overflow-y: scroll;

  .emoji-item {
    cursor: pointer;

    & >>> img {
      width: 32px;
      height: 32px;
      padding: 3px;
    }
  }
}
</style>
