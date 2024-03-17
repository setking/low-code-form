<template>
  <div class="form-panel v-form-container">
    <el-empty v-show="formConfig.schemas.length === 0" class="empty-text" description="从左侧选择控件添加" />
    <el-form ref="form" :model="formConfig">
      <div class="draggable-box">
        <draggable
          v-model="formConfig.schemas"
          class="list-main element-row"
          group="form-draggable"
          :component="{ name: 'list', tag: 'div', type: 'transition-group' }"
          ghost-class="moving"
          :animation="180"
          handle=".drag-move"
          item-key="key"
          @add="addItem"
          @start="handleDragStart"
        >
          <template #item="{ element }">
            <LayoutItem
              class="drag-move"
              :schema="element"
              :data="formConfig"
              :current-item="formConfig.currentItem || {}"
            />
          </template>
        </draggable>
      </div>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import draggable from 'vuedraggable';
import LayoutItem from '../components/LayoutItem.vue';
import { useFormDesignState } from '../../../hook/useFormDesignState';

import { cloneDeep } from 'lodash-es';
const { formConfig } = useFormDesignState();
const emits = defineEmits(['handleSetSelectItem']);
const addItem = ({ newIndex }: any) => {
  formConfig.value.schemas = formConfig.value.schemas || [];
  const schemas = formConfig.value.schemas;
  schemas[newIndex] = cloneDeep(schemas[newIndex]);
  emits('handleSetSelectItem', schemas[newIndex]);
};
const handleDragStart = (e: any) => {
  emits('handleSetSelectItem', formConfig.value.schemas[e.oldIndex]);
};
</script>
<style lang="scss">
.v-form-container {
  // 内联布局样式
  .ant-form-inline {
    .list-main {
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      justify-content: flex-start;

      .layout-width {
        width: 100%;
      }
    }

    .ant-form-item-control-wrapper {
      min-width: 175px !important;
    }
  }
}

.form-panel {
  position: relative;
  height: 100%;

  .empty-text {
    position: absolute;
    z-index: 100;
    inset: -10% 0 0;
    height: 150px;
    margin: auto;
    color: #aaa;
  }

  .draggable-box {
    height: calc(100vh - 120px);
    // width: 100%;
    overflow: auto;

    .drag-move {
      min-height: 62px;
      cursor: move;
    }

    .list-main {
      // 列表动画
      .list-enter-active {
        transition: all 0.5s;
      }

      .list-leave-active {
        transition: all 0.3s;
      }

      .list-enter,
      .list-leave-to {
        transform: translateX(-100px);
        opacity: 0;
      }

      .list-enter {
        height: 30px;
      }
    }
  }
}
</style>
