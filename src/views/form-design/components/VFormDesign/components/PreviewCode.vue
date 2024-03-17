<template>
  <div>
    <div class="v-json-box">
      <CodeEditor :value="editorJson" ref="myEditor" :mode="MODE.JSON" />
    </div>
    <div class="copy-btn-box">
      <el-button
        @click="handleCopyJson"
        type="primary"
        class="copy-btn"
        data-clipboard-action="copy"
        :data-clipboard-text="editorJson"
      >
        复制数据
      </el-button>
      <el-button @click="handleExportJson" type="primary">导出代码</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useMessage } from '@/hooks/web/useMessage';
import { copyText } from '@/views/form-design/utils/copyTextToClipboard';
import { reactive } from 'vue';

const props = defineProps({
  fileFormat: {
    type: String,
    default: 'json',
  },
  editorJson: {
    type: String,
    default: '',
  },
});
const state = reactive({
  visible: false,
});
const exportData = (data: string, fileName = `file.${props.fileFormat}`) => {
  let content = 'data:text/csv;charset=utf-8,';
  content += data;
  const encodedUri = encodeURI(content);
  const actions = document.createElement('a');
  actions.setAttribute('href', encodedUri);
  actions.setAttribute('download', fileName);
  actions.click();
};
const handleExportJson = () => {
  exportData(props.editorJson);
};
const { createMessage } = useMessage();
const handleCopyJson = () => {
  // 复制数据
  const value = props.editorJson;
  if (!value) {
    createMessage.warning('代码为空！');
    return;
  }
  copyText(value);
};
</script>
