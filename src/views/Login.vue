<template>
  <div id="a">
    <el-row>
      <el-col :span="24" class="a1">
        <div class="a2">
          <el-row>
            <el-col :span="24" class="a3">智慧宿管云平台</el-col>
          </el-row>
          <el-row class="a4">
            <el-col :span="24">
              <div>
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
                  <el-form-item prop="pass">
                    <el-input
                      type="text"
                      placeholder="用户"
                      prefix-icon="el-icon-user-solid"
                      v-model="ruleForm.pass"
                    ></el-input>
                  </el-form-item>
                  <el-form-item prop="checkPass">
                    <el-input
                      type="password"
                      placeholder="密码"
                      prefix-icon="el-icon-shopping-bag-2"
                      v-model="ruleForm.checkPass"
                    ></el-input>
                  </el-form-item>
                  <el-form-item prop="age">
                    <el-input
                      type="text"
                      prefix-icon="el-icon-circle-check"
                      placeholder="验证码"
                      v-model="ruleForm.age"
                      class="a5"
                    ></el-input>
                    <div class="login-code">
                      <img :src="imgUrl" alt @click="dian"/>
                    </div>
                  </el-form-item>
                  <el-form-item>
                    <el-checkbox v-model="checked">记住密码</el-checkbox>
                  </el-form-item>
                  <el-form-item>
                    <el-button
                      type="primary"
                      @click="submitForm('ruleForm')"
                      style="width:100%;height: 35.6px;  text-align: center;background-color: #1890ff;border-color: #1890ff;"
                    >登录</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-row class="a7">
      <el-col :span="24">
        <div>Copyright © 2019-2020 smartdormitory.cn All Rights Reserved.</div>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="scss">
.code {
  width: 124px;
  height: 31px;
  border: 1px solid rgba(186, 186, 186, 1);
}
.login-code {
  float: right;
}
.login-code img {
  float: right;
  width: 110px;
  height: 40px;
  cursor: pointer;
}
.a4 .el-input__inner {
  color: black;
}
.a4 .yzm {
  width: 110px;
  height: 38px;
  margin: 1.8px 0 0 0;
  float: right;
}
.a7 {
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
  padding: 0 0 0.5% 0;
}

.a4 .a5 {
  width: 65%;
}
.a4 .el-form-item {
  margin: 0 0 6% 0;
  height: 38px;
  line-height: 38px;
}
.a4 .el-form-item:nth-of-type(3) {
  margin: 0 0 2.5% 0;
}
.a4 .el-form-item:nth-of-type(4) {
  margin: 0 0 2.6% 0;
}
.a4 {
  margin: 7% 0 0 0;
}
#a {
  background: url(../assets/img/bj.jpg) no-repeat;
  background-size: cover;
}
.a1 {
  display: flex;
  height: 97vh;
}
.a2 {
  border-radius: 6px;
  background: #fff;
  width: 350px;
  padding: 25px 25px 5px 25px;
  height: 316px;
  margin: auto;
}
.a2 .a3 {
  font-size: 18.72px;
  text-align: center;
  color: #707070;
  font-weight: bold;
}
</style>
<script>
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("验证码不能为空"));
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("用户名不能为空"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else {
        callback();
      }
    };
    return {
      checked: true,
      imgUrl: "",
      uuid: "",
      ruleForm: {
        pass: "",
        checkPass: "",
        age: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }]
      }
    };
  },
  created() {
    this.dian();
  },
  methods: {
    //登录验证
    dian(){
      this.axios({
      method: "GET",
      url: "http://122.112.253.28:8095/prod-api/captchaImage"
    }).then(result => {
      this.imgUrl = "data:image/gif;base64," + result.data.data.img;
      this.uuid = result.data.data.uuid;
    });
    },
    submitForm(formName) {
      this.axios({
        method: "POST",
        url: "http://122.112.253.28:8095/prod-api/admin/login",
        data: {
          code: this.ruleForm.age,
          password: this.ruleForm.checkPass,
          username: this.ruleForm.pass,
          uuid: this.uuid
        }
      }).then(result => {
        if (result.data.code=="200") {
          sessionStorage.setItem("token",result.data.data.tokenHead+" "+result.data.data.token)
          this.$notify({
          title: '成功',
          message: '登录成功',
          type: 'success'
        });
          this.$router.push({path:"/shouye"})
        }
        else if(result.data.message=="用户名或密码错误"){
          this.$notify.error({
            title: "错误",
            message: "您的用户名或密码错误！"
          });
        }else if(this.ruleForm.age!=this.code){
          this.$notify.error({
            title: "错误",
            message: "您的验证码错误！"
          });
        }
      });
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          return false;
        }
      });
    }
  }
};
</script>