<template>
  <div class="home">
    <el-col :span="6" class="home_left">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">文件列表</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-menu"></i>
          <span slot="title">密码修改</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <div class="home_right">
      <div class="top">返回</div>
      <div class="mid">
        <div>
          {{ currentDir }}
          <button @click="backRootPath">根目录</button>
        </div>
        <el-table :data="fileList" border>
          <el-table-column fixed prop="fileId" label="序号" width="150">
          </el-table-column>
          <el-table-column prop="fileName" label="名称" width="120">
            <template slot-scope="scope">
              <div>
                <i
                  class="el-icon-folder"
                  v-if="scope.row.fileType == 1"
                  @click="comein(scope.row)"
                ></i>
                <span style="margin-left: 10px">{{ scope.row.fileName }}</span>
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
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                >查看</el-button
              >
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="but"></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  data() {
    return {
      currentDir: "根目录",
      parentId: 0,
      fileList: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    backRootPath() {
      this.parentId = 0;
      this.getData();
      this.currentDir = "根目录";
    },
    async getData() {
      // const res=await this.$axios({
      //   url:`/midia/list/pid/${this.parentId}`,
      // })
      const res = {
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
            fileName: "文件夹1",
            fileType: 1,
            fileUuid: "1615199047152124361c4-6113-4d06-8150-aecd684bd890",
            modifiedTime: null,
          },
          {
            createTime: "2021-03-08 18:24:07",
            downloadCount: 0,
            fileDesc: "kongapi",
            fileId: 8,
            fileName: "文件夹2",
            fileType: 1,
            fileUuid: "1615199047152124361c4-6113-4d06-8150-aecd684bd890",
            modifiedTime: null,
          },
        ],
      };
       this.currentDir = res.breadcrumbList
        .map((item) => item.dirName)
        .join("/");
      this.fileList = res.fileList;
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClick(row) {
      console.log(row);
    },
    async getData2() {
      const res = {
        breadcrumbList: [
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
      };
      this.currentDir = res.breadcrumbList
        .map((item) => item.dirName)
        .join("/");
      this.fileList = res.fileList;
    },
    comein(item) {
      console.log("comein", item);
      this.parentId = item.fileId;
      // this.currentDir = item.fileName;
      this.getData2();
    },
  },
};
</script>
<style>
.home {
  height: 100%;
}
.el-menu-vertical-demo {
  height: 500px;
}
.home_right {
  background-color: rgb(240, 243, 246);
  height: 500px;
  display: flex;
  flex-direction: column;
}
.top {
  height: 50px;
  background-color: #fff;
}
.mid {
  margin-top: 10px;
  height: 50px;
}
.but {
  /* flex:1; */
  margin-top: 10px;
  background-color: #fff;
  height: 300px;
}
</style>
