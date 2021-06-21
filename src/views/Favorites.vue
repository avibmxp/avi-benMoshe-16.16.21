<template>
  <div class="row col-12 favorites">
    <div class="col"></div>
    <div class="col-5 d-flex flex-column mt-5">
      <h1 class="title">My favorites cities</h1>
      <div class="favorites-wrapper">
        <router-link :to="'/#'+favorite.key +'&'+ favorite.name" v-for="favorite in favorites" :key="favorite.key">
          <div class="favorite-wrapper">
            <div class="city-name" v-text="favorite.name"></div>
            <div>
              <span class="favorite-temp" v-text="favorite.temperature"></span>
              <span class="favorite-unit" v-text="favorite.unit"></span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div class="col"></div>
  </div>
</template>

<script>
export default {
  name: "favorites",
  components: {},
  computed: {
    favorites() {
      return this.$store.state.favoritesLst;
    }
  }
};
</script>

<style scoped>
.favorites h1 {
  color: #ffff;
  font-size: 3rem;
  text-align: center;
}

.favorites a {
  text-decoration: none;
}

.favorites-wrapper {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 20px;
}

.favorite-wrapper {
  width: 120px;
  height: 150px;
  border: 2px solid #ffff;
  padding: 10px;
  text-align: center;
  color: #ffffff;
  font-size: 1.1rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  background: rgba(44, 62, 80, 0.4);
  margin-right: 5px;
  cursor: pointer;
  margin-bottom: 5px;
}

.favorite-wrapper:hover {
  opacity: 0.5;
}

.favorite-temp {
  font-size: 1.5rem;
  font-weight: bold;
}

.favorite-unit {
  font-size: 1rem;
  margin-left: 3px;
}
</style>
