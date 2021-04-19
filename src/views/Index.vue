<template>
  <div id="ShuSe">
    <el-row>
      <el-col :span="24" class="omO">
        <el-button>开闸</el-button>
      </el-col>
    </el-row>
    <el-row class="mDd">
      <el-col :span="6" :offset="2">
        <template>
          宿舍栋号 &nbsp;
          <el-select v-model="value" placeholder="请选择栋号">
            <el-option
              v-for="item in options"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </template>
      </el-col>
      <el-col :span="6" :offset="1">
        <template>
          楼层 &nbsp;
          <el-select v-model="value1" placeholder="请选择楼层">
            <el-option
              v-for="item in options2"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </template>
      </el-col>
      <el-col :span="7" :offset="1">
        <template>
          宿舍号 &nbsp;
          <el-input class="niq" v-model="input" placeholder="请输入内容"></el-input>
        </template>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10" :offset="7">
        <div class="block pad">
          <span class="demonstration">请选择日期 &nbsp;</span>
          <el-date-picker v-model="value2" align="right" type="date" placeholder="选择日期"></el-date-picker>
          <el-button type="primary" class="nio" @click="cx">查 询</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="c1">
      <el-col :span="4.5" v-for="(item, index) in list" :key="index">
        <div class="grid-content bg-purple">
          <p>
            <span>{{item.roomName}}</span>
            <span>宿舍总人数{{item.total}}</span>
          </p>
          <el-row class="c2">
            <el-col :span="12">
              <el-badge :value="item.normal" class="item" type="success">
                <el-button size="small">正常</el-button>
              </el-badge>
            </el-col>
            <el-col :span="12">
              <el-badge :value="item.leaveCount" class="item1">
                <el-button size="small">请假</el-button>
              </el-badge>
            </el-col>
          </el-row>
          <el-row class="c2">
            <el-col :span="12">
              <el-badge :value="item.comebacklate" class="item2" type="primary">
                <el-button size="small">晚归</el-button>
              </el-badge>
            </el-col>
            <el-col :span="12">
              <el-badge :value="item.absence" class="item3" type="warning">
                <el-button size="small">缺勤</el-button>
              </el-badge>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "ShuSe",
  data() {
    return {
      list: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      value3: "",
      input: "",
      options2: [],
      value1: "",
      options: [],
      value2: "",
      value: "",
      list: []
    };
  },
  methods: {
    cx() {
      this.axios({
        method: "GET",
        url:"http://122.112.253.28:8095/prod-api/smartdor/sdAttence/listAbsenceDormitory?checkDate="+this.value2+"&building="+this.value+"&storey="+this.value1+"&bdormitory="+this.input,
        headers:{
          Authorization:window.sessionStorage.token
        }
      }).then(result=>{
        this.list=result.data.data.list;
      });
    }
  },
  created() {
    this.axios({
      method: "GET",
      url:
        "http://122.112.253.28:8095/prod-api/sys/dict/detail/dictType/sys_storey",
      headers: {
        Authorization: window.sessionStorage.token
      }
    }).then(result => {
      this.options2 = result.data.data;
    });
    this.axios({
      method: "GET",
      url:
        "http://122.112.253.28:8095/prod-api/sys/dict/detail/dictType/sys_building",
      headers: {
        Authorization: window.sessionStorage.token
      }
    }).then(result => {
      this.options = result.data.data;
    });
    this.axios({
      method: "GET",
      url:
        "http://122.112.253.28:8095/prod-api/smartdor/sdAttence/listAbsenceDormitory?checkDate=&building=&storey=&bdormitory=",
      headers: {
        Authorization: window.sessionStorage.token
      }
    }).then(result => {
      this.list = result.data.data.list;
    });
  }
};
</script>
<style scoped>
.c2 {
  text-align: center;
}
.c2 .el-col-12 {
  margin: 20px 0 0 0;
}
.c1 {
  padding: 10px 0 0 56px;
}
.c1 .bg-purple {
  width: 224px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  height: 181.5px;
  margin: 14px 0 0 0;
  border-radius: 4px;
  border: 1px solid #e6ebf5;
}
.c1 .bg-purple p {
  height: 46.4px;
  line-height: 46.4px;
  border-bottom: 1px solid #e6ebf5;
}
.c1 .bg-purple p span:nth-of-type(1) {
  font-weight: 700;
  font-size: 16px;
  color: #606266;
  margin: 0 0 0 20px;
}
.c1 .bg-purple p span:nth-of-type(2) {
  font-weight: 700;
  font-size: 16px;
  color: #606266;
  margin: 0 0 0 20px;
}
.ImO {
  padding-left: 20px;
}
.Omka {
  margin: 20px 10px;
}
.ooq .el-badge {
  margin: 0 0 10px 30px;
}
.clearfix {
  display: flex;
}
.clearfix > span {
  flex: 1;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  color: #606266;
}
.nio {
  margin-left: 10px;
}
.pad {
  margin-top: 30px;
}
.mDd,
.demonstration {
  text-align: left;
  font-size: 14px;
  font-weight: bold;
  color: #606266;
}
.niq {
  width: 70%;
}
.omO {
  padding: 30px 30px 0 30px;
}
.omO .el-button {
  background: #ff0000;
  color: white;
  font-size: 12px;
}
</style>
