<template>
  <div>
    <el-form label-position="top">
      <el-form-item label="表单布局">
        <el-radio-group v-model="formConfig.labelPosition">
          <el-radio-button value="left">左对齐</el-radio-button>
          <el-radio-button value="right" :disabled="formConfig.labelLayout === 'Grid'">右对齐</el-radio-button>
          <el-radio-button value="top" :disabled="formConfig.labelLayout === 'Grid'">顶部对齐</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="控件大小">
        <el-radio-group v-model="formConfig.size">
          <el-radio-button value="large">大</el-radio-button>
          <el-radio-button value="medium">默认</el-radio-button>
          <el-radio-button value="small">小</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="标签布局">
        <el-radio-group v-model="formConfig.labelLayout" @change="lableLayoutChange">
          <el-radio-button value="flex">固定</el-radio-button>
          <el-radio-button value="Grid" :disabled="formConfig.layout !== 'horizontal'">栅格</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="标签宽度（px）" v-show="formConfig.labelLayout === 'flex'">
        <el-input-number v-model="formConfig.labelWidth" controls-position="right" :min="1" :step="1"></el-input-number>
      </el-form-item>
      <!-- <div v-if="formConfig.labelLayout === 'Grid'">
        <el-form-item label="labelCol">
          <div class="slider-width">
            <el-slider v-model="sliderSpan" :max="24" />
          </div>
        </el-form-item>
        <el-form-item label="wrapperCol">
          <div class="slider-width">
            <el-slider v-model="sliderSpan" :max="24" />
          </div>
        </el-form-item>
        <el-form-item label="标签对齐">
          <el-radio-group v-model="formConfig.labelAlign">
            <el-radio-button value="left">靠左</el-radio-button>
            <el-radio-button value="right">靠右</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="控件大小">
          <el-radio-group v-model="formConfig.size">
            <el-radio-button value="medium">默认</el-radio-button>
            <el-radio-button value="small">小</el-radio-button>
            <el-radio-button value="mini">mini</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </div> -->

      <el-form-item label="表单属性">
        <el-col>
          <el-checkbox v-model="formConfig.disabled"> 禁用 </el-checkbox>
        </el-col>
        <el-col>
          <el-checkbox v-model="formConfig.hideRequiredMark"> 隐藏必选标记 </el-checkbox>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { useFormDesignState } from '@/views/form-design/hook/useFormDesignState';
import { computed } from 'vue';

const { formConfig } = useFormDesignState();
formConfig.value = formConfig.value || {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const lableLayoutChange = (value: any) => {
  if (value === 'Grid') {
    formConfig.value.layout = 'horizontal';
  }
};
const sliderSpan = computed(() => {
  if (formConfig.value.labelLayout) {
    return Number(formConfig.value.labelCol!.span);
  }
  return 0;
});
</script>
<style lang="scss">
.slider-width {
  width: 100%;
  padding-left: 30px;
  padding-right: 30px;
}
</style>
