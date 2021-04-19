<template>
  <div class="e">
    <el-row :gutter="10" class="e2">
      <el-col :span="6">
        <span>宿舍栋号&nbsp;</span>
        <el-select v-model="value1" placeholder="宿舍栋号">
          <el-option
            v-for="(item, index) in ds"
            :key="index"
            :label="item.dictLabel"
            :value="item.dictValue"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <span>楼层&nbsp;</span>
        <el-select v-model="value2" placeholder="宿舍楼层">
          <el-option
            v-for="(item, index) in lc"
            :key="index"
            :label="item.dictLabel"
            :value="item.dictValue"
          ></el-option>
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
        <el-button type="primary" icon="el-icon-search" size="small" @click="ss">搜索</el-button>
        <el-button icon="el-icon-refresh" size="small" @click="cz">重置</el-button>
      </el-col>
    </el-row>
    <el-row class="e3">
      <el-col :span="24">
        <el-button type="primary" icon="el-icon-plus" size="small" @click="dialogVisible = true">新增</el-button>
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
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="宿舍栋号">
          <template slot-scope="scope">{{ scope.row.buildingNo }}栋</template>
        </el-table-column>
        <el-table-column label="楼层">
          <template slot-scope="scope">{{ scope.row.storey}}楼</template>
        </el-table-column>
        <el-table-column prop="dormitoryNo" label="宿舍号"></el-table-column>
        <el-table-column prop="dormitoryTeacherName" label="宿管老师"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="200px"></el-table-column>
        <el-table-column prop="modifyTime" label="修改时间" width="200px"></el-table-column>
        <el-table-column prop="status" label="状态">
          <el-switch v-model="value5"></el-switch>
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
    <el-dialog
      title="添加宿舍信息"
      class="e22"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-row>
        <el-col :span="24">
          <span>宿舍栋号&nbsp;</span>
          <el-select v-model="value11" placeholder="宿舍栋号">
            <el-option
              v-for="(item, index) in ds"
              :key="index"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <span>楼层&nbsp;</span>
          <el-select v-model="value22" placeholder="宿舍楼层">
            <el-option
              v-for="(item, index) in lc"
              :key="index"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" class="e11">
          <p>宿舍号&nbsp;</p>
          <el-input v-model="value33" placeholder="请输入宿舍号"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <span>宿舍老师&nbsp;</span>
          <el-select v-model="value44" placeholder="请选择">
            <el-option
              v-for="(item, index) in sg"
              :key="index"
              :label="item.username"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="tianjia">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改宿舍信息"
      class="e22"
      :visible.sync="dialogVisible1"
      width="50%"
      :before-close="handleClose1"
    >
      <el-row>
        <el-col :span="24">
          <span>宿舍栋号&nbsp;</span>
          <el-select v-model="hh.buildingNo" disabled>
            <el-option
              v-for="(item, index) in ds"
              :key="index"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <span>楼层&nbsp;</span>
          <el-select v-model="hh.storey" disabled>
            <el-option
              v-for="(item, index) in lc"
              :key="index"
              :label="item.dictLabel"
              :value="item.dictValue"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" class="e11">
          <p>宿舍号&nbsp;</p>
          <el-input v-model="hh.dormitoryNo" disabled></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <span>宿舍老师&nbsp;</span>
          <el-select v-model="hh.dormitoryTeacherId">
            <el-option
              v-for="(item, index) in sg"
              :key="index"
              :label="item.username"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="qdxg">确 定</el-button>
      </span>
    </el-dialog>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
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
      value4: "",
      value5: true,
      tableData: [],
      multipleSelection: [],
      ds: [],
      lc: [],
      dialogVisible: false,
      dialogVisible1: false,
      value11: "",
      value22: "",
      value33: "",
      value44: "",
      sg: [],
      hh: [],
      xgid: "",
      pageIndex: 0,
      total: 0,
      totalPage: 0,
      currentPage4: 1
    };
  },
  created() {
    this.axios({
      method: "GET",
      url: "http://122.112.253.28:8095/prod-api/sys/user/getDorTeacherList",
      headers: {
        Authorization: window.sessionStorage.token
      }
    }).then(result => {
      this.sg = result.data.data;
    });
    this.cxqb();
    this.axios({
      method: "GET",
      url:
        "http://122.112.253.28:8095/prod-api/sys/dict/detail/dictType/sys_building",
      headers: {
        Authorization: window.sessionStorage.token
      }
    }).then(result => {
      this.ds = result.data.data;
    });
    this.axios({
      method: "GET",
      url:
        "http://122.112.253.28:8095/prod-api/sys/dict/detail/dictType/sys_storey",
      headers: {
        Authorization: window.sessionStorage.token
      }
    }).then(result => {
      this.lc = result.data.data;
    });
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      // var that = this;
      this.axios({
        method: "get",
        url: `http://122.112.253.28:8095/prod-api/basedata/bclass/list?pageNum=1&pageSize=${val}`,
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(relt => {
        this.tableData = relt.data.data.list;
      });
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      // this.pageIndex = val;
      this.axios({
        method: "get",
        url: `http://122.112.253.28:8095/prod-api/basedata/bclass/list?pageNum=${val}&pageSize=10`,
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(relt => {
        this.tableData = relt.data.data.list;
      });
    },
    xiugai(id) {
      this.dialogVisible1 = true;
      this.axios({
        method: "GET",
        url: "http://122.112.253.28:8095/prod-api/basedata/bdormitory/" + id,
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(result => {
        this.hh = result.data.data;
        this.xgid = id;
      });
    },
    qdxg() {
      this.dialogVisible1 = false;
      this.axios({
        method: "PUT",
        url:
          "http://122.112.253.28:8095/prod-api/basedata/bdormitory/update/" +
          this.xgid,
        data: {
          buildingNo: this.hh.buildingNo,
          storey: this.hh.storey,
          dormitoryNo: this.hh.dormitoryNo,
          dormitoryTeacherId: this.hh.dormitoryTeacherId
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
        url: "http://122.112.253.28:8095/prod-api/basedata/bdormitory/create",
        data: {
          buildingNo: this.value11,
          storey: this.value22,
          dormitoryNo: this.value33,
          dormitoryTeacherId: this.value44
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
          this.value11 = "";
          this.value22 = "";
          this.value33 = "";
          this.value44 = "";
        } else {
          this.$message({
            showClose: true,
            message: "添加失败",
            type: "error"
          });
          this.dialogVisible = false;
          this.value11 = "";
          this.value22 = "";
          this.value33 = "";
          this.value44 = "";
        }
      });
    },
    handleClose(done) {
      done();
    },
    handleClose1(done) {
      done();
    },
    cz() {
      this.value1 = "";
      this.value2 = "";
      this.value3 = "";
      this.value4 = "";
      this.cxqb();
    },
    ss() {
      this.axios({
        method: "GET",
        url:
          "http://122.112.253.28:8095/prod-api/basedata/bdormitory/list?pageNum=1&pageSize=10&buildingNo=" +
          this.value1 +
          "&storey=" +
          this.value2 +
          "&dormitoryNo=" +
          this.value3 +
          "&status=",
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
          "http://122.112.253.28:8095/prod-api/basedata/bdormitory/deleteByIds/" +
          id,
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(result => {
        this.$confirm("是否删除宿舍编号为" + id + "的数据项", "警告", {
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
    cxqb() {
      this.axios({
        method: "GET",
        url:
          "http://122.112.253.28:8095/prod-api/basedata/bdormitory/list?pageNum=1&pageSize=10",
        headers: {
          Authorization: window.sessionStorage.token
        }
      }).then(result => {
        this.tableData = result.data.data.list;
        this.total = result.data.data.total;
        this.totalPage = result.data.data.totalPage;
      });
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
.block{
  margin: 20px 0 20px 600px;
}
.e22 .el-row p,
.e22 .el-row span {
  font-size: 14px;
  color: #606266;
  font-weight: bold;
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
.e1,
.e11 {
  display: flex;
  flex: 1;
}
.e11 p {
  margin: 5px 0 0 0;
}
.e22 .el-row {
  margin: 0 0 20px 0;
}
.e2,
.e22 {
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
.e2 p,
.e22 p {
  width: 55px;
  line-height: 32px;
}
.e2 .el-input__inner {
  width: 240px !important;
  height: 32px !important;
}
</style>