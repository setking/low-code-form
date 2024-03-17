<template>
  <div class="prefixCls">
    <draggable
      tag="ul"
      :model-value="list"
      v-bind="{
        group: { name: 'form-draggable', pull: 'clone', put: false },
        sort: false,
        clone: cloneItem,
        animation: 180,
        ghostClass: 'moving',
      }"
      item-key="type"
      @start="handleStart($event, list)"
      @add="handleAdd"
    >
      <template #item="{ element, index }">
        <li
          class="bs-box text-ellipis"
          @dragstart="$emit('add-attrs', list, index)"
          @click="$emit('handle-list-push', element)"
        >
          {{ element.label }}
        </li>
      </template>
    </draggable>
  </div>
</template>
<script lang="ts" setup>
import { PropType } from 'vue';
import draggable from 'vuedraggable';
import { IVFormComponent } from '@/views/form-design/typings/v-form-component';
const props = defineProps({
  list: {
    type: [Array] as PropType<IVFormComponent[]>,
    default: () => [],
  },
  handleListPush: {
    type: Function,
    default: null,
  },
});
const emits = defineEmits(['start', 'add-attrs', 'handle-list-push']);
const handleStart = (e: any, list1: IVFormComponent[]) => {
  emits('start', list1[e.oldIndex].component);
};
const handleAdd = (e: any) => {
  console.log('handleAdd', e);
};
const cloneItem = (one: any) => {
  return props.handleListPush(one);
};
</script>
<style lang="scss">
.prefixCls {
  ul {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 0;
    padding: 5px;
    list-style: none;
    // background: #efefef;

    li {
      width: calc(50% - 6px);
      height: 36px;
      margin: 2.7px;
      padding: 8px 12px;
      transition: all 0.3s;
      border: 1px solid red;
      border-radius: 3px;
      line-height: 36px;
      text-align: center;
      cursor: move;

      &:hover {
        position: relative;
        border: 1px solid red;
        // z-index: 1;
        box-shadow: 0 2px 6px red;
        color: red;
      }
    }
  }

  svg {
    display: inline !important;
  }
}
</style>
