<template>
  <el-col v-bind="colPropsComputed">
    <el-form v-bind="{ ...formItemProps }" style="width: 100%">
      <el-form-item>
        <template #label v-if="!formItemProps.hiddenLabel && schema.component !== 'Divider'">
          <el-tooltip>
            <template #content v-if="schema.helpMessage"
              ><span>{{ schema.helpMessage }}</span></template
            >
            <span>{{ schema.label }}</span>
          </el-tooltip>
        </template>
        <slot
          v-if="schema.componentProps && schema.componentProps?.slotName"
          :name="schema.componentProps.slotName"
          v-bind="schema"
        ></slot>
        <el-divider v-else-if="schema.component == 'Divider' && schema.label && !formItemProps.hiddenLabel">{{
          schema.label
        }}</el-divider>
        <!-- 部分控件需要一个空div -->
        <div>
          <component
            :is="componentItem"
            class="v-form-item-wrapper"
            v-bind="{ ...cmpProps, ...asyncProps }"
            :schema="schema"
            :style="schema.width ? { width: schema.width } : {}"
            @change="handleChange"
            @click="handleClick(schema)"
          />
          {{ cmpProps }}
        </div>
        <span v-if="['ElButton'].includes(schema.component)">{{ schema.label }}</span>
      </el-form-item>
    </el-form>
  </el-col>
</template>
<script lang="ts" setup>
import { IFormConfig, IVFormComponent } from '@/views/form-design/typings/v-form-component';
import { computed, PropType, unref } from 'vue';
import { componentMap } from '@/views/form-design/core/formItemConfig';
import { useFormModelState } from '@/views/form-design/hook/useFormDesignState';
import { omit } from 'lodash-es';
import { asyncComputed } from '@vueuse/core';
import { handleAsyncOptions } from '@/views/form-design/utils';
/**
 * 字符串类型对象
 */
type Recordable<T = any> = Record<string, T>;

const props = defineProps({
  formData: {
    type: Object,
    default: () => ({}),
  },
  schema: {
    type: Object as PropType<IVFormComponent>,
    required: true,
  },
  formConfig: {
    type: Object as PropType<IFormConfig>,
    required: true,
  },
});
const emits = defineEmits(['update:form-data', 'change']);
const { formModel: formData1, setFormModel } = useFormModelState();
const colPropsComputed = computed(() => {
  const { colProps = {} } = props.schema;
  return colProps;
});
const formItemProps = computed(() => {
  const { formConfig } = unref(props);
  let { field, required, rules, labelCol } = unref(props.schema);
  const { itemProps } = unref(props.schema);
  /**
   * 将字符串正则格式化成正则表达式
   */
  labelCol = labelCol
    ? labelCol
    : formConfig.layout === 'horizontal'
      ? formConfig.labelLayout === 'flex'
        ? `${formConfig.labelWidth}px`
        : formConfig.labelCol
      : {};
  const style = formConfig.layout === 'horizontal' && formConfig.labelLayout === 'flex' ? { display: 'flex' } : {};
  const newConfig = Object.assign(
    {},
    {
      name: field,
      labelWidth: labelCol,
      labelPosition: formConfig.labelPosition,
      style: { ...style },
      required,
      rules,
    },
    itemProps,
  );
  if (!itemProps?.rules) {
    newConfig.rules = rules;
  }
  console.log(newConfig);
  return newConfig;
}) as Recordable<any>;
const componentItem = computed(() => componentMap.get(props.schema?.component as string));
console.log('componentItem', componentItem.value);
const handleClick = (schema: IVFormComponent) => {
  if (schema.component === 'ElButton' && schema.componentProps?.handle) {
    emits(schema.componentProps?.handle);
  }
};
/**
 * 处理异步属性，异步属性会导致一些属性渲染错误，如defaultValue异步加载会导致渲染不出来，故而此处只处理options，treeData，同步属性在cmpProps中处理
 */
const asyncProps = asyncComputed(async () => {
  let { options, treeData } = props.schema.componentProps ?? {};
  if (options) options = await handleAsyncOptions(options);
  if (treeData) treeData = await handleAsyncOptions(treeData);

  return {
    options,
    treeData,
  };
});

/**
 * 处理同步属性
 */
const cmpProps = computed(() => {
  const isCheck = props.schema && ['ElSwitch', 'ElCheckbox', 'ElRadio'].includes(props.schema.component);
  let { field } = props.schema;

  let { disabled, ...attrs } = omit(props.schema.componentProps, ['options', 'treeData']) ?? {};

  disabled = props.formConfig.disabled || disabled;

  return {
    ...attrs,
    disabled,
    [isCheck ? 'checked' : 'value']: formData1.value[field!],
  };
});
console.log('asyncProps', cmpProps);
const handleChange = function (e) {
  const isCheck = ['ElSwitch', 'ElCheckbox', 'ElRadio'].includes(props.schema.component);
  const target = e ? e.target : null;
  const value = target ? (isCheck ? target.checked : target.value) : e;
  setFormModel(props.schema.field!, value);
  emits('change', value);
};
</script>
