<template>
  <div class="home">
    <SideBar />
    <div class="home_right">
      <div class="top-comp">
        <span class="cursor" @click="back"
          ><i class="el-icon-back"></i> 返回 |</span
        >

        <span style="margin-left: 10px">文件列表</span>
      </div>
      <div class="mid">
        <div class="left-box">
          <router-link to="/upload">
            <el-button class="green">文件上传</el-button>
          </router-link>
          <el-button plain @click="createFolder">新建文件夹</el-button>
        </div>
        <div class="right-box">
          <el-input v-model="keyword" placeholder="请输入文件名" />
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="searchFile"
            size="mini"
            style="height: 40px; margin-left: 10px"
            >搜索</el-button
          >
        </div>
      </div>
      <div class="bottom">
        <div class="table-container">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item
              @click.native="getData(item.dirId)"
              v-for="(item, index) in breadcrumbList"
              :key="index"
              class="cursor"
              >{{ item.dirName }}</el-breadcrumb-item
            >
          </el-breadcrumb>
          <el-table :data="fileList" border>
            <el-table-column fixed prop="fileId" label="序号" width="80">
            </el-table-column>
            <el-table-column prop="fileName" label="名称" width="120">
              <template slot-scope="scope">
                <div>
                  <i
                    class="el-icon-folder cursor"
                    v-if="scope.row.fileType == 1"
                    @click="comein(scope.row)"
                  ></i>
                  <span style="margin-left: 10px">{{
                    scope.row.fileName
                  }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="fileDesc" label="描述" width="120">
            </el-table-column>
            <el-table-column prop="downloadCount" label="下载次数" width="120">
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="300">
            </el-table-column>
            <el-table-column prop="modifiedTime" label="修改时间" width="120">
              <template slot-scope="scope">
                {{ scope.row.modifiedTime || "--" }}
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="220">
              <template slot-scope="scope">
                <div>
                  <el-button
                    icon="el-icon-download"
                    @click="downloadFile(scope.row)"
                    v-if="scope.row.fileType == 0"
                  ></el-button>
                  <el-dropdown>
                    <el-button icon="el-icon-more"></el-button>
                    <el-dropdown-menu slot="dropdown" style="width: 200px">
                      <el-dropdown-item
                        @click.native="delFile(scope.row, scope)"
                        >删除</el-dropdown-item
                      >
                      <el-dropdown-item @click.native="renameFile(scope.row)"
                        >重命名</el-dropdown-item
                      >
                      <el-dropdown-item @click.native="moveFile(scope.row)"
                        >移动到</el-dropdown-item
                      >
                      <el-dropdown-item @click.native="checkDownload(scope.row)"
                        >查看下载链接</el-dropdown-item
                      >
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <el-dialog title="修改文件名" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="文件名">
          <el-input v-model="form.fileName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitRename">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="移动到" :visible.sync="dialogForm2Visible">
      <div class="dir-tree">
        <el-tree :data="dirTreeData" @node-click="handleNodeClick"></el-tree>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogForm2Visible = false">取 消</el-button>
        <el-button type="primary" @click="handleMoveFile">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="新建文件夹" :visible.sync="dialogForm3Visible">
      <el-form :model="form3">
        <el-form-item label="文件名">
          <el-input v-model="form3.fileName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogForm3Visible = false">取 消</el-button>
        <el-button type="primary" @click="handleCreateFolder">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import SideBar from "@/components/SideBar.vue";

export default {
  components: {
    SideBar,
  },
  data() {
    return {
      dialogFormVisible: false,
      dialogForm2Visible: false,
      dialogForm3Visible: false,
      breadcrumbList: [],
      parentId: 0,
      fileList: [],
      dirTreeData: [],
      form: {
        fileName: "",
        fileId: "",
      },
      form2: {
        fileName: "",
        fileId: "",
      },
      newDirid: "",
      form3: {
        fileName: "",
        fileId: "",
      },
      keyword: "",
    };
  },
  created() {
    this.getData();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    handleNodeClick(item) {
      this.newDirid = item.id;
    },
    async createFolder() {
      this.dialogForm3Visible = true;
    },
    async handleCreateFolder() {
      const res = await this.$axios({
        url: `/media/createDir`,
        method: "post",
        data: {
          dirName: this.form3.fileName,
          parentId: this.breadcrumbList.slice(-1)[0].dirId,
        },
      });
      if (res.data.code == 0) {
        this.$message("创建文件夹成功");
        this.form3.fileName = "";
      }
    },
    async downloadFile(item) {
      // item.fileId
      // const res = await this.$axios({
      //   url: `/media/down/${item.fileId}`,
      // });
      const pre = "http://10.151.110.92:9400";
      window.open(`${pre}/media/down/${item.fileId}`);
    },
    checkDownload(item) {
      const pre = "http://10.151.110.92:9400";
      const url = `${pre}/media/down/${item.fileId}`;

      this.$alert(url, "资源下载链接", {
        confirmButtonText: "复制链接",
        callback() {
          /* Copy the text inside the text field */
          navigator.clipboard.writeText(url);
        },
      });
    },
    backRootPath() {
      this.parentId = 0;
      this.getData();
    },
    async renameFile(item) {
      this.dialogFormVisible = true;
      this.form.fileName = item.fileName;
      this.form.fileId = item.fileId;
      this.form.parentId = item.parentId;
    },
    async submitRename() {
      console.log(this.breadcrumbList);
      const res = await this.$axios({
        method: "post",
        url: `/media/update`,
        data: {
          fileId: this.form.fileId,
          fileName: this.form.fileName,
          //取面包屑最后一个
          parentId: this.breadcrumbList.slice(-1)[0].dirId,
        },
      });
      if (res.data.code == 0) {
        this.$message("重命名成功");
      }
    },
    async getDirData() {
      const res = await this.$axios({
        url: `/media/dirTree`,
      });
      this.dirTreeData = res.data.data;
    },
    async moveFile(item) {
      await this.getData();
      this.dialogForm2Visible = true;
      this.form2.fileId = item.fileId;
      this.form2.fileName = item.fileName;
    },
    handleDirTreeClick(item) {
      this.newDirid = item.id;
    },
    async handleMoveFile() {
      const res = await this.$axios({
        url: `/media/update`,
        method: "post",
        data: {
          fileId: this.form2.fileId,
          fileName: this.form2.fileName,
          parentId: this.newDirid,
        },
      });
      if (res.data.code == 0) {
        this.$message("移动成功");
      }
    },
    async delFile(item, scope) {
      console.log(scope);
      try {
        await this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
      } catch (error) {
        console.log(error);
      }
      // this.$message("删除成功");
      const res = await this.$axios({
        method: "post",
        url: `/media/del`,
        data: {
          fileId: item.fileId,
        },
      });
      if (res.data.code == 0) {
        this.$message("删除成功");
      }
    },
    async searchFile() {
      const res = await this.$axios({
        url: `/media/list/fname/${this.keyword}`,
      });

      this.breadcrumbList = res.data.data.breadcrumbList;
      this.fileList = res.data.data.fileList;
    },
    async getData(id = 0) {
      // const res=await this.$axios({
      //   url:`/midia/list/pid/${this.parentId}`,
      // })
      console.log("111");
      let res;
      if (id == 0) {
        res = {
          data: {
            code: 0,
            data: {
              breadcrumbList: [
                {
                  dirId: 0,
                  dirName: "根目錄",
                },
              ],
              currentDirId: 0,
              fileList: [
                {
                  createTime: "2021-03-08 18:24:07",
                  downloadCount: 0,
                  fileDesc: "kongapi",
                  fileId: 8,
                  fileName: "kong.jpg",
                  fileType: 0,
                  fileUuid: "1615199047152124361c4-6113-4d06-8150-aecd684bd890",
                  modifiedTime: null,
                },
                {
                  createTime: "2021-03-08 18:24:07",
                  downloadCount: 0,
                  fileDesc: "kongapi",
                  fileId: 8,
                  fileName: "kong.jpg",
                  fileType: 1,
                  fileUuid: "1615199047152124361c4-6113-4d06-8150-aecd684bd890",
                  modifiedTime: null,
                },
                {
                  createTime: "2021-03-08 18:24:07",
                  downloadCount: 0,
                  fileDesc: "kongapi",
                  fileId: 8,
                  fileName: "kong.jpg",
                  fileType: 1,
                  fileUuid: "1615199047152124361c4-6113-4d06-8150-aecd684bd890",
                  modifiedTime: null,
                },
              ],
            },
            msg: "success",
          },
        };
      } else {
        res = {
          data: {
            data: {
              breadcrumbList: [
                {
                  dirId: 0,
                  dirName: "根目录",
                },
                {
                  dirId: 8,
                  dirName: "文件夹2",
                },
              ],
              currentDirId: 8,
              fileList: [
                {
                  createTime: "2021-03-08 18:24:07",
                  downloadCount: 0,
                  fileDesc: "kongapi111",
                  fileId: 8,
                  fileName: "222.jpg",
                  fileType: 0,
                  fileUuid: "1615199047152124361c4-6113-4d06-8150-aecd684bd890",
                  modifiedTime: null,
                },
                {
                  createTime: "2021-03-08 18:24:07",
                  downloadCount: 0,
                  fileDesc: "kongapi233",
                  fileId: 8,
                  fileName: "333.jpg",
                  fileType: 0,
                  fileUuid: "1615199047152124361c4-6113-4d06-8150-aecd684bd890",
                  modifiedTime: null,
                },
              ],
            },
          },
        };
      }

      this.breadcrumbList = res.data.data.breadcrumbList;
      // .map((item) => item.dirName)
      // .join("/");
      this.fileList = res.data.data.fileList;
    },

    handleClick(row) {
      console.log(row);
    },

    comein(item) {
      console.log("comein", item);
      this.parentId = item.fileId;
      // this.currentDir = item.fileName;
      this.getData(item.fileId);
    },
  },
};
</script>
<style lang="scss">
.home {
  height: 100%;
  display: flex;
  background: #f0f3f6;
}
.dir-tree {
  .active {
    color: rgb(97, 175, 239);
  }
}
.cursor {
  cursor: pointer;
}

.home_right {
  background-color: rgb(240, 243, 246);
  height: 500px;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px;
}

.mid {
  margin-top: 10px;
  height: 50px;
  /* background-color: white; */
  padding: 10px;
  display: flex;
  justify-content: space-between;
  .green {
    background: #67c23a;
    border: #67c23a;
    color: white;
    margin-right: 10px;
  }
  .right-box {
    display: flex;
  }
}

.bottom {
  /* flex:1; */
  margin-top: 10px;
  /* background-color: blue; */
  /* height: 100px; */
  .table-container {
    background: white;
    padding: 0 20px 20px 20px;
  }
  .el-breadcrumb {
    padding: 20px 0;
  }
}
.top a {
  color: black;
}
</style>
