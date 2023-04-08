<template>
  <div class="property">
    <div class="btn">
      <el-button type="primary" size="default" @click="add">资产入库</el-button>
    </div>
    <el-table :data="propertyList" border stripe>
      <el-table-column align="center" label="资产编号">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户id">
        <template slot-scope="scope">
          <span>{{ scope.row.userid }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="资产名称">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="资产种类">
        <template slot-scope="scope">
          <span>{{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="资产数量">
        <template slot-scope="scope">
          <span>{{ scope.row.features }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="资产概述">
        <template slot-scope="scope">
          <span>{{ scope.row.dec }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="资产照片">
        <template slot-scope="scope">
          <el-image :src="scope.row.pic" fit="fill" :lazy="true"></el-image>
          <!-- <span>{{ scope.row.pic }}</span> -->
        </template>
      </el-table-column>
      <el-table-column align="center" label="入库时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createtime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="修改时间">
        <template slot-scope="scope">
          <span>{{ scope.row.updatetime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="报废时间">
        <template slot-scope="scope">
          <span>{{ scope.row.scraptime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="del(scope.row)">资产报废</el-button>
          <el-button type="warning" size="mini" @click="edit(scope.row.id)">修改资产</el-button>
          <!-- <span>{{ scope.row.scraptime }}</span> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑弹窗 -->
    <div class="dialog">
      <el-dialog :visible.sync="isEdit" width="50%" @close="close">
        <PropertyEdit :type="editType" :id="id" @close="close" ref="form" />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { list, scrapped } from "@/api/assets.js";
import PropertyEdit from "./PropertyEdit.vue";
export default {
  data() {
    return {
      propertyList: [],
      isEdit: false,
      // 编辑类型：修改or添加
      editType: "",
      id: "",
    };
  },
  mounted() {
    this.list();
  },
  methods: {
    list() {
      list().then((res) => {
        this.propertyList = res.rows;
      });
    },
    // 资产入库
    add() {
      this.isEdit = true;
      this.editType = "添加";
    },
    // 修改资产
    edit(id) {
      this.isEdit = true;
      this.id = id;
      this.editType = "修改";
    },
    // 资产报废
    del(data) {
      scrapped(data).then((res) => {
        this.$message.success(res.msg);
        this.list();
      });
    },
    close() {
      this.isEdit = false;
      this.editType = "";
      this.id = "";
      this.$refs.form.clearData();
      this.list();
    },
  },
  components: {
    PropertyEdit,
  },
};
</script>

<style scoped>
.property {
  padding: 10px;
}
.btn {
  margin-block: 10px;
}
</style>