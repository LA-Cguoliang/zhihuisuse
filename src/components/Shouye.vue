<template>
  <div class="bb">
    <el-container>
      <el-menu
        default-active="1-4-1"
        class="el-menu-vertical-demo b"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        background-color="#304156"
        text-color="#fff"
      >
        <el-menu-item index="11" class="b1">
          <img src="../assets/img/t.png" alt style="width:32px;height:32px;margin-right:12px;" />
          <span slot="title">智慧宿舍云平台</span>
        </el-menu-item>
        <el-menu-item index="111">
          <i class="el-icon-setting"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu v-for="(item,index) in list" :key="index" :index="index+' '">
          <div slot="title">
            <i class="el-icon-delete"></i>
            <span slot="title">{{item.meta.title}}</span>
          </div>
          <el-menu-item
            v-for="(item2,index2) in item.children"
            :key="index2"
            :index="index+''+index2"
          >
            <i class="el-icon-setting"></i>
            <span slot="title" @click="go('/shouye/'+item2.path)">{{item2.meta.title}}</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
      <el-main>
        <el-row class="b12">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-radio-group v-model="isCollapse" class="dw">
                <el-radio-button :label="false" v-show="value">
                  <i class="el-icon-s-unfold"></i>
                </el-radio-button>
                <el-radio-button :label="true" v-show="!value">
                  <i class="el-icon-s-fold"></i>
                </el-radio-button>
              </el-radio-group>
              <span class="dw1">首页</span>
            </div>
          </el-col>
          <el-col :span="12" class="b13">
            <div class="grid-content bg-purple-light">
              <i class="el-icon-search"></i>
              <i class="el-icon-full-screen"></i>
              <i class="el-icon-s-data"></i>
              <img src="../assets/img/kn.jpg" alt />
            </div>
          </el-col>
        </el-row>
       <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>
<style>
.bb .el-submenu__title{
  width: 200px;
}
.dw1 {
  color: #97a8be;
  font-size: 14px;
}
.dw .el-icon-s-unfold:before,
.dw .el-icon-s-fold:before {
  font-size: 22px;
  color: #5a5e66;
}
.b13 {
  text-align: right;
}
.b13 img {
  width: 40px;
  height: 40px;
  vertical-align: middle;
  margin: -12px 30px 0 0;
}
.b13 .el-icon-search:before,
.b13 .el-icon-full-screen:before,
.b13 .el-icon-s-data:before {
  font-size: 22px;
  font-weight: bolder;
  color: #5a5e66;
  margin: 0 20px 0 0;
  cursor: pointer;
  line-height: 56px;
}
.b12 .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  background: #fff !important;
  color: black !important;
  border: none !important;
}
.b12 .el-radio-button__inner {
  border: none !important;
  color: black !important;
}
.b12 {
  height: 56px;
  width: 100%;
  box-shadow: 5px 0 10px rgba(128, 128, 128, 0.445);
  line-height: 56px;
}
.bb .el-main {
  padding: 0;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 100vh;
}
.bb .el-menu--collapse {
  min-height: 100vh;
}
.b .el-submenu .el-menu-item {
  background: #1f2d3d !important;
}
.b .el-submenu .el-menu-item:hover {
  background: #001528 !important;
}
.b1 {
  text-align: center;
  color: #fff;
  font-weight: 600;
  font-size: 14px;
  font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
  vertical-align: middle;
  background: #2b2f3a !important;
  height: 50px;
  line-height: 50px;
}
</style>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      list: [],
      icon: [],
      children: [],
      title: "",
      value: true,
      iconfont: "iconfont"
    };
  },
  created() {
    this.axios({
      method: "get",
      url: "http://122.112.253.28:8095/prod-api/sys/menu/getRouters",
      headers: {
        Authorization: window.sessionStorage.token
      }
    })
      .then(result => {
        this.list = result.data.data;
      })
      .catch(() => {});
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    go(path){
      this.$router.push(
        {
          path:path
        }
      )
    }
  }
};
</script>