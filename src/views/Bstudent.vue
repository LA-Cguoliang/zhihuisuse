<template>
  <div class="e">
    <el-row :gutter="10" class="e2">
      <el-col :span="6" class="e1">
        <p>学员名称&nbsp;</p>
        <el-input v-model="value1" placeholder="请输入学员名称"></el-input>
      </el-col>
      <el-col :span="6" class="e1">
        <p>学号&nbsp;</p>
        <el-input v-model="value2" placeholder="请输入学号"></el-input>
      </el-col>
      <el-col :span="6" class="e1">
        <p>班级&nbsp;</p>
        <el-input v-model="value3" placeholder="请输入班级"></el-input>
      </el-col>
      <el-col :span="6" class="e1">
        <p>宿舍栋号&nbsp;</p>
        <el-select v-model="value4" placeholder="宿舍栋号">
          <el-option v-for="(item, index) in ds" :key="index" :label="item.dictLabel" :value="item.dictValue"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="e2">
      <el-col :span="6">
        <p>楼层&nbsp;</p>
        <el-select v-model="value5" placeholder="宿舍楼层">
          <el-option v-for="(item, index) in lc" :key="index"  :label="item.dictLabel" :value="item.dictValue"></el-option>
        </el-select>
      </el-col>
      <el-col :span="6" class="e1">
        <p>宿舍号&nbsp;</p>
        <el-input v-model="value6" placeholder="请输入宿舍号"></el-input>
      </el-col>
      <el-col :span="6">
        <p>状态&nbsp;</p>
        <el-select v-model="value7" placeholder="学员状态">
          <el-option v-for="(item, index) in zt" :key="index"  :label="item.dictLabel" :value="item.dictValue"></el-option>
        </el-select>
      </el-col>
      <el-col :span="6" class="e55">
        <el-button type="primary" icon="el-icon-search" size="small">搜索</el-button>
        <el-button icon="el-icon-refresh" size="small">
          <span style="color:#606266;font-size: 12px;font-weight: 500;">重置</span>
        </el-button>
      </el-col>
    </el-row>
    <el-row class="e3">
      <el-col :span="24">
        <el-button type="primary" icon="el-icon-plus" size="small">新增</el-button>
        <el-button type="success" icon="el-icon-edit" size="small" disabled>修改</el-button>
        <el-button type="danger" icon="el-icon-delete" size="small" disabled>删除</el-button>
      </el-col>
    </el-row>
    <div class="e4">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="30"></el-table-column>
        <el-table-column label="序号">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column prop="studentName" label="学员姓名"></el-table-column>
        <el-table-column prop="studentNo" label="学号"></el-table-column>
        <el-table-column prop="className" label="班级"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="parentName" label="家长姓名"></el-table-column>
        <el-table-column prop="parentPhone" label="家长电话"></el-table-column>
        <el-table-column label="宿舍栋号">
          <template slot-scope="scope">{{ scope.row.buildingNo }}栋</template>
        </el-table-column>
        <el-table-column label="楼层">
          <template slot-scope="scope">{{ scope.row.storey}}栋</template>
        </el-table-column>
        <el-table-column prop="dormitoryNo" label="宿舍号"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="status" label="状态">
          <el-switch v-model="value55"></el-switch>
        </el-table-column>
        <el-table-column prop label="操作" width="120">
          <template>
            <el-button type="success" size="small" icon="el-icon-edit" circle></el-button>
            <el-button type="danger" size="small" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      value5: "",
      value6: "",
      value7: "",
      value55: true,
      tableData: [
        
      ],
      multipleSelection: [],
      ds:[],
      lc:[],
      zt:[]
    };
  },
  created(){
      this.cxqb();
      this.axios({
          method:"GET",
          url:"http://122.112.253.28:8095/prod-api/sys/dict/detail/dictType/sys_building",
          headers:{
              Authorization:window.sessionStorage.token
          }
      }).then(result=>{
          this.ds=result.data.data
      })
      this.axios({
          method:"GET",
          url:"http://122.112.253.28:8095/prod-api/sys/dict/detail/dictType/sys_storey",
          headers:{
              Authorization:window.sessionStorage.token
          }
      }).then(result=>{
          this.lc=result.data.data
      })
      this.axios({
          method:"GET",
          url:"http://122.112.253.28:8095/prod-api/sys/dict/detail/dictType/sys_student_status",
          headers:{
              Authorization:window.sessionStorage.token
          }
      }).then(result=>{
          this.zt=result.data.data
      })
  },
  methods: {
    cxqb(){
        this.axios({
            method:"GET",
            url:"http://122.112.253.28:8095/prod-api/basedata/bstudent/list?pageNum=1&pageSize=10",
            headers:{
                Authorization:window.sessionStorage.token
            }
        }).then(result=>{
            this.tableData=result.data.data.list
        })
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>
<style lang="scss">
.e .e55 {
  margin: 0 0 0 6px;
}
.e .el-col-6 {
  display: flex;
  flex: 1;
  width: 320px;
}
.e .el-select .el-input .el-select__caret {
  line-height: 32px;
}
.e4 .el-button--success {
  background: #13ce66;
}
.e4 .el-button--danger {
  background: #ff4949;
}
.e4 {
  margin: 20px 25px 0 25px;
}
.e4 th {
  background: #f8f8f9;
}
.e4 .el-table th > .cell {
  color: #515a6e !important;
  font-size: 13px !important;
}
.e4 th,
.e4 td {
  text-align: center;
}
.e4 .el-table .cell {
  white-space: nowrap;
}
.e2 {
  margin: 30px 0 0 0;
  padding: 0 0 0 20px;
}
.e3 {
  margin: 20px 0 0 0;
  padding: 0 0 0 20px;
}
.e2 span,
.e2 p {
  font-size: 14px;
  color: #606266;
  font-weight: bold;
}
.e2 .el-button [class*="el-icon-"] + span {
  font-size: 12px;
  font-weight: 500;
  color: white;
}
.e2 p {
  width: 100px;
  text-align: right;
  line-height: 32px;
  margin: 0 3px 0 0;
}
.e2 .el-input__inner {
  width: 240px !important;
  height: 32px !important;
}
</style>