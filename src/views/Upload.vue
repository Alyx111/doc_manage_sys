<template>
  <div class="uploadPage">
    <SideBar />
    <div class="form-box">
      <div class="top-comp">
        <span class="cursor"  @click="back"><i class="el-icon-back"></i> 返回 |</span>
        <span style="margin-left: 10px">文件列表</span>
      </div>

      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="文件上传">
          <el-upload
            class="upload-demo"
            action="/media/upload"
            :on-preview="handlePreview"
            :before-upload="handleBeforeUpload"
          >
            <el-button size="small">选择文件</el-button>
          </el-upload>
          <div v-if="uploadfile.name">
            {{ uploadfile.name }}
          </div>
        </el-form-item>
        <el-form-item label="资源名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="资源描述">
          <el-input v-model="form.des"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="handelHttpRequest" type="primary">上传</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";

export default {
  components: {
    SideBar,
  },
  data() {
    return {
      form: {
        name: "",
        des: "",
      },
      uploadfile: {},
    };
  },
  methods: {
    back(){
      this.$router.go(-1)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },

    handleBeforeUpload(file) {
      console.log(111, file);
      this.uploadfile = file;
      return false;
    },
    async handelHttpRequest() {
      const res = await this.$axios({
        url: "/media/upload",
        method: "post",
        data: {
          upFile: this.uploadfile,
          fileName: this.form.name,
          parentId: 0,
          fileDesc: this.form.des,
        },
        headers: {
          "content-type": "application/x-www-formurlencoded",
        },
      });
    },
  },
};
</script>
<style lang="scss">
.uploadPage {
  display: flex;
  .el-form {
    padding: 20px 50px;
  }
}
</style>
