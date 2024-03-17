<template>
  <el-col v-bind="colPropsComputed">
    <template v-if="['Grid'].includes(schema.component)">
      <div
        class="grid-box"
        :class="{ active: schema.key === currentItem.key }"
        @click.stop="handleSetSelectItem(schema)"
      >
        <el-row class="grid-row" v-bind="schema.componentProps">
          <el-col v-for="(colItem, index) in schema.columns" :key="index" class="grid-col" :span="colItem.span">
            <draggable
              v-bind="{
                group: 'form-draggable',
                ghostClass: 'moving',
                animation: 180,
                handle: '.drag-move',
              }"
              v-model="colItem.children"
              class="list-main draggable-box"
              :component-data="{
                name: 'list',
                tag: 'div',
                type: 'transition-group',
              }"
              item-key="key"
              @start="$emit('dragStart', $event, colItem.children)"
              @add="$emit('handleColAdd', $event, colItem.children)"
            >
              <template #item="{ element }">
                <layoutItem
                  class="drag-move"
                  :schema="element"
                  :current-item="currentItem"
                  @handle-copy="$emit('handle-copy')"
                  @handle-delete="$emit('handle-delete')"
                />
              </template>
            </draggable>
          </el-col>
        </el-row>
        <FormNodeOperate :schema="schema" :currentItem="currentItem" />
      </div>
    </template>
    <FormNode
      v-else
      :key="schema.key"
      :schema="schema"
      :current-item="currentItem"
      @handle-copy="$emit('handle-copy')"
      @handle-delete="$emit('handle-delete')"
    />
  </el-col>
</template>
<script lang="ts" setup>
import draggable from 'vuedraggable';
import { computed, PropType } from 'vue';
import FormNodeOperate from './FormNodeOperate.vue';
import { IVFormComponent } from '@/views/form-design/typings/v-form-component';
import { useFormDesignState } from '@/views/form-design/hook/useFormDesignState';
import FormNode from './FormNode.vue';
const props = defineProps({
  schema: {
    type: Object as PropType<IVFormComponent>,
    required: true,
  },
  currentItem: {
    type: Object,
    required: true,
  },
});
defineEmits(['dragStart', 'handleColAdd', 'handle-copy', 'handle-delete']);
const {
  formDesignMethods: { handleSetSelectItem },
  formConfig,
} = useFormDesignState();
const colPropsComputed = computed(() => {
  const { colProps = {} } = props.schema;
  return colProps;
});
const list1 = computed(() => props.schema.colums);
const layoutTag = computed(() => {
  return formConfig.value.layout === 'horizontal' ? 'Col' : 'div';
});
</script>
