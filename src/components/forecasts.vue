<template>
  <div v-if="currentForecast" class="forecast-wrapper">
    <div class="city-name" v-text="cityName"></div>
    <Forecast :key="currentForecast.key" :forecast="currentForecast" :isCurrent="true"></Forecast>
    <div class="next-days-forecast">
      <Forecast v-for="forcast in futureForcasts" :key="forcast.key" :forecast="forcast"></Forecast>
    </div>
  </div>
</template>
<script>
import Forecast from "@/components/forecast.vue";

export default {
  name: "forecasts",
  components: {
    Forecast
  },
  props: {},
  data() {
    return {};
  },
  computed: {
    cityName() {
      return this.$store.state.selectedCity.name;
    },
    currentForecast() {
      return this.$store.state.currentForcast;
    },
    futureForcasts() {
      return this.$store.state.futureForcastsLst;
    }
  }
};
</script>

<style scoped>
.forecast-wrapper {
  margin-top: 5px;
}

.forecast-wrapper {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.city-name {
  font-weight: bold;
  color: #ffffff;
  font-size: 3rem;
}

.next-days-forecast {
  display: flex;
  flex-flow: wrap;
  justify-content: center;
  margin-top: 20px;
}

.next-days-forecast div {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>