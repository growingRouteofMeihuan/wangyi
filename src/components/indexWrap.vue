<template>
  <div class="title_div">
    <!-- 两端对齐 -->
    <van-row type="flex" justify="space-between" style="padding: 0 0.2rem">
      <van-col span="5">
        <img class="logo" src="../assets/logo-img.png" />
      </van-col>
      <!-- 这个看起来像input框，实质上是一个按钮，点击会转跳 -->
      <van-col span="12" class="search_div" @click="searchBtnFn">
        <van-icon name="search" class="search_icon" size=".5rem" />
        <span>请输入用户名</span>
      </van-col>

      <van-col span="4">
        <van-button class="loginBtn" type="primary" size="mini"
          >登录</van-button
        >
      </van-col>
    </van-row>
    <!-- 横向导航栏 -->
    <van-tabs v-model="tabActive" swipeable class="tabBtnWrap">
      <van-tab v-for="item in titlelist" :title="item" :key="item"> </van-tab>
    </van-tabs>
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(img, inx) in swipeImgArr" :key="inx">
        <img :src="img" />
      </van-swipe-item>
    </van-swipe>

    <!-- 权益栏 -->
    <div class="indexServicePolicy">
      <ul>
        <li><van-icon name="shop-o" />网易自营品牌</li>
        <li><van-icon name="passed" />30天无忧退货</li>
        <li><van-icon name="refund-o" />48小时快速退款</li>
      </ul>
    </div>
    <!-- 商品展示 -->
    <div class="goodsColumn_wrap">
      <van-grid :column-num="5">
        <van-grid-item
          v-for="(item, inx) in goodsColumn_Arr"
          :key="inx"
          :icon="item.img_url"
          :text="item.img_txt"
        />
      </van-grid>
    </div>
    <!-- 倒计时 -->
    <div class="CountDownWrap">
      <p class="CountDownWrap_p">限时购</p>
      <van-count-down class="CountDownStyle" :time="time">
        <template #default="timeData">
          <span class="time_block">{{ timeData.hours }}</span>
          <span class="colon">:</span>
          <span class="time_block">{{ timeData.minutes }}</span>
          <span class="colon">:</span>
          <span class="time_block">{{ timeData.seconds }}</span>
        </template>
      </van-count-down>
      <a href="#" class="CountDownWrap_a">更多>></a>
    </div>

    <!-- 倒计时模块商品展示 -->
    <div class="GoodsList_wrap">
      <van-grid :column-num="3">
        <van-grid-item
          v-for="(item, inx) in goodsListObj"
          :key="inx"
          :icon="item.img_url"
          :text="item.img_txt"
        />
      </van-grid>
    </div>
    <!-- 底部导航栏 -->
    <footerBar></footerBar>
  </div>
</template>

<script>
import axios from "axios";
import footerBar from "./footerBar";
//导入重置的vant样式
import "../assets/resetVant.css";

export default {
  name: "indexWrap",
  components: { footerBar },
  data() {
    return {
      msg: "首页",
      tabActive: 0,
      // 导航条title
      titlelist: [],
      // 轮播图涂片,接口请求
      swipeImgArr: [],
      // 倒计时
      time: 30 * 60 * 60 * 1000,
      // 商品展示
      goodsColumn_Arr: [
        {
          img_url:
            "https://yanxuan.nosdn.127.net/896a3beac514ae8f40aafe028e5fec56.png",
          img_txt: "新品首发",
        },
        {
          img_url:
            "http://yanxuan.nosdn.127.net/c6fd8835a6400b7da7a016ad85506b69.png",
          img_txt: "居家生活",
        },
        {
          img_url:
            "https://yanxuan.nosdn.127.net/fede8b110c502ec5799702d5ec824792.png",
          img_txt: "服饰鞋包",
        },
        {
          img_url:
            "http://yanxuan.nosdn.127.net/37520d1204a0c55474021b43dac2a69e.png",
          img_txt: "美食酒水",
        },
        {
          img_url:
            "https://yanxuan.nosdn.127.net/6c3bd9d885c818b1f73e497335a68b47.png",
          img_txt: "个护清洁",
        },
        {
          img_url:
            "https://yanxuan.nosdn.127.net/559d2a240ec20b096590a902217009ff.png",
          img_txt: "母婴亲子",
        },
        {
          img_url:
            "https://yanxuan.nosdn.127.net/5c088559ebcc3f0ffcda663f04dfbeb2.png",
          img_txt: "运动旅行",
        },
        {
          img_url:
            "https://yanxuan.nosdn.127.net/fbca8e1f2948f0c09fc7672c2c125384.png",
          img_txt: "数码家电",
        },
        {
          img_url:
            "https://yanxuan.nosdn.127.net/f7281169d4e82d5d8d52aa1fec83fe01.png",
          img_txt: "全球特色",
        },
        {
          img_url:
            "http://yanxuan.nosdn.127.net/12e8efd15b9b210ab156a7ee9b340548.gif",
          img_txt: "好货抄底",
        },
      ],
      // 倒计时模块商品
      goodsListObj: [
        {
          img_url:
            "https://yanxuan-item.nosdn.127.net/e78096b543cc65af16da3a93cacb4071.png?quality=75&type=webp&imageView&thumbnail=216x216",
          img_txt: "￥219",
        },
        {
          img_url:
            "https://yanxuan-item.nosdn.127.net/570e762763536175b9ec226c0d93a7cd.png?quality=75&type=webp&imageView&thumbnail=216x216",
          img_txt: "￥167",
        },
        {
          img_url:
            "https://yanxuan-item.nosdn.127.net/f3f18a4fe9e7905cd7c9ff28e42ff0c2.png?quality=75&type=webp&imageView&thumbnail=216x216",
          img_txt: "￥50.2",
        },
        {
          img_url:
            "https://yanxuan-item.nosdn.127.net/0b05c22b99e8fc2cf3015e4bbb8d7c3f.png?quality=75&type=webp&imageView&thumbnail=216x216",
          img_txt: "￥139",
        },
        {
          img_url:
            "https://yanxuan-item.nosdn.127.net/ec55e5314bfd670320c3c15ce5e0b095.png?quality=75&type=webp&imageView&thumbnail=216x216",
          img_txt: "￥42.8",
        },
        {
          img_url:
            "https://yanxuan-item.nosdn.127.net/f815bf4d31ece0500089d69475c2014c.png?quality=75&type=webp&imageView&thumbnail=216x216",
          img_txt: "￥249",
        },
      ],
    };
  },
  created() {
    //请求横向导航栏数据
    axios.get("http://localhost:3344/get_tabBtn_list").then((_d) => {
      console.log(_d.data);
      this.titlelist = _d.data;
    });
    // 轮播图图片接口
    axios.get("http://localhost:3344/get_swipeImg_list").then((_d) => {
      console.log(_d.data);
      this.swipeImgArr = _d.data;
    });
  },
  methods: {
    searchBtnFn() {
      this.$router.push({ path: "/searchPage" });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title_div {
  padding: 0.23rem 0 0.23rem 0;
}
.logo {
  width: 1.84rem;
  height: 0.53rem;
  margin-top: 0.1rem;
}
.loginBtn {
  width: 0.98667rem;
  height: 0.53rem;
  font-size: 0.32rem;
  line-height: 0.53rem;
  text-align: center;
  color: #dd1a21;
  border: 1px solid #dd1a21;
  border-radius: 0.10667rem;
  background: #fff;
  margin: 0.1rem 0 0 0;
}
.search_div {
  font-size: 0.4rem;
  height: 0.75rem;
  background-color: #ededed;
  color: #666;
  border-radius: 0.11rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.search_icon {
  margin: 0 0.2rem 0 0;
}

.tabBtnWrap {
  font-size: 0.35rem;
  padding: 0 0.2rem;
}

.my-swipe .van-swipe-item {
  height: 2rem;
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}

.indexServicePolicy {
  width: 100%;
}
.indexServicePolicy ul {
  height: 0.96rem;
  padding: 0 0.4rem;
  display: flex;
  align-items: center;
}
.indexServicePolicy ul li {
  flex: 1;
  float: left;
  font-size: 0.32rem;
  color: #333;
  margin-left: 0.10667rem;
  line-height: 0.42667rem;
  display: inline-block;
  vertical-align: middle;
}
.indexServicePolicy ul li i {
  width: 0.42667rem;
  height: 0.42667rem;
  display: inline-block;
  vertical-align: middle;
  font-size: 0.32rem;
  color: #333;
  margin-left: 0.10667rem;
  line-height: 0.42667rem;
  display: inline-block;
  vertical-align: middle;
  background-size: 100% 100%;
}
.goodsColumn_wrap {
  /*font-size: 1rem;*/
}

/* 倒计时 */
.CountDownWrap {
  height: 1.33333rem;
  overflow: hidden;
  padding: 0 0.4rem;
  line-height: 1.33333rem;
  background: #fff;
}
.CountDownWrap_p {
  float: left;
  font-size: 0.42667rem;
}
.CountDownWrap_a {
  float: right;
  font-size: 0.37333rem;
  color: #333;
}

.colon {
  display: inline-block;
  margin: 0 4px;
  font-size: 0.5rem;
  color: #333;
}
.time_block {
  display: inline-block;
  width: 0.48rem;
  height: 0.48rem;
  color: #fff;
  font-size: 0.32rem;
  text-align: center;
  background-color: #333;
  border-radius: 0.05333rem;
  line-height: 0.48rem;
}

.CountDownStyle {
  float: left;
  margin: 32px 0 0 21px;
}

.GoodsList_wrap {
  margin-bottom: 1rem;
}
</style>
