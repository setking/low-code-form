import type { Component } from 'vue';
//element-plus本身的Form控件库
import { ElButton, ElRadio, ElInput, ElSelect, ElDivider } from 'element-plus';
import { ComponentType } from '@/components/Form/src/types';
const componentMap = new Map<string, Component>();
componentMap.set('ElRadio', ElRadio);
componentMap.set('ElButton', ElButton);
componentMap.set('ElInput', ElInput);
componentMap.set('ElDivider', ElDivider);
componentMap.set('ElSelect', ElSelect);

export function add(compName: ComponentType, component: Component) {
  componentMap.set(compName, component);
}

export function del(compName: ComponentType) {
  componentMap.delete(compName);
}

export { componentMap };
