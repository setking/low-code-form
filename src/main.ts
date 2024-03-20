import { createApp } from 'vue';
import App from './App.vue';
import * as ElementPlusIconsVue from '@element-plus/icons'; //引入图标
import 'element-plus/dist/index.css'; //引入样式
import { setupRouter } from './router';
import './assets/styles/draggable-box.scss';
const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
setupRouter(app);
app.mount('#app');
