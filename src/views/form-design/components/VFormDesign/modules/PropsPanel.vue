<template>
  <div>
    <el-tabs v-model="activeKey">
      <el-tab-pane label="表单" name="1">
        <FormProps />
      </el-tab-pane>
      <el-tab-pane label="控件" name="2">用户管理</el-tab-pane>
      <el-tab-pane label="组件" name="3">
        <slot v-if="slotProps" :name="slotProps.component + 'Props'"></slot>
        <ComponentProps v-else />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts" setup>
import { customComponents } from '@/views/form-design/core/formItemConfig';
import { useFormDesignState } from '@/views/form-design/hook/useFormDesignState';
import { computed, ref } from 'vue';
import FormProps from '../components/FormProps.vue';
import ComponentProps from '../components/ComponentProps.vue';
const activeKey = ref('1');
type ChangeTabKey = 1 | 2;
export interface IPropsPanel {
  changeTab: (key: ChangeTabKey) => void;
}
const { formConfig } = useFormDesignState();
const slotProps = computed(() => {
  return customComponents.find((item) => item.component === formConfig.value.currentItem?.component);
});
</script>
