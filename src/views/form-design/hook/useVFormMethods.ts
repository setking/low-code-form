import { AForm, IFormConfig, IVFormComponent } from '../typings/v-form-component';
import { IAnyObject } from '../typings/base-type';

interface IFormInstanceMethods extends AForm {
  submit: () => Promise<any>;
}

export interface IProps {
  formConfig: IFormConfig;
  formModel: IAnyObject;
}

type ISet = <T extends keyof IVFormComponent>(filed: string, key: T, value: IVFormComponent[T]) => void;

type IGet = (filed: string) => IVFormComponent | undefined;

type IGetValue = (field: string) => any;
// 设置field在formData中的值并且触发校验
type ISetValue = (field: string | IAnyObject, value?: any) => void;
// 隐藏field对应的表单项
type IHidden = (field: string) => void;
// 显示field对应的表单项
type IShow = (field: string) => void;
// 设置field对应的表单项绑定的props属性
type ISetProps = (field: string, key: string, value: any) => void;
// 获取formData中的值
type IGetData = () => Promise<IAnyObject>;
// 禁用表单，如果field为空，则禁用整个表单
type IDisable = (field?: string | boolean) => void;
// 设置表单配置方法
// type ISetFormConfig = (key: string, value: any) => void;
interface ILinkOn {
  [key: string]: Set<IVFormComponent>;
}
export interface IVFormMethods extends Partial<IFormInstanceMethods> {
  set: ISet;
  get: IGet;
  getValue: IGetValue;
  setValue: ISetValue;
  hidden: IHidden;
  show: IShow;
  setProps: ISetProps;
  linkOn: ILinkOn;
  getData: IGetData;
  disable: IDisable;
}
