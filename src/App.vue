<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<style>
#app{
  height: 100%;
}
html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
.top-comp {
  height: 50px;
  background-color: white;
  line-height: 50px;
  padding: 10px;
  padding-left: 20px;
  .el-icon-back {
    margin-right: 5px;
  }
}
</style>

