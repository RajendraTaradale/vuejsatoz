<template>
  <div v-if="currentBlog" class="edit-form">
    <h4>Blogs</h4>
    <form>
      <div class="form-group">
        <label for="title">Blog Title</label>
        <input type="text" class="form-control" id="title"
          v-model="currentBlog.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Blog Description</label>
        <input type="text" class="form-control" id="description"
          v-model="currentBlog.description"
        />
      </div>

      <div class="form-group">
        <label><strong>Release:</strong></label>
        {{ currentBlog.published ? "Completed" : "In-Progress" }}
      </div>
    </form>

    <button class="btn btn-primary mr-2"
      v-if="currentBlog.published"
      @click="updatePublished(false)"
    >
      In-Progress
    </button>
    <button v-else class="btn btn-primary mr-2"
      @click="updatePublished(true)"
    >
      Completed
    </button>

    <button class="btn btn-primary mr-2"
      @click="deleteBlog"
    >
      Delete
    </button>

    <button type="submit" class="btn btn-primary"
      @click="updateBlog"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Blog...</p>
  </div>
</template>

<script>
import RTBlogService from "../services/RTBlogService";

export default {
  name: "rtblogs",
  data() {
    return {
      currentBlog: null,
      message: ''
    };
  },
  methods: {
    getBlog(id) {
      RTBlogService.get(id)
        .then(response => {
          this.currentBlog = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentBlog.id,
        title: this.currentBlog.title,
        description: this.currentBlog.description,
        published: status
      };

      RTBlogService.update(this.currentBlog.id, data)
        .then(response => {
          this.currentBlog.published = status;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateBlog() {
      RTBlogService.update(this.currentBlog.id, this.currentBlog)
        .then(response => {
          console.log(response.data);
          this.message = 'The blog was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteBlog() {
      RTBlogService.delete(this.currentBlog.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "rtblogs" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getBlog(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
