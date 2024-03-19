<template>
  <h1>Hello App!</h1>
  <p>
    <strong>Current route path:</strong> {{ $route.fullPath }}
  </p>
  <nav>
    <ul>
      <li>
    <RouterLink to="/home">Go to Home</RouterLink>
      </li>
      <li>
    <RouterLink to="/todo-list">Go to Todo List</RouterLink>
      </li>
    </ul>
  </nav>
  <main>
    <RouterView />
  </main>
</template>
