<template>
  <el-select-v2 v-model="value" :options="options" placeholder="请选择" style="width: 240px" />
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const options = ref([
  {
    label: '选项1',
    value: '1',
  },
  {
    label: '选项2',
    value: '2',
  },
]);
const value = ref('');
</script>
