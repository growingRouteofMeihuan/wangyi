<template>
  <div style="position: relative; padding-left: 2.16rem">
    <!-- 侧边栏 -->
    <div class="siderbarClass">
      <van-sidebar v-model="siderBarKey" @change="siderbarChange">
        <van-sidebar-item
          v-for="(item, inx) in sidebar_arr"
          :key="inx"
          :title="item.txt"
        />
      </van-sidebar>
    </div>
    <!-- 商品展示 -->
    <div class="sidebarGoods">
      <div
        class="goodsItem"
        v-for="(n, inx) in goodsItem"
        :key="inx"
        @click="gotoGoodsBuy(n)"
      >
        <img :src="n.img_url" />
        <p>{{ n.name }}</p>
        <b> {{ n.price }} </b>
      </div>
    </div>
    <footerBar> </footerBar>
  </div>
</template>

<script>
import axios from "axios";
import footerBar from "./footerBar";
export default {
  name: "cateList",
  components: { footerBar },
  data() {
    return {
      msg: "分类页面",
      siderBarKey: 0,
      sidebar_arr: [
        {
          txt: "推荐专区",
        },
        {
          txt: "爆品专区",
        },
        {
          txt: "新品专区",
        },
      ],
      goodsItem: [],
    };
  },
  created() {
    //开始默认请求第一栏
    axios.get("http://localhost:3344/goodsList_0").then((_d) => {
      this.goodsItem = _d.data;
    });
  },
  methods: {
    gotoGoodsBuy(item) {
      // 路由传参
      this.$router.push({ name: "goodsDetail", params: { goods: item } });
    },
    siderbarChange(inx) {
      axios.get("http://localhost:3344/goodsList_" + inx).then((_d) => {
        this.goodsItem = _d.data;
      });
    },
  },
};
</script>

<style scoped>
.siderbarClass {
  position: fixed;
  left: 0;
  top: 0;
}

.goodsItem {
  float: left;
  width: 44%;
  margin: 0rem 0.2rem 0.44rem 0.2rem;
  font-size: 0.37333rem;
  overflow: hidden;
}

.goodsItem img {
  height: 4.6rem;
}
</style>
