<template>
  <div class="edit">
    <el-form ref="form" label-width="120px" :rules="rules" :model="form">
      <el-form-item label="用户id" prop="userid">
        <el-input v-model="form.userid" placeholder="" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="资产名称" prop="name">
        <el-input v-model="form.name" placeholder="" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="资产种类" prop="type">
        <el-input v-model="form.type" placeholder="" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="资产数量" prop="features">
        <el-input v-model="form.features" placeholder="" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="资产概述" prop="dec">
        <el-input v-model="form.dec" placeholder="" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="资产照片" prop="pic">
        <el-upload ref="upload" action="http://localhost:2221/assets/file/upload" :file-list="fileList" :on-success="handleAvatarSuccess" :multiple="false" list-type="picture" :auto-upload="true" :limit="1">
          <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
          <div slot="tip" class="el-upload__tip">jpg/png 文件大小 500kb</div>
        </el-upload>
        <!-- <el-input v-model="form.pic" placeholder="" size="mini" ></el-input> -->
      </el-form-item>
      <el-form-item label="提交">
        <el-button type="primary" size="default" v-if="isAdd" @click="assetsAdd">添加</el-button>
        <el-button type="primary" size="default" v-else @click="assetsEdit">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { assetsAdd, update, findOne } from "@/api/assets.js";
export default {
  props: ["type"],
  mounted() {
    // console.log(this.type);
  },
  data() {
    return {
      form: {
        userid: "",
        name: "",
        type: "",
        features: "",
        dec: "",
        pic: "",
      },
      fileList: [],
      rules: {
        userid: [
          { required: true, message: "请输入用户id", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 1 到 5 个字符", trigger: "blur" },
        ],
        name: [
          { required: true, message: "请输入资产名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        type: [
          { required: true, message: "请输入资产种类", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        features: [
          { required: true, message: "请输入资产名数量", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        dec: [
          { required: true, message: "请输入资产概述", trigger: "blur" },
          {
            min: 2,
            max: 50,
            message: "长度在 2 到 50 个字符",
            trigger: "blur",
          },
        ],
        pic: [{ required: true, message: "请传入图片", trigger: "blur" }],
      },
    };
  },
  methods: {
    // 资产入库
    assetsAdd() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          assetsAdd(this.form).then((res) => {
            this.$message.success(res.msg);
            this.$emit("close");
          });
        } else {
          return false;
        }
      });
    },
    // 修改资产
    assetsEdit() {
      let id = this.$attrs.id;
      this.form["id"] = id;
      update(this.form).then((res) => {
        this.$message.success(res.msg);
        this.$emit("close");
      });
    },
    handleAvatarSuccess(res, file) {
      this.form.pic = "http://localhost:2221/assets" + res.relativePath;
    },
    // 清除数据回显
    clearData() {
      this.$refs.form.resetFields();
      this.$refs.upload.clearFiles();
    },
    getData() {
      let id = this.$attrs.id;
      let data = {
        id,
      };
      findOne(data).then((res) => {
        this.form = res.rows;
        this.$set(this.fileList, 0, {
          url: res.rows.pic,
          name: this.fileName(res.rows.pic),
        });
        // this.fileList[0] =;
      });
    },
    fileName(urls) {
      let url = urls,
        filename;
      if (url.indexOf("/") > 0) {
        if (url.indexOf("?") > 0) {
          url = url.split("?")[0];
        }
        //如果包含有"/"号 从最后一个"/"号+1的位置开始截取字符串
        filename = url.substring(url.lastIndexOf("/") + 1, url.length);
      }
      return filename;
    },
  },
  computed: {
    // 当前操作是否为添加
    isAdd() {
      let type = this.type;
      if (type == "添加") {
        return true;
      } else {
        if (this.$attrs.id) {
          this.getData();
        }
        return false;
      }
    },
  },
};
</script>

<style>
</style>