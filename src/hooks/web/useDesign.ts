import { InjectionKey, inject, Ref, ShallowUnwrapRef } from 'vue';
interface AppProviderContextProps {
  prefixCls: Ref<string>;
  isMobile: Ref<boolean>;
}
export function useDesign(scope: string) {
  const values = useAppProviderContext();
  return {
    prefixCls: `${values.prefixCls}-${scope}`,
    prefixVar: values.prefixCls,
  };
}
export function useContext<T>(key: InjectionKey<T>, native?: boolean): T;

export function useContext<T>(key: InjectionKey<T> = Symbol(), defaultValue?: any): ShallowUnwrapRef<T> {
  return inject(key, defaultValue || {});
}
const key: InjectionKey<AppProviderContextProps> = Symbol();
function useAppProviderContext() {
  return useContext<AppProviderContextProps>(key);
}
