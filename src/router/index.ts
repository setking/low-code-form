import type { RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';
import { basicRoutes } from './routes';
import { createRouter, createWebHashHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHashHistory(),
  routes: basicRoutes as unknown as RouteRecordRaw[],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});
export function setupRouter(app: App<Element>) {
  app.use(router);
}
