<template>
  <div>
    <el-dialog title="JSON数据" v-model="centerDialogVisible" width="30%" destroy-on-close center>
      <PreviewCode :editorJson="editorJson" />
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { ref } from '@vue/reactivity';
import PreviewCode from './PreviewCode.vue';
const centerDialogVisible = ref(false);
</script>
