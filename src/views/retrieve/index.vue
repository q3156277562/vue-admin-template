<template>
  <div class="retrievr">
    <el-table :data="retrieveList" border stripe>
      <el-table-column align="center" label="用户id">
        <template slot-scope="scope">
          <span>{{ scope.row.tid }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      retrieveList: [],
    };
  },
};
</script>

<style>
</style>