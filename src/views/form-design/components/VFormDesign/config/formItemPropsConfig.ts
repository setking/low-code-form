import { IAnyObject } from '@/views/form-design/typings/base-type';
import { Component } from 'vue';

export const globalConfigState: { span: number } = {
  span: 24,
};
export interface IBaseFormAttrs {
  name: string; // 字段名
  label: string; // 字段标签
  component?: string | Component; // 属性控件
  componentProps?: IAnyObject; // 传递给控件的属性
  exclude?: string[]; // 需要排除的控件
  includes?: string[]; // 符合条件的组件
  on?: IAnyObject;
  children?: IBaseFormAttrs[];
  category?: 'control' | 'input';
}
export interface IBaseFormItemControlAttrs extends IBaseFormAttrs {
  target?: 'props' | 'options'; // 绑定到对象下的某个目标key中
}
export const baseFormItemControlAttrs: IBaseFormItemControlAttrs[] = [
  {
    name: 'required',
    label: '必填项',
    component: 'ElCheckbox',
    exclude: ['alert'],
  },
  {
    name: 'hidden',
    label: '隐藏',
    component: 'ElCheckbox',
    exclude: ['alert'],
  },
  {
    name: 'hiddenLabel',
    component: 'ElCheckbox',
    exclude: ['Grid'],
    label: '隐藏标签',
  },
  {
    name: 'hasFeedback',
    label: '输入反馈',
    component: 'ElCheckbox',
    componentProps: {},
    includes: ['ElInput'],
  },
  {
    name: 'autoLink',
    label: '自动关联',
    component: 'ElCheckbox',
    componentProps: {},
    includes: ['ElInput'],
  },
  {
    name: 'validateFirst',
    label: '检验证错误停止',
    component: 'ElCheckbox',
    componentProps: {},
    includes: ['ElInput'],
  },
];
