<template>
  <div>
    <div>
      <el-empty v-if="!formConfig.currentItem.key" description="未选择组件"></el-empty>
      <el-form label-position="left">
        <div v-if="formConfig.currentItem && formConfig.currentItem.componentProps">
          <el-form-item v-for="item in inputOptions" :key="item.name" :label="item.label">
            <div v-if="item.children">
              <template v-for="(child, index) of item.children" :key="index">
                <component
                  v-if="child.component"
                  v-bind="child.componentProps"
                  v-model:value="formConfig.currentItem.componentProps[item.name][index]"
                  :is="child.component"
                />
              </template>
            </div>
            <component
              :is="item.component"
              v-else-if="item.component"
              v-bind="item.componentProps"
              v-model:value="formConfig.currentItem.componentProps[item.name]"
            />
          </el-form-item>
          <el-form-item label="控制属性">
            <el-col v-for="item in controlOptions" :key="item.name">
              <el-checkbox
                v-if="showControlAttrs(item.includes)"
                v-bind="item.componentProps"
                v-model:checked="formConfig.currentItem.componentProps[item.name]"
              >
                {{ item.label }}
              </el-checkbox>
            </el-col>
          </el-form-item>
        </div>
        <el-form-item label="关联字段">
          <el-select mode="multiple" v-model:value="formConfig.currentItem['link']" :options="linkOptions" />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useFormDesignState } from '@/views/form-design/hook/useFormDesignState';
import { formItemsForEach } from '@/views/form-design/utils';
import { remove } from 'lodash-es';
import { computed, ref, watch } from 'vue';
import { IBaseFormAttrs } from '../config/formItemPropsConfig';
import {
  baseComponentAttrs,
  baseComponentCommonAttrs,
  baseComponentControlAttrs,
  componentPropsFuncs,
} from '../config/componentPropsConfig';

const allOptions = ref([] as Omit<IBaseFormAttrs, 'tag'>[]);
const showControlAttrs = (includes: string[] | undefined) => {
  if (!includes) return true;
  return includes.includes(formConfig.value.currentItem!.component);
};

const { formConfig } = useFormDesignState();

if (formConfig.value.currentItem) {
  formConfig.value.currentItem.componentProps = formConfig.value.currentItem.componentProps || {};
}

watch(
  () => formConfig.value.currentItem?.field,
  (_newValue, oldValue) => {
    formConfig.value.schemas &&
      formItemsForEach(formConfig.value.schemas, (item) => {
        if (item.link) {
          const index = item.link.findIndex((linkItem) => linkItem === oldValue);
          index !== -1 && remove(item.link, index);
        }
      });
  },
);

watch(
  () => formConfig.value.currentItem && formConfig.value.currentItem.component,
  () => {
    allOptions.value = [];
    baseComponentControlAttrs.forEach((item) => {
      item.category = 'control';
      if (!item.includes) {
        // 如果属性没有include，所有的控件都适用

        allOptions.value.push(item);
      } else if (item.includes.includes(formConfig.value.currentItem!.component)) {
        // 如果有include，检查是否包含了当前控件类型
        allOptions.value.push(item);
      }
    });

    baseComponentCommonAttrs.forEach((item) => {
      item.category = 'input';
      if (item.includes) {
        if (item.includes.includes(formConfig.value.currentItem!.component)) {
          allOptions.value.push(item);
        }
      } else if (item.exclude) {
        if (!item.exclude.includes(formConfig.value.currentItem!.component)) {
          allOptions.value.push(item);
        }
      } else {
        allOptions.value.push(item);
      }
    });

    baseComponentAttrs[formConfig.value.currentItem!.component] &&
      baseComponentAttrs[formConfig.value.currentItem!.component].forEach(async (item) => {
        if (item.component) {
          if (['ElSwitch', 'ElCheckbox', 'ElRadio', 'ElSelect'].includes(item.component as string)) {
            item.category = 'control';
            allOptions.value.push(item);
          } else {
            item.category = 'input';
            allOptions.value.push(item);
          }
        }
      });
  },
  {
    immediate: true,
  },
);
// 控制性的选项
const controlOptions = computed(() => {
  return allOptions.value.filter((item) => {
    return item.category == 'control';
  });
});

// 非控制性选择
const inputOptions = computed(() => {
  return allOptions.value.filter((item) => {
    return item.category == 'input';
  });
});

watch(
  () => formConfig.value.currentItem!.componentProps,
  () => {
    const func = componentPropsFuncs[formConfig.value.currentItem!.component];
    if (func) {
      func(formConfig.value.currentItem!.componentProps, allOptions.value);
    }
  },
  {
    immediate: true,
    deep: true,
  },
);
const linkOptions = computed(() => {
  return (
    formConfig.value.schemas &&
    formConfig.value.schemas
      .filter((item) => item.key !== formConfig.value.currentItem!.key)
      .map(({ label, field }) => ({ label: label + '/' + field, value: field }))
  );
});
</script>
