/**
 * @description：表单配置
 */
import { IVFormComponent } from '../typings/v-form-component';
import { componentMap as useCmp, add } from '@/components/Form/src/componentMap';
import { ComponentType } from '@/components/Form/src/types';

import { componentMap as Cmp } from '../components';
import { Component } from 'vue';
import { isArray } from 'lodash-es';
//
const componentMap = new Map<string, Component>();
//
//如果有其它控件，可以在这里初始化
//
// 注册element-plus控件库;
Cmp.forEach((value, key) => {
  componentMap.set(key, value);
  if (useCmp[key] == null) {
    add(key as ComponentType, value);
  }
});
//注册vben控件库
useCmp.forEach((value, key) => {
  componentMap.set(key, value);
});

export { componentMap };
//
// /**
//  * 设置自定义表单控件
//  * @param {IVFormComponent | IVFormComponent[]} config
//  */
export function setFormDesignComponents(config: IVFormComponent | IVFormComponent[]) {
  if (isArray(config)) {
    config.forEach((item) => {
      const { componentInstance: component, ...rest } = item;
      componentMap[item.component] = component;
      customComponents.push(Object.assign({ props: {} }, rest));
    });
  } else {
    const { componentInstance: component, ...rest } = config;
    componentMap[config.component] = component;
    customComponents.push(Object.assign({ props: {} }, rest));
  }
}

//外部设置的自定义控件
export const customComponents: IVFormComponent[] = [
  {
    component: 'UseSelect',
    label: '下拉选择2',
    field: '',
    colProps: { span: 24 },
    componentProps: {
      options: [
        {
          label: '选项1',
          value: '1',
        },
        {
          label: '选项2',
          value: '2',
        },
      ],
    },
  },
];

// 左侧控件列表与初始化的控件属性
// props.slotName,会在formitem级别生成一个slot,并绑定当前record值
// 属性props，类型为对象，不能为undefined或是null。
export const baseComponents: IVFormComponent[] = [
  {
    component: 'ElInput',
    label: '输入框',
    field: '',
    colProps: { span: 24 },
    componentProps: {
      type: 'text',
    },
  },
  {
    component: 'ElSelect',
    label: '下拉选择',
    field: '',
    colProps: { span: 24 },
    componentProps: {
      options: [
        {
          label: '选项1',
          value: '1',
        },
        {
          label: '选项2',
          value: '2',
        },
      ],
    },
  },
];

export const layoutComponents: IVFormComponent[] = [
  {
    field: '',
    component: 'Grid',
    label: '栅格布局',
    icon: 'icon-grid',
    componentProps: {},
    columns: [
      {
        span: 12,
        children: [],
      },
      {
        span: 12,
        children: [],
      },
    ],
    colProps: { span: 24 },
    options: {
      gutter: 0,
    },
  },
];
