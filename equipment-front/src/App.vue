<template>
  <a-layout id="app">
    <a-layout-sider id="sider">
      <div class="logo">
        <img class="img-responsive center-block" height="30px" src="./assets/logo.png" alt="logo" srcset="">
        <span class="text-center text-success">装备健康监测系统</span>
      </div>
      <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
        <a-menu-item key="1">
          <a-icon type="home" />
          <span class="nav-text"><router-link class="text-white" to="/">装备信息</router-link></span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="bar-chart" />
          <span class="nav-text"><router-link class="text-white" to="/">监测信息</router-link></span>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="environment" />
          <span class="nav-text"><router-link class="text-white" to="/">装备定位</router-link></span>
        </a-menu-item>
        <a-menu-item key="4">
          <a-icon type="alert" />
          <span class="nav-text"><router-link class="text-white" to="/">健康预警</router-link></span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout id="content">
      <a-layout-header id="content-header"/>
      <a-layout-content id="content-body">
        <div :style="{ padding: '24px', background: '#fff', textAlign: 'center' }">
          <router-view/>
        </div>
      </a-layout-content>

      <a-layout-footer class="text-center">
        SNNU ©2022 Created by ablocker
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
#app .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

#sider {
  overflow: auto;
  height: 100vh;
  position: fixed;
  left: 0;
}

#content {
  margin-left: 200px;
}

#content-header {
  background: #fff;
  padding: 0;
}

#content-body {
  margin: 24px 16px 0;
  overflow: initial;
}

.text-center {
  text-align: center;
}
</style>
