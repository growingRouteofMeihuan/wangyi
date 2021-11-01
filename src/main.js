//引入移动端适配文件
import "./assets/rem"
import "./assets/reset.css"
import Vue from 'vue'
import App from './App'
import router from './router'

import {
  Button, Col, Row, Icon, Field, Tab, Tabbar, TabbarItem, GoodsAction, GoodsActionIcon,
  GoodsActionButton, Sku, Uploader, NavBar,
  Tabs, Swipe, SwipeItem, Grid, GridItem, CountDown, Sidebar, SidebarItem
} from 'vant';
Vue.use(Button).use(Col).use(Row).use(Icon).use(Swipe).use(SwipeItem)
  .use(Field).use(Tab).use(Tabs).use(Grid).use(GridItem).use(Uploader)
  .use(CountDown).use(Tabbar).use(TabbarItem).use(Sidebar).use(SidebarItem)
  .use(GoodsAction).use(GoodsActionIcon).use(GoodsActionButton).use(Sku).use(NavBar);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
