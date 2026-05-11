import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue"; // Nhập bộ biểu tượng

const app = createApp(App);

// Vòng lặp đăng ký toàn cục cho toàn bộ biểu tượng hệ thống
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(ElementPlus, { size: "small", zIndex: 3000 }); // Thiết lập kích thước mặc định cho toàn hệ thống
app.mount("#app");
