import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.css";
import store from './store/index.js'
import "bootstrap/dist/js/bootstrap.js";
import BaseSidebarWidget from './components/ui/BaseSidebarWidget'
import TemplateBlock from './components/template/TemplateBlock'

const app = createApp(App); 


app
.component('BaseSidebarWidget', BaseSidebarWidget)
.component('TemplateBlock', TemplateBlock)

app.use(store);
app.mount('#app');

