<template>
  <div class="search-option" v-text="city.name" @click="selectCity"></div>
</template>

<script>
export default {
  props: {
    city: {
      type: Object,
      require: true
    }
  },
  data() {
    return {};
  },
  methods: {
    selectCity() {
      this.$emit("selectedEvent", this.city);
    }
  }
};
</script>

<style scoped>
.search-option {
  cursor: pointer;
  padding-top: 5px;
  padding-bottom: 5px;
  color: #2c3e50;
}

.search-option:hover {
  opacity: 0.5;
}
</style>