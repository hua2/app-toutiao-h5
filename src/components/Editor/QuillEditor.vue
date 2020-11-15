<template>
  <div :class="prefixCls">
    <div class="quill-toolbar">

      <div id="toolbar">
        <!-- Add subscript and superscript buttons -->
        <button class="ql-bold" />
        <button class="ql-italic" />
        <button class="ql-underline" />
        <button class="ql-strike" />
        <button class="ql-blockquote" />
        <button class="ql-code-block" />
        <button class="ql-header" value="1" />
        <button class="ql-header" value="2" />
        <button class="ql-list" value="ordered" />
        <button class="ql-list" value="bullet" />
        <button class="ql-script" value="sub" />
        <button class="ql-script" value="super" />
        <button class="ql-indent" value="-1" />
        <button class="ql-indent" value="+1" />
        <button class="ql-image" />
      </div>
    </div>
    <quill-editor
      ref="myQuillEditor"
      v-model="content"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
      @change="onEditorChange($event)"
    />

  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'QuillEditor',
  components: {
    quillEditor
  },
  props: {
    prefixCls: {
      type: String,
      default: 'editor-quill'
    },
    // 表单校验用字段
    // eslint-disable-next-line
    value: {
      type: String
    }
  },
  data() {
    return {
      content: null,
      editorOption: {
        // some quill options
        modules: {
          toolbar: '#toolbar'
        },
        placeholder: '输入'
      }
    }
  },
  watch: {
    value(val) {
      this.content = val
    }
  },
  methods: {
    onEditorBlur(quill) {
      console.log('editor blur!', quill)
    },
    onEditorFocus(quill) {
      console.log('editor focus!', quill)
    },
    onEditorReady(quill) {
      console.log('editor ready!', quill)
    },
    onEditorChange({ quill, html, text }) {
      this.$emit('change', html)
    }
  }
}
</script>

<style lang="scss" scoped>

.editor-quill {
  .quill-toolbar{
    width: 100%;
    overflow-x: auto;
    height: 36px;
    overflow-y: hidden;
    line-height: 30px;
    border: 1px solid #ccc;
    border-bottom-width: 0;
    .ql-toolbar{
      width: 500px;
      border-width: 0;
      padding: 0;
      button{
        width: 30px;
        height: 30px;
        padding: 6px;
        background: #eee;
        border-radius: 2px;
        margin: 2px;
      }
    }
  }
  .quill-editor{
    height: 200px;
  }
}
</style>
