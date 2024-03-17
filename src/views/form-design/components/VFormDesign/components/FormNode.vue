<template>
  <div
    class="drag-move-box"
    :class="{ active: schema.key === formConfig.currentItem?.key }"
    @click.stop="handleSelectItem"
  >
    <div class="form-item-box">
      <VFormItem :form-config="formConfig" :schema="schema" />
    </div>
    <div class="show-key-box">
      {{ schema.label + (schema.field ? '/' + schema.field : '') }}
    </div>
    <FormNodeOperate :schema="schema" :currentItem="formConfig.currentItem" />
  </div>
</template>
<script lang="ts" setup>
import { PropType } from 'vue';
import { useFormDesignState } from '@/views/form-design/hook/useFormDesignState';
import { IVFormComponent } from '@/views/form-design/typings/v-form-component';
import VFormItem from '@/views/form-design/components/VFormItem/index.vue';
import FormNodeOperate from './FormNodeOperate.vue';
const props = defineProps({
  schema: {
    type: Object as PropType<IVFormComponent>,
    required: true,
  },
});
const { formConfig, formDesignMethods } = useFormDesignState();
const handleSelectItem = () => {
  formDesignMethods.handleSetSelectItem(props.schema);
};
</script>
