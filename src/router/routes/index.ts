import type { AppRouteRecordRaw, AppRouteModule } from '../types';
// 根路由
export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Design',
  meta: {
    title: '表单设计',
  },
  component: () => import('@/views/form-design/index.vue'),
  children: [
    {
      path: 'example1',
      name: 'Example1',
      meta: {
        title: '示例',
      },
      component: () => import('@/views/form-design/examples/baseForm.vue'),
    },
  ],
};
export const basicRoutes = [RootRoute];
