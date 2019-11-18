<template>
    <div>
      <el-button @click="addAll">批量增加</el-button>
      <el-table :data="tabledatas" border>
        <el-table-column label="title" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.title}}</span>
          </template>
        </el-table-column>
        <el-table-column label="text" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.text}}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="添加数据"
        @close="addDialogClose"
        :visible.sync="dialogTableVisible"
        :close-on-click-modal="false"
      >
        <!-- 添加用户的表单 -->
        <el-form ref="addData" :rules="rulesAddData" :model="addData" label-width="80px">
          <el-form-item prop="title" label="尺码">
            <el-input v-model="addData.size"></el-input>
          </el-form-item>
          <el-form-item prop="text" label="颜色">
            <el-input v-model="addData.color"></el-input>
          </el-form-item>
          <el-form-item prop="text" label="库存">
              <el-input v-model="addData.specStock"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="dialogTableVisible = false">取消</el-button>
            <el-button type="primary" @click="submit">确定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        tabledatas: [],
        dialogTableVisible: false, // 添加用户弹框
        // 添加数据
        addData: {
          title: "",
          text: ""
        },
        // 验证规则
        rulesAddData: {
          title: [{ required: true, message: "请输入标题", trigger: "blur" }],
          text: [{ required: true, message: "请输入内容", trigger: "blur" }]
        }
      };
    },

    methods: {
      // 关闭弹框的回调
      addDialogClose() {
        this.$refs.addData.resetFields(); // 清空表单
      },

      submit() {
        let _this = this;
        _this.$refs["addData"].validate(valid => {
          if (valid) {
            let data = _this.addData.title.split("-");
            let data0 = data[0];
            let tit = data0.replace(/[0-9]/gi, "");
            let num0 = data0.replace(/[^0-9]/gi, "");
            let num = data0.replace(/[^0-9]/gi, "");
            for (let i = 0; i < data[1] - num0 + 1; i++) {
              let aa = num++;
              let obj = {};
              obj.title = tit + aa;
              obj.text = _this.addData.text;
              _this.tabledatas.push(obj)
            }
            _this.$message({
              message: "添加成功",
              type: "success",
              duration: 1000
            });
            _this.dialogTableVisible = false;
          } else {
            return;
          }
        });
      },

      //批量新增
      addAll() {
        let _this = this;
        _this.dialogTableVisible = true;
      }
    }
  };
</script>
