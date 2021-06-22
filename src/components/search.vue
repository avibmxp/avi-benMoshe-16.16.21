<template>
  <div>
    <div class="row col-12">
      <div class="col"></div>
      <div class="col-sm-12 col-md-5 d-flex flex-column mt-5">
        <AddToFavorites v-if="showAddToFavorite"/>
        <SearchField :placeholder="'Enter city name'" :btnName="'Search'"></SearchField>
      </div>
      <div class="col"></div>
    </div>
    <div class="row col-12 m-0">
      <div class="col"></div>
      <div class="col-10">
        <Forecasts />
      </div>
      <div class="col"></div>
    </div>
  </div>
</template>
<script>
import AddToFavorites from "@/components/add-to-favorites.vue";
import SearchField from "@/components/search-field.vue";
import Forecasts from "@/components/forecasts.vue";

export default {
  name: "search",
  components: {
    AddToFavorites,
    SearchField,
    Forecasts
  },
  props: {},
  data() {
    return {};
  },
  computed: {
    showAddToFavorite() {
      return this.$store.state.currentForcast != null;
    }
  }
};
</script>