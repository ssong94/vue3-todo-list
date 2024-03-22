<template>

  <a-layout-header>
    <div class="logo"/>
    <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
    >
      <a-menu-item>
        <RouterLink to="home">Home</RouterLink>
      </a-menu-item>
      <a-menu-item key="2">
        <RouterLink to="todo-list">Todo List</RouterLink>
      </a-menu-item>
      <a-menu-item key="3">
        <RouterLink to="test">테스트 페이지</RouterLink>
      </a-menu-item>
    </a-menu>
  </a-layout-header>


</template>


<script setup>

</script>
