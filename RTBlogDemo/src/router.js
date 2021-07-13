import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/rtblogs",
      name: "blogs",
      component: () => import("./components/RTBlogList")
    },
    {
      path: "/blogs/:id",
      name: "blogs-details",
      component: () => import("./components/RTBlog")
    },
    {
      path: "/addblog",
      name: "addblog",
      component: () => import("./components/AddRTBlog")
    }
  ]
});
