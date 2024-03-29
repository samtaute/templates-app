import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.css";
import store from './store/index.js'
import "bootstrap/dist/js/bootstrap.js";
import BaseSidebarWidget from './components/ui/BaseSidebarWidget'
import TemplateItem from './components/template/TemplateItem'
import TemplateItemConfig from './components/template/TemplateItemConfig'

const app = createApp(App); 


app
.component('BaseSidebarWidget', BaseSidebarWidget)
.component('TemplateItem', TemplateItem)
.component('TemplateItemConfig',TemplateItemConfig)

app.use(store);
app.mount('#app');

