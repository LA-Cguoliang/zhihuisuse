<template>
  <div class="e">
    <el-row :gutter="10" class="e2">
      <el-col :span="6">
        <span>宿舍栋号&nbsp;</span>
        <el-select v-model="value1" placeholder="宿舍栋号">
          <el-option label="一栋" value="shanghai"></el-option>
          <el-option label="二栋" value="beijing"></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <span>楼层&nbsp;</span>
        <el-select v-model="value2" placeholder="宿舍楼层">
          <el-option label="一楼" value="shanghai"></el-option>
          <el-option label="二楼" value="beijing"></el-option>
          <el-option label="三楼" value="beijing"></el-option>
          <el-option label="八楼" value="beijing"></el-option>
        </el-select>
      </el-col>
      <el-col :span="6" class="e1">
        <p>宿舍号&nbsp;</p>
        <el-input v-model="value3" placeholder="请输入宿舍号"></el-input>
      </el-col>
      <el-col :span="6">
        <span>状态&nbsp;</span>
        <el-select v-model="value4" placeholder="宿舍状态">
          <el-option label="正常" value="shanghai"></el-option>
          <el-option label="停用" value="beijing"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row class="e3">
      <el-col :span="24">
        <el-button type="primary" icon="el-icon-search" size="small">搜索</el-button>
        <el-button icon="el-icon-refresh" size="small">重置</el-button>
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
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="序号">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="" label="宿舍栋号"></el-table-column>
        <el-table-column prop="" label="楼层"></el-table-column>
        <el-table-column prop="" label="宿舍号"></el-table-column>
        <el-table-column prop="" label="宿管老师"></el-table-column>
        <el-table-column prop="" label="创建时间"></el-table-column>
        <el-table-column prop="" label="修改时间"></el-table-column>
        <el-table-column prop="" label="状态">
            <el-switch v-model="value5"></el-switch>
        </el-table-column>
        <el-table-column prop="" label="操作">
            <template>
            <el-button
              type="success"
              size="small"
              icon="el-icon-edit"
              circle
            ></el-button>
            <el-button
              type="danger"
              size="small"
              icon="el-icon-delete"
              circle
            ></el-button>
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
      value5:true,
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      multipleSelection: []
    };
  },
  methods: {
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
.e1 {
  display: flex;
  flex: 1;
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
.e2 p {
  width: 55px;
  line-height: 32px;
}
.e2 .el-input__inner {
  width: 240px !important;
  height: 32px !important;
}
</style>