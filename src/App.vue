<template>

  <div id="app">
  <a-layout class="layout">
  <HeaderView />

    <a-layout-content style="padding: 0 50px">
      <a-breadcrumb style="margin: 16px 0">

        <a-breadcrumb-item>
          <strong>Current route path:</strong> {{ $route.fullPath }}
        </a-breadcrumb-item>
      </a-breadcrumb>
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">
        <RouterView />
      </div>
    </a-layout-content>


  <FooterView />

  </a-layout>

  </div>
</template>

<script setup>
</script>


<script>

import HeaderView from '@/components/views/layout/HeaderView.vue'
import FooterView from '@/components/views/layout/FooterView.vue'


export default {
  components: {
    HeaderView
    , FooterView
  },

}


</script>

<style>
.site-layout-content {
  min-height: 280px;
  padding: 24px;
  background: #fff;
}
#components-layout-demo-top .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}
.ant-row-rtl #components-layout-demo-top .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

[data-theme='dark'] .site-layout-content {
  background: #141414;
}
</style>
