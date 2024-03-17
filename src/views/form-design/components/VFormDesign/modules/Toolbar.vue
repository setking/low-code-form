<template>
  <div class="tool-bar">
    <el-tooltip v-for="item in state.toolbarsConfigs" :key="item.icon" :content="item.title">
      <a class="toolbar-text" @click="$emit(item.event)">
        <el-icon size="30">
          <component :is="item.icon" />
        </el-icon>
      </a>
    </el-tooltip>
    <el-divider />
    <el-tooltip content="撤销">
      <a :class="{ disabled: !canUndo }" :disabled="!canUndo" @click="undo">
        <el-icon size="30">
          <refresh-left />
        </el-icon>
      </a>
    </el-tooltip>
    <el-tooltip content="重做">
      <a :class="{ disabled: !canUndo }" :disabled="!canUndo" @click="redo">
        <el-icon size="30">
          <refresh-right />
        </el-icon>
      </a>
    </el-tooltip>
  </div>
</template>
<script lang="ts" setup>
import { IFormConfig } from '@/views/form-design/typings/v-form-component';
import { UseRefHistoryReturn } from '@vueuse/core';
import { inject, reactive } from 'vue';

interface IToolbarsConfig {
  type: string;
  title: string;
  icon: string;
  event: string;
}
const state = reactive<{ toolbarsConfigs: IToolbarsConfig[] }>({
  toolbarsConfigs: [
    {
      title: '预览-支持布局',
      type: 'preview',
      event: 'handlePreview',
      icon: 'View',
    },
    {
      title: '预览-不支持布局',
      type: 'preview',
      event: 'handlePreview2',
      icon: 'View',
    },
    {
      title: '导入JSON',
      type: 'importJson',
      event: 'handleOpenImportJsonModal',
      icon: 'BottomLeft',
    },
    {
      title: '生成JSON',
      type: 'exportJson',
      event: 'handleOpenJsonModal',
      icon: 'TopRight',
    },
    {
      title: '生成代码',
      type: 'exportCode',
      event: 'handleOpenCodeModal',
      icon: 'Tickets',
    },
    {
      title: '清空',
      type: 'reset',
      event: 'handleClearFormItems',
      icon: 'DeleteFilled',
    },
  ],
});
const historyRef = inject('historyReturn') as UseRefHistoryReturn<IFormConfig, IFormConfig>;
const { undo, redo, canUndo, canRedo } = historyRef;
</script>
<style lang="scss" scoped>
.tool-bar {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
</style>
