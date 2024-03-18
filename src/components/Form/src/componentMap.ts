import type { Component } from 'vue';
import type { ComponentType } from './types';

/**
 * Component list, register here to setting it in the form
 */
import { ElInput, ElDivider, ElSelect } from 'element-plus';
import useSelect from '../component/ElSelectV2.vue';

const componentMap = new Map<ComponentType, Component>();

componentMap.set('ElInput', ElInput);
componentMap.set('ElDivider', ElDivider);
componentMap.set('ElSelect', ElSelect);
componentMap.set('UseSelect', useSelect);

export function add(compName: ComponentType, component: Component) {
  componentMap.set(compName, component);
}

export function del(compName: ComponentType) {
  componentMap.delete(compName);
}

export { componentMap };
