import Vue from "vue";
import Vuex from "vuex";
import Favorite from "@/classes/Favorite.js";
var _ = require("lodash");

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedCity: null,
    currentForcast: null,
    futureForcastsLst: [],
    favoritesLst: [],
    unitType: "c",
    isNightTheme: false
  },
  mutations: {
    setSelectedCity(state, payload) {
      state.selectedCity = payload;
    },
    setCurrentForcast(state, payload) {
      state.currentForcast = payload;
    },
    setFutureForcasts(state, payload) {
      state.futureForcastsLst = payload;
    },
    updateFavorites(state) {
      let isExist = false;
      state.favoritesLst.forEach(favorite => {
        if (favorite.key === state.selectedCity.key) {
          isExist = true;
        }
      });
      if (!isExist) {
        const favorite = new Favorite(
          state.selectedCity.key,
          state.selectedCity.name,
          state.currentForcast.temperature,
          state.currentForcast.unit
        );
        state.favoritesLst.push(favorite);
      } else {
        _.remove(state.favoritesLst, function(favorite) {
          return favorite.key == state.selectedCity.key;
        });
      }
    },
    setThemeType(state, payload) {
      state.isNightTheme = payload;
    }
  }
});
