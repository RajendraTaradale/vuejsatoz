<template>
<div class="container">
  <div class="row">
    <div class="col-md-4"></div>
    <div class="col-md-4">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search by blog title"
          v-model="searchTitle"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="
              page = 1;
              retrieveBlogs();
            "
          >
            Search
          </button>
        </div>
      </div>
    
    
    </div>
    </div>

    <!-- <div class="col-md-12">
      <div class="mb-3">
        Items per Page:
        <select v-model="pageSize" @change="handlePageSizeChange($event)">
          <option v-for="size in pageSizes" :key="size" :value="size">
            {{ size }}
          </option>
        </select>
      </div>

      <b-pagination
        v-model="page"
        :total-rows="count"
        :per-page="pageSize"
        prev-text="Prev"
        next-text="Next"
        @change="handlePageChange"
      ></b-pagination>
    </div> -->
  <div class="row">
    <div class="col-md-6">
      <h4>Blogs#List</h4>
      <ul class="list-group" id="blogs-list">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(bg, index) in blogs"
          :key="index"
          @click="setActiveBlog(bg, index)"
        >
          {{ bg.title }}
        </li>
      </ul>
    </div>

    <div class="col-md-6">
      <div v-if="currentBlog">
        <h4>Blogs#Details</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentBlog.title }}
        </div>
        <div>
          <label><strong>Description:</strong></label>
          {{ currentBlog.description }}
        </div>
        <div>
          <label><strong>Release:</strong></label>
          {{ currentBlog.published ? "Completed" : "In-Progress"}}
        </div>

        <a class="btn btn-primary" :href="'/blogs/' + currentBlog.id">
          Edit
        </a>
      </div>
      <div v-else style="text-align:center;align:center">
        <br />
        <p>Please select the Blog for any Operations</p>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import RTBlogService from "../services/RTBlogService";

export default {
  name: "blogs-list",
  data() {
    return {
      blogs: [],
      currentBlog: null,
      currentIndex: -1,
      searchTitle: "",

      page: 1,
      count: 0,
      pageSize: 1,

      pageSizes: [3, 6, 9],
    };
  },
  methods: {
    getRequestParams(searchTitle, page, pageSize) {
      let params = {};

      if (searchTitle) {
        params["title"] = searchTitle;
      }

      if (page) {
        params["page"] = page - 1;
      }

      if (pageSize) {
        params["size"] = pageSize;
      }

      return params;
    },

    retrieveBlogs() {
      const params = this.getRequestParams(
        this.searchTitle,
        this.page,
        this.pageSize
      );

      RTBlogService.getAll(params)
        .then((response) => {
          const { blogs } = response.data;
          this.blogs = response.data;
          this.count = 3;

          console.log(response.data);
          console.log(blogs);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    handlePageChange(value) {
      this.page = value;
      this.retrieveBlogs();
    },

    handlePageSizeChange(event) {
      this.pageSize = event.target.value;
      this.page = 1;
      this.retrieveBlogs();
    },

    refreshList() {
      this.retrieveBlogs();
      this.currentBlog = null;
      this.currentIndex = -1;
    },

    setActiveBlog(bg, index) {
      this.currentBlog = bg;
      this.currentIndex = index;
    },
  },
  mounted() {
    this.retrieveBlogs();
  },
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
