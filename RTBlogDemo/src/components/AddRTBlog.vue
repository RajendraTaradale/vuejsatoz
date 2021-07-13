<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="blog.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="blog.description"
          name="description"
        />
      </div>

      <button @click="saveblog" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>Your Blog submitted successfully!</h4>
      <button class="btn btn-success" @click="newBlog">Add</button>
    </div>
  </div>
</template>

<script>
import RTBlogService from "../services/RTBlogService";

export default {
  //name: "addblog",
  data() {
    return {
      blog: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      submitted: false
    };
  },
  methods: {
    saveblog() {
      var data = {
        title: this.blog.title,
        description: this.blog.description,
        published: false
      };

      RTBlogService.create(data)
        .then(response => {
          this.blog.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newBlog() {
      this.submitted = false;
      this.blog = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
