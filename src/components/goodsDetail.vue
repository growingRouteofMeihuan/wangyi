<template>
  <div>
    <div>
      <van-nav-bar title="产品详情页面" @click-left="onClickLeft">
        <template #left>
          <van-icon name="wap-home-o" size="40" />
        </template>
        <template #right>
          <van-icon name="cart-o" size="40" />
        </template>
      </van-nav-bar>
    </div>
    <!-- 商品详情 -->
    <div class="goods_detail">
      <img :src="goodsimg" />
      <p>{{ goodsname }}</p>
      <p>{{ goodsprice }}</p>
    </div>
    <!-- 购买导航 -->
    <div class="goodsActionClass">
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" />
        <van-goods-action-icon icon="cart-o" text="购物车" />
        <van-goods-action-button
          type="warning"
          text="加入购物车"
          style="margin-left: 15px"
          @click="goodsdetail"
        />
        <van-goods-action-button type="danger" text="立即购买" />
      </van-goods-action>
    </div>
    <!-- sku组件 -->
    <div class="skuClass">
      <van-sku
        v-model="isSkuShow"
        :sku="sku"
        :goods="goods"
        :quota="0"
        :quota-used="0"
        :hide-stock="true"
        @add-cart="onAddCartClicked"
        @buy-clicked="buyNow"
      >
        <!-- 自定义 sku-header-price -->
        <template slot="sku-actions-top">
          <van-uploader v-model="fileList" :after-read="afterRead">
          </van-uploader>
          >
        </template>
      </van-sku>
    </div>
  </div>
</template>

<script>
export default {
  name: "goodsDetail",
  data() {
    return {
      msg: "商品购买页",
      goodsname: "",
      goodsprice: "",
      goodsimg: "",
      isSkuShow: false,
      fileList: [],
      uploder_imgArr: [],
      sku: {
        tree: [
          {
            k: "颜色", // skuKeyName：规格类目名称
            k_s: "s1", // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
            v: [
              {
                id: "11", // skuValueId：规格值 id
                name: "黄色", // skuValueName：规格值名称
                imgUrl: "https://b.yzcdn.cn/vant/sku/shoes-2.png", // 规格类目图片，只有第一个规格类目可以定义图片
                previewImgUrl: "https://b.yzcdn.cn/vant/sku/shoes-2.png", // 用于预览显示的规格类目图片
              },
              {
                id: "22",
                name: "蓝色",
                imgUrl: "https://b.yzcdn.cn/vant/sku/shoes-3.png",
                previewImgUrl: "https://b.yzcdn.cn/vant/sku/shoes-3.png",
              },
            ],
            largeImageMode: false, //  是否展示大图模式
          },
          {
            k: "尺码", // skuKeyName：规格类目名称
            k_s: "s2", // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
            v: [
              {
                id: "33", // skuValueId：规格值 id
                name: "S码", // skuValueName：规格值名称
                imgUrl: "", // 规格类目图片，只有第一个规格类目可以定义图片
                previewImgUrl: "", // 用于预览显示的规格类目图片
              },
              {
                id: "44",
                name: "M码",
                imgUrl: "",
                previewImgUrl: "",
              },
            ],
            largeImageMode: false, //  是否展示大图模式
          },
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          {
            // 商品组合规格
            id: 2257, // skuId
            s1: "22", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "44", // 规格类目 k_s 为 s2 的对应规格值 id
            price: 100, // 价格（单位分）
            stock_num: 100, // 当前 sku 组合对应的库存
          },
          {
            id: 2258, // skuId
            s1: "22", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "33", // 规格类目 k_s 为 s2 的对应规格值 id
            price: 100, // 价格（单位分）
            stock_num: 110, // 当前 sku 组合对应的库存
          },
          {
            id: 2259, // skuId
            s1: "11", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "33", // 规格类目 k_s 为 s2 的对应规格值 id
            price: 100, // 价格（单位分）
            stock_num: 110, // 当前 sku 组合对应的库存
          },
          {
            id: 2260, // skuId
            s1: "11", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "44", // 规格类目 k_s 为 s2 的对应规格值 id
            price: 100, // 价格（单位分）
            stock_num: 110, // 当前 sku 组合对应的库存
          },
        ],
        price: "1.00", // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
        hide_stock: true, // 是否隐藏剩余库存

        messages: [
          {
            // 商品留言
            datetime: "0", // 留言类型为 time 时，是否含日期。'1' 表示包含
            multiple: "0", // 留言类型为 text 时，是否多行文本。'1' 表示多行
            name: "留言1", // 留言名称
            type: "text", // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
            required: "0", // 是否必填 '1' 表示必填
            placeholder: "特殊要求请备注", // 可选值，占位文本
          },
          {
            // 商品留言
            datetime: "1", // 留言类型为 time 时，是否含日期。'1' 表示包含
            multiple: "0", // 留言类型为 text 时，是否多行文本。'1' 表示多行
            name: "时间", // 留言名称
            type: "date", // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
            required: "0", // 是否必填 '1' 表示必填
            placeholder: "", // 可选值，占位文本
          },
          {
            // 商品留言
            datetime: "0", // 留言类型为 time 时，是否含日期。'1' 表示包含
            multiple: "0", // 留言类型为 text 时，是否多行文本。'1' 表示多行
            name: "上传图片", // 留言名称
            type: "text", // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
            required: "0", // 是否必填 '1' 表示必填
            placeholder: "", // 可选值，占位文本
          },
        ],
      },
      goods: {
        // 默认商品 sku 缩略图
        picture: " ",
      },
    };
  },
  created() {
    // 接收参数
    let item = this.$route.params.goods;
    this.goodsname = item.name;
    this.goodsprice = item.price;
    this.goodsimg = item.img_url;
    // sku商品缩略图
    this.goods.picture = item.img_url;
    console.log(item);
  },
  methods: {
    goodsdetail() {
      this.isSkuShow = true;
    },
    // sku加入购物车
    onAddCartClicked(sku_data) {
      console.log(sku_data);
    },
    // sku立即购买
    buyNow(sku_data) {
      console.log(sku_data);
      console.log(this.uploder_imgArr);
    },
    //图片上传
    afterRead(_file) {
      this.uploder_imgArr.push(_file);
    },
    onClickLeft() {
      this.$router.push("/");
    },
  },
};
</script>
<style scoped>
.goods_detail {
  width: 10rem;
}
.goods_detail img {
  width: 90%;
}
.goods_detail p {
  font-size: 0.7rem;
}
</style>