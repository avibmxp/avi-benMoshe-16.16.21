<template>
  <div>
    <div
      class="forecast-wrapper"
      :class="{'current-forecast':isCurrent, 'dark-theme-forecast-wrapper': themeType}"
    >
      <div v-if="isCurrent" class="forecast-today">Today</div>
      <div class="forecast-date" v-text="forecast.weekDay"></div>
      <div>
        <span class="forecast-temp" v-text="temperature"></span>
        <span class="forecast-unit" v-text="unit"></span>
      </div>
      <div class="forecast-text" v-text="forecast.text"></div>
    </div>
  </div>
</template>

<script>
import mixin from "@/helpers/mixin.js";

export default {
  props: {
    forecast: {
      type: Object,
      require: true
    },
    isCurrent: {
      type: Boolean,
      default: false
    }
  },
  mixins: [mixin],
  data() {
    return {};
  },
  computed: {
    temperature() {
      if (this.$store.state.unitType.toUpperCase() != this.forecast.unit) {
        if (this.$store.state.unitType.toUpperCase() == "C") {
          return this.convertFahrenheitToCelsius(this.forecast.temperature);
        } else {
          return this.convertCelsiusToFahrenheit(this.forecast.temperature);
        }
      }
      return this.forecast.temperature;
    },
    unit() {
      if (this.$store.state.unitType.toUpperCase() != this.forecast.unit) {
        return this.$store.state.unitType;
      } else {
        return this.forecast.unit;
      }
    },
    themeType: {
      get() {
        return this.$store.state.isNightTheme;
      },
      set(newVal) {
        this.$store.commit("setThemeType", newVal);
      }
    }
  }
};
</script>

<style scoped>
.forecast-wrapper {
  width: 120px;
  height: 150px;
  border: 2px solid #ffff;
  padding: 10px;
  text-align: center;
  color: #ffffff;
  font-size: 1.1rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  background: rgba(44, 62, 80, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.forecast-temp {
  font-size: 1.5rem;
  font-weight: bold;
}

.forecast-unit {
  font-size: 1rem;
  margin-left: 3px;
}

.dark-theme-forecast-wrapper {
  background: rgba(0, 0, 0, 0.7) !important;
}

.current-forecast {
  width: 100%;
  border: none;
  font-size: 2rem;
  box-shadow: none;
  background: none !important;
}

.forecast-today {
    font-size: 1rem;
}
</style>