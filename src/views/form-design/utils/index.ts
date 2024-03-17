import { IVFormComponent } from '../typings/v-form-component';
import { isArray, isFunction, uniqueId } from 'lodash-es';
import type { App, Component } from 'vue';
/**
 * 生成key
 * @param [formItem] 需要生成 key 的控件，可选，如果不传，默认返回一个唯一 key
 * @returns {string|boolean} 返回一个唯一 id 或者 false
 */
export function generateKey(formItem?: IVFormComponent): string | boolean {
  if (formItem && formItem.component) {
    const key = uniqueId(`${toLine(formItem.component)}_`);
    formItem.key = key;
    formItem.field = key;

    return true;
  }
  return uniqueId('key_');
}
/**
 * 遍历表单项
 * @param array
 * @param cb
 */
export function formItemsForEach(array: IVFormComponent[], cb: (item: IVFormComponent) => void) {
  if (!isArray(array)) return;
  const traverse = (schemas: IVFormComponent[]) => {
    schemas.forEach((formItem: IVFormComponent) => {
      if (['Grid'].includes(formItem.component)) {
        // 栅格布局
        formItem.columns?.forEach((item) => traverse(item.children));
      } else {
        cb(formItem);
      }
    });
  };
  traverse(array);
}
/**
 * 驼峰转下划线
 * @param str
 */
export function toLine(str: string) {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}

/**
 * 处理异步选项属性，如 select treeSelect 等选项属性如果传递为函数并且返回Promise对象，获取异步返回的选项属性
 * @param {(() => Promise<any[]>) | any[]} options
 * @return {Promise<any[]>}
 */
export const handleAsyncOptions = async (options: (() => Promise<any[]>) | any[]): Promise<any[]> => {
  try {
    if (isFunction(options)) return await options();
    return options;
  } catch {
    return [];
  }
};
type EventShim = {
  new (...args: any[]): {
    $props: {
      onClick?: (...args: any[]) => void;
    };
  };
};

export type WithInstall<T> = T & {
  install(app: App): void;
} & EventShim;
export type CustomComponent = Component & { displayName?: string };
export const withInstall = <T extends CustomComponent>(component: T, alias?: string) => {
  (component as Record<string, unknown>).install = (app: App) => {
    const compName = component.name || component.displayName;
    if (!compName) return;
    app.component(compName, component);
    if (alias) {
      app.config.globalProperties[alias] = component;
    }
  };
  return component as WithInstall<T>;
};
