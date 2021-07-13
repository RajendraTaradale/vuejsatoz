<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-gray bg-dark">
      <a href="#" class="navbar-brand">Rajendra Taradale</a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <a href="/rtblogs" class="nav-link">RT Blog's</a>
        </li>
        <li class="nav-item">
          <a href="/addblog" class="nav-link">Add Blog</a>
        </li>
      </div>
    </nav>
    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
};
</script>
