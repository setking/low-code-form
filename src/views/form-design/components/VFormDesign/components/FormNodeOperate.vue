<template>
  <div class="copy-delete-box">
    <a class="copy" :class="activeClass" @click.stop="handleCopy">
      <el-icon size="20">
        <document-copy />
      </el-icon>
    </a>
    <a class="delete" :class="activeClass" @click.stop="handleDelete">
      <el-icon size="20">
        <delete-filled />
      </el-icon>
    </a>
  </div>
</template>
<script lang="ts" setup>
import { remove } from '@/utils';
import { useFormDesignState } from '@/views/form-design/hook/useFormDesignState';
import { IVFormComponent } from '@/views/form-design/typings/v-form-component';
import { computed } from 'vue';

const props = defineProps({
  schema: {
    type: Object,
    default: () => ({}),
  },
  currentItem: {
    type: Object,
    default: () => ({}),
  },
});
const { formConfig, formDesignMethods } = useFormDesignState();
const activeClass = computed(() => {
  return props.schema.key === props.currentItem.key ? 'active' : 'un-active';
});
/**
 * 删除当前项
 */
const handleDelete = () => {
  const traverse = (schemas: IVFormComponent[]) => {
    schemas.some((formItem, index) => {
      const { component, key } = formItem;
      // 处理栅格和标签页布局
      ['Grid', 'Tabs'].includes(component) && formItem.columns?.forEach((item) => traverse(item.children));
      if (key === props.currentItem.key) {
        let params: IVFormComponent =
          schemas.length === 1
            ? { component: '' }
            : schemas.length - 1 > index
              ? schemas[index + 1]
              : schemas[index - 1];
        formDesignMethods.handleSetSelectItem(params);
        remove(schemas, index);
        return true;
      }
    });
  };
  traverse(formConfig.value!.schemas);
};
const handleCopy = () => {
  formDesignMethods.handleCopy();
};
</script>
