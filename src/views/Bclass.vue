<template>
  <div>
    <el-row :gutter="20" class="d1">
      <el-col :span="5">
        <div class="d2">
          <p>班级名称 &nbsp;</p>
          <el-input v-model="value1" placeholder="请输入班级名称" ></el-input>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="d2">
          <p>班主任 &nbsp;</p>
          <el-input v-model="value2" placeholder="请输入班主任名称" ></el-input>
        </div>
      </el-col>
      <el-col :span="5.5" class="d2">
        <p>状态 &nbsp;</p>
        <el-select v-model="value3" placeholder="班级状态">
          <el-option label="正常" value="正常"></el-option>
          <el-option label="停用" value="停用"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4" class="d3">
        <el-button type="primary" icon="el-icon-search" size="small" @click="ss">搜索</el-button>
        <el-button icon="el-icon-refresh" size="small" @click="cz">重置</el-button>
      </el-col>
    </el-row>
    <el-row class="d4">
      <el-col :span="24">
        <el-button type="primary" icon="el-icon-plus" size="small" @click="dialogVisible = true">新增</el-button>
        <el-button type="success" icon="el-icon-edit" size="small" disabled>修改</el-button>
        <el-button type="danger" icon="el-icon-delete" size="small" disabled>删除</el-button>
      </el-col>
    </el-row>
    <div class="d5">
      <el-table
        ref="multipleTable"
        class="d6"
        tooltip-effect="dark"
        :data="tableData"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="序号" width="120" prop="id"></el-table-column>
        <el-table-column prop="className" label="班级名称"></el-table-column>
        <el-table-column prop="classTeacherName" label="班主任"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="modifyTime" label="修改时间"></el-table-column>
        <el-table-column label="状态" prop="status">
          <el-switch v-model="value4" :click="zt"></el-switch>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="success"
              size="small"
              icon="el-icon-edit"
              circle
              @click="xiugai(scope.row.id)"
            ></el-button>
            <el-button
              type="danger"
              size="small"
              icon="el-icon-delete"
              circle
              @click="shanchu(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="添加班级信息" :visible.sync="dialogVisible" width="45%" :before-close="handleClose">
      <el-row :gutter="20">
        <el-col :span="10">
          <div class="d2">
            <p>
              <span style="color:#ff4949;">*</span>班级名称 &nbsp;
            </p>
            <el-input v-model="value5" placeholder="请输入班级名称"></el-input>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="d2">
            <p>
              <span style="color:#ff4949;">*</span>班主任 &nbsp;
            </p>
            <el-select v-model="value6" placeholder="请选择">
              <el-option
                :label="item.username"
                v-for="(item, index) in bzr"
                :key="index"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="tianjia">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改班级信息"
      :visible.sync="dialogVisible1"
      width="45%"
      :before-close="handleClose1"
    >
      <el-row :gutter="20">
        <el-col :span="10">
          <div class="d2">
            <p>
              <span style="color:#ff4949;">*&nbsp;</span>班级名称 &nbsp;
            </p>
            <el-input v-model="value7" disabled :placeholder="hh.className"></el-input>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="d2">
            <p>
              <span style="color:#ff4949;">*&nbsp;</span>班主任 &nbsp;
            </p>
            <el-select v-model="hh.classTeacherId">
              <el-option
                :label="item.username"
                v-for="(item, index) in bzr"
                :key="index"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="xiu">确 定</el-button>
      </span>
    </el-dialog>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="fy.pageNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="fy.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="fy.total"
      ></el-pagination>
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
      value4: true,
      tableData: [],
      multipleSelection: [],
      dialogVisible: false,
      value5: "",
      value6: "",
      value7: "",
      value8: "",
      value: "",
      id: "",
      bzr: [],
      hh: [],
      xgid: "",
      dialogVisible1: false,
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      fy: []
    };
  },
  created() {
    this.cxqb();
    this.axios({
      method: "GET",
      url: "http://122.112.253.28:8095/prod-api/sys/user/getClassTeacherList",
      headers: {
        Authorization: window.sessionStorage.token
      }
    }).then(result => {
      this.bzr = result.data.data;
    });
    this.axios({
      method: "GET",
      url:
        "http://122.112.253.28:8095/prod-api/basedata/bclass/list?pageNum=2&pageSize=10",
      headers: {
        Authorization: window.sessionStorage.token
      }
    }).then(result => {
      this.fy = result.data.data;
    });
  },

  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    xiugai(id) {
      this.dialogVisible1 = true;
      this.axios({
        method: "GET",
        url: "http://122.112.253.28:8095/prod-api/basedata/bclass/" + id,
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(result => {
        this.hh = result.data.data;
        this.xgid = id;
      });
    },
    xiu() {
      this.axios({
        method: "PUT",
        url:
          "http://122.112.253.28:8095/prod-api/basedata/bclass/update/" +
          this.xgid,
        data: {
          classTeacherId: this.hh.classTeacherId
        },
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(result => {
        if (result.data.code == "200") {
          this.$message({
            showClose: true,
            message: "修改成功",
            type: "success"
          });
          this.dialogVisible1 = false;
          this.cxqb();
          this.value7 = "";
          this.hh.classTeacherId = "";
        } else {
          this.$message({
            showClose: true,
            message: "修改失败",
            type: "error"
          });
        }
      });
    },
    tianjia() {
      this.axios({
        method: "POST",
        url: "http://122.112.253.28:8095/prod-api/basedata/bclass/create",
        data: {
          className: this.value5,
          classTeacherId: this.value6
        },
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(result => {
        if (result.data.code == "200") {
          this.$message({
            showClose: true,
            message: "添加成功",
            type: "success"
          });
          this.dialogVisible = false;
          this.cxqb();
          this.value5 = "";
          this.value6 = "";
        } else {
          this.$message({
            showClose: true,
            message: "添加失败",
            type: "error"
          });
        }
      });
    },
    ss() {
      this.axios({
        method: "GET",
        url:
          "http://122.112.253.28:8095/prod-api/basedata/bclass/list?pageNum=1&pageSize=10&className=" +
          this.value1 +
          "&classTeacherName=" +
          this.value2 +
          "&status",
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(result => {
        this.tableData = result.data.data.list;
      });
    },
    cxqb() {
      this.axios({
        method: "GET",
        url:
          "http://122.112.253.28:8095/prod-api/basedata/bclass/list?pageNum=1&pageSize=10",
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(result => {
        this.tableData = result.data.data.list;
      });
    },
    shanchu(id) {
      this.axios({
        method: "DELETE",
        url:
          "http://122.112.253.28:8095/prod-api/basedata/bclass/deleteByIds/" +
          id,
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(result => {
        this.$confirm("是否删除班级编号为" + id + "的数据项", "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            if (result.data.code == "200") {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.cxqb();
            } else {
              this.$message({
                type: "warning",
                message: "删除失败!"
              });
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      });
    },
    cz() {
      this.value1 = "";
      this.value2 = "";
      this.value = "";
      this.cxqb();
    },
    handleClose(done) {
      this.dialogVisible = false;
      this.value5 = "";
      this.value6 = "";
    },
    handleClose1(done) {
      this.dialogVisible1 = false;
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
    },
    zt() {
      this.value4 = false;
    }
  }
};
</script>

<style lang="scss">
.block {
  margin: 20px 0 0 600px;
}
.d6 .el-button--success {
  background: #13ce66;
}
.d6 .el-button--danger {
  background: #ff4949;
}
.d6 th {
  background: #f8f8f9;
}
.d6 .el-table th > .cell {
  color: #515a6e !important;
  font-size: 13px !important;
}
.d6 th,
.d6 td {
  text-align: center;
}
.d4 {
  background: #fff;
}
.d1 .el-col-5:nth-of-type(1) {
  margin: 0 0 0 25px;
}
.d1 {
  margin: 30px 0 0 0;
}
.d4,
.d5 {
  margin: 20px 25px 0 25px;
}
.d2 {
  display: flex;
  flex: 1;
  line-height: 32px;
}
.d2 p {
  color: #606266;
  font-weight: 700;
  font-size: 14px;
}
.d2 .el-input {
  width: 180px !important;
  height: 32px !important;
  line-height: 32px !important;
}
.d2 .el-input__inner {
  height: 32px;
}
</style>
