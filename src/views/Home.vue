<template>
  <div class="home">
    <Search/>
  </div>
</template>

<script>
// @ is an alias to /src
import Search from "@/components/search.vue";
export default {
  name: "home",
  components: {
    Search
  }
};
</script>

<style scoped>
</style>
