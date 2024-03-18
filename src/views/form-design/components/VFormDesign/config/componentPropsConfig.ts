import { IBaseFormAttrs } from './formItemPropsConfig';
import { ElInput, ElRadioGroup, ElSelect } from 'element-plus';

interface IBaseComponentProps {
  [key: string]: IBaseFormAttrs[];
}

type BaseFormAttrs = Omit<IBaseFormAttrs, 'tag'>;

export const baseComponentControlAttrs: Omit<IBaseFormAttrs, 'tag'>[] = [
  {
    // 没有disabled属性的控件不能作为form控件
    name: 'disabled',
    label: '禁用',
  },
  {
    // 没有disabled属性的控件不能作为form控件
    name: 'autofocus',
    label: '自动获取焦点',
    includes: [
      'ElInput',
      'ElSelect',
      'ElInputTextArea',
      'ElInputNumber',
      'ElDatePicker',
      'ElRangePicker',
      'ElMonthPicker',
      'ElTimePicker',
      'ElCascader',
      'ElTreeSelect',
      'ElSwitch',
      'ElAutoComplete',
      'ElSlider',
    ],
  },
  {
    name: 'allowClear',
    label: '可清除',
    includes: [
      'ElInput',
      'ElSelect',
      'ElInputTextArea',
      'ElInputNumber',
      'ElDatePicker',
      'ElRangePicker',
      'ElMonthPicker',
      'ElTimePicker',
      'ElCascader',
      'ElTreeSelect',
      'ElAutoComplete',
    ],
  },
  { name: 'fullscreen', label: '全屏', includes: ['ElCalendar'] },
  {
    name: 'showSearch',
    label: '可搜索',
    includes: ['ElSelect', 'ElTreeSelect', 'ElCascader', 'ElTransfer'],
  },
  {
    name: 'showTime',
    label: '显示时间',
    includes: ['ElDatePicker', 'ElRangePicker', 'ElMonthPicker'],
  },
  {
    name: 'range',
    label: '双向滑动',
    includes: [],
  },
  {
    name: 'allowHalf',
    label: '允许半选',
    includes: ['ElRate'],
  },
  {
    name: 'multiple',
    label: '多选',
    includes: ['ElSelect', 'ElTreeSelect', 'ElUpload'],
  },
  {
    name: 'directory',
    label: '文件夹',
    includes: ['ElUpload'],
  },
  {
    name: 'withCredentials',
    label: '携带cookie',
    includes: ['ElUpload'],
  },
  {
    name: 'bordered',
    label: '是否有边框',
    includes: ['ElSelect', 'ElInput'],
  },
  {
    name: 'defaultActiveFirstOption',
    label: '高亮第一个选项',
    component: 'ElCheckbox',
    includes: ['ElSelect', 'ElAutoComplete'],
  },
  {
    name: 'dropdownMatchSelectWidth',
    label: '下拉菜单和选择器同宽',
    component: 'ElCheckbox',
    includes: ['ElSelect', 'ElTreeSelect', 'ElAutoComplete'],
  },
];

//共用属性
export const baseComponentCommonAttrs: Omit<IBaseFormAttrs, 'tag'>[] = [
  {
    name: 'size',
    label: '尺寸',
    component: ElRadioGroup,
    componentProps: {
      options: [
        {
          label: '默认',
          value: 'default',
        },
        {
          label: '大',
          value: 'large',
        },
        {
          label: '小',
          value: 'small',
        },
      ],
    },
    includes: ['ElInputNumber', 'ElInput', 'ElCascader', 'ElButton'],
  },
  {
    name: 'placeholder',
    label: '占位符',
    component: ElInput,
    componentProps: {
      placeholder: '请输入占位符',
    },
    includes: [
      'ElAutoComplete',
      'ElInputTextArea',
      'ElInputNumber',
      'ElInput',
      'ElInputTextArea',
      'ElSelect',
      'ElDatePicker',
      'ElMonthPicker',
      'ElTimePicker',
      'ElTreeSelect',
      'ElCascader',
    ],
  },
  {
    name: 'style',
    label: '样式',
    component: ElInput,
    componentProps: {
      placeholder: '请输入样式',
    },
  },
  {
    name: 'open',
    label: '一直展开下拉菜单',
    component: 'RadioGroup',
    componentProps: {
      options: [
        {
          label: '默认',
          value: undefined,
        },
        {
          label: '是',
          value: true,
        },
        {
          label: '否',
          value: false,
        },
      ],
    },
    includes: ['ElSelect', 'ElAutoComplete'],
  },
];

const componentAttrs: IBaseComponentProps = {
  // https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#%3Cinput%3E_types
  ElInput: [
    {
      name: 'type',
      label: '类型',
      component: ElSelect,
      componentProps: {
        options: [
          { value: 'text', label: '文本' },
          { value: 'search', label: '搜索' },
          { value: 'number', label: '数字' },
          { value: 'range', label: '数字范围' },
          { value: 'password', label: '密码' },
          { value: 'date', label: '日期' },
          { value: 'datetime-local', label: '日期-无时区' },
          { value: 'time', label: '时间' },
          { value: 'month', label: '年月' },
          { value: 'week', label: '星期' },
          { value: 'email', label: '邮箱' },
          { value: 'url', label: 'URL' },
          { value: 'tel', label: '电话号码' },
          { value: 'file', label: '文件' },
          { value: 'button', label: '按钮' },
          { value: 'submit', label: '提交按钮' },
          { value: 'reset', label: '重置按钮' },
          { value: 'radio', label: '单选按钮' },
          { value: 'checkbox', label: '复选框' },
          { value: 'color', label: '颜色' },
          { value: 'image', label: '图像' },
          { value: 'hidden', label: '隐藏' },
        ],
      },
    },
    {
      name: 'defaultValue',
      label: '默认值',
      component: ElInput,
      componentProps: {
        type: 'text',
        placeholder: '请输入默认值',
      },
    },
    {
      name: 'prefix',
      label: '前缀',
      component: ElInput,
      componentProps: {
        type: 'text',
        placeholder: '请输入前缀',
      },
    },
    {
      name: 'suffix',
      label: '后缀',
      component: ElInput,
      componentProps: {
        type: 'text',
        placeholder: '请输入后缀',
      },
    },
    {
      name: 'maxLength',
      label: '最大长度',
      component: ElInput,
      componentProps: {
        type: 'text',
        placeholder: '请输入最大长度',
      },
    },
  ],
  ElSelect: [
    {
      name: 'mode',
      label: '选择模式（默认单选）',
      component: 'RadioGroup',
      componentProps: {
        options: [
          { label: '单选', value: null },
          { label: '多选', value: 'multiple' },
          { label: '标签', value: 'tags' },
          // { label: '组合', value: 'combobox' },
        ],
      },
    },
    {
      name: 'autoClearSearchValue',
      label: '是否在选中项后清空搜索框',
      component: 'ElCheckbox',
    },
    {
      name: 'labelInValue',
      label: '选项的label包装到value中',
      component: 'ElCheckbox',
    },
    {
      name: 'showArrow',
      label: '显示下拉小箭头',
      component: 'ElCheckbox',
    },
    {
      name: 'defaultOpen',
      label: '默认展开下拉菜单',
      component: 'ElCheckbox',
    },
  ],
  ElCheckbox: [
    {
      name: 'indeterminate',
      label: '设置indeterminate状态',
      component: 'ElCheckbox',
    },
  ],
  ElCheckboxGroup: [],
  ElRadioGroup: [
    {
      name: 'defaultValue',
      label: '默认值',
      component: ElInput,
      componentProps: {
        placeholder: '请输入默认值',
      },
    },
    {
      name: 'buttonStyle',
      label: 'RadioButton的风格样式',
      component: 'RadioGroup',
      componentProps: {
        options: [
          {
            label: 'outline',
            value: 'outline',
          },
          {
            label: 'solid',
            value: 'solid',
          },
        ],
      },
    },
    {
      name: 'optionType',
      label: 'options类型',
      component: 'RadioGroup',
      componentProps: {
        options: [
          {
            label: '默认',
            value: 'default',
          },
          {
            label: '按钮',
            value: 'button',
          },
        ],
        //根据其它选项的值更新自身控件配置值
        //compProp当前组件的属性，
        //configProps，当且组件的所有配置选项
        //self,当前配置的componentProps属性
        //返回真值进行更新
        // _propsFunc: (compProp, configProps, self) => {
        //   console.log("i'm called");
        //   console.log(compProp, configProps, self);
        //   if (compProp['buttonStyle'] && compProp['buttonStyle'] == 'outline') {
        //     if (!self['disabled']) {
        //       self['disabled'] = true;
        //       return 1;
        //     }
        //   } else {
        //     if (self['disabled']) {
        //       self['disabled'] = false;
        //       return 1;
        //     }
        //   }

        //   // return prop.optionType == 'button';
        // },
      },
    },
    {
      name: 'size',
      label: '尺寸',
      component: 'ElRadioGroup',
      componentProps: {
        options: [
          {
            label: '默认',
            value: 'default',
          },
          {
            label: '大',
            value: 'large',
          },
          {
            label: '小',
            value: 'small',
          },
        ],
      },
    },
  ],
  ElDatePicker: [
    {
      name: 'format',
      label: '展示格式（format）',
      component: 'Input',
      componentProps: {
        placeholder: 'YYYY-MM-DD',
      },
    },
    {
      name: 'valueFormat',
      label: '绑定值格式（valueFormat）',
      component: 'Input',
      componentProps: {
        placeholder: 'YYYY-MM-DD',
      },
    },
  ],
  ElSwitch: [
    {
      name: 'checkedChildren',
      label: '选中时的内容',
      component: 'Input',
      componentProps: {
        placeholder: '请输入选中时的内容',
      },
    },
    {
      name: 'checkedValue',
      label: '选中时的值',
      component: 'Input',
      componentProps: {
        placeholder: '请输入选中时的值',
      },
    },
    {
      name: 'unCheckedChildren',
      label: '非选中时的内容',
      component: 'Input',
      componentProps: {
        placeholder: '请输入非选中时的内容',
      },
    },
    {
      name: 'unCheckedValue',
      label: '非选中时的值',
      component: 'Input',
      componentProps: {
        placeholder: '请输入非选中时的值',
      },
    },
    {
      name: 'loading',
      label: '加载中的开关',
      component: 'Checkbox',
    },
    {
      name: 'size',
      label: '尺寸',
      component: 'RadioGroup',
      componentProps: {
        options: [
          {
            label: '默认',
            value: 'default',
          },
          {
            label: '小',
            value: 'small',
          },
        ],
      },
    },
  ],
  ElButton: [
    {
      name: 'type',
      label: '类型',
      component: 'RadioGroup',
      componentProps: {
        options: [
          {
            label: 'default',
            value: 'default',
          },
          {
            label: 'primary',
            value: 'primary',
          },
          {
            label: 'danger',
            value: 'danger',
          },
          {
            label: 'dashed',
            value: 'dashed',
          },
        ],
      },
    },
    {
      name: 'handle',
      label: '操作',
      component: 'RadioGroup',
      componentProps: {
        options: [
          {
            label: '提交',
            value: 'submit',
          },
          {
            label: '重置',
            value: 'reset',
          },
        ],
      },
    },
  ],
};

function deleteProps(list: Omit<IBaseFormAttrs, 'tag'>[], key: string) {
  list.forEach((element, index) => {
    if (element.name == key) {
      list.splice(index, 1);
    }
  });
}

componentAttrs['StrengthMeter'] = componentAttrs['ElInput'];
componentAttrs['StrengthMeter'].push({
  name: 'visibilityToggle',
  label: '是否显示切换按钮',
  component: 'ElCheckbox',
});

deleteProps(componentAttrs['StrengthMeter'], 'type');
deleteProps(componentAttrs['StrengthMeter'], 'prefix');
deleteProps(componentAttrs['StrengthMeter'], 'defaultValue');
deleteProps(componentAttrs['StrengthMeter'], 'suffix');
//组件属性
// name 控件的属性
export const baseComponentAttrs: IBaseComponentProps = componentAttrs;

//在所有的选项中查找需要配置项
const findCompoentProps = (props: BaseFormAttrs[], name: string) => {
  const idx = props.findIndex((value: BaseFormAttrs) => {
    return value.name === name;
  });
  if (props[idx] && props[idx].componentProps) {
    return props[idx].componentProps;
  }
};

// 根据其它选项的值更新自身控件配置值
export const componentPropsFuncs = {
  RadioGroup: (compProp, options: BaseFormAttrs[]) => {
    const props = findCompoentProps(options, 'size');
    if (props) {
      if (compProp['optionType'] && compProp['optionType'] != 'button') {
        props['disabled'] = true;
        compProp['size'] = null;
      } else {
        props['disabled'] = false;
      }
    }
  },
};
