<template>
  <div class="title_div">
    <van-row type="flex" justify="space-between">
      <van-col span="20">
        <van-field
          @input="inputFn"
          class="search_div"
          v-model="value1"
          placeholder="好货内部价"
          @keyup.enter="submitFn"
        >
          <!-- 插槽用法：搜索框放大镜 Icon -->
          <template v-slot:left-icon>
            <van-icon name="search" class="searchIconLeft" />
          </template>

          <template #button>
            <van-icon
              name="close"
              class="searchIconLeft"
              v-show="isCloseShow"
              @click="clearSearchInputFn"
            />
          </template>
        </van-field>
      </van-col>

      <van-col span="3">
        <van-button class="cancelBtn" type="primary" size="mini"
          >取消</van-button
        >
      </van-col>
    </van-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "searchPage",
  data() {
    return {
      msg: "搜索页",
      value1: " ",
      isCloseShow: false,
    };
  },
  created() {},
  methods: {
    //监听输入的变化
    inputFn(_v) {
      //console.log(_v);
      this.value1 = _v;
      if (_v.length > 0) {
        this.isCloseShow = true;
      }
    },
    // 清空搜索框输入
    clearSearchInputFn() {
      this.value1 = "";
      this.isCloseShow = false;
    },
    //enter事件响应
    submitFn() {
      console.log(this.value1);
      axios
        .get("http://localhost:3344/search", {
          params: {
            searchKey: this.value1,
          },
        })
        .then((_d) => {
          console.log(_d.data);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title_div {
  padding: 0.2rem 0.4rem;
}

.cancelBtn {
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
.searchIconLeft {
  font-size: 0.5rem;
}
</style>
