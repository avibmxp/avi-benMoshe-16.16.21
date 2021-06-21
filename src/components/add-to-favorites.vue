<template>
  <div class="row">
    <div class="col-12 add-to-favorites-wrapper">
      <div
        class="favorite-icon full-heart"
        :class="[heartToogle ? 'full-heart' : 'empty-heart']"
        @click="updateFavorites"
      ></div>
      <div class="add-to-favorites-text">Add to favorites</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      heartToogle: false
    };
  },
  mounted() {
    this.setHeartMark;
  },
  computed: {
    setHeartMark() {
      let isExist = false;
      this.$store.state.favoritesLst.forEach(favorite => {
        if (favorite.key === this.$store.state.selectedCity.key) {
          isExist = true;
        }
      });
      this.heartToogle = isExist;
    }
  },
  methods: {
    updateFavorites() {
      this.heartToogle = !this.heartToogle;
      this.$store.commit("updateFavorites");
    }
  }
};
</script>

<style scoped>
.add-to-favorites-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.favorite-icon {
  width: 18px;
  height: 18px;
  cursor: pointer;
  margin-right: 5px;
}

.favorite-icon:hover {
  opacity: 0.6;
}

.full-heart {
  background: url(../assets/full_heart.png);
}

.empty-heart {
  background: url(../assets/empty_heart.png);
}

.add-to-favorites-text {
  color: #ffffff;
  font-size: 1rem;
}
</style>