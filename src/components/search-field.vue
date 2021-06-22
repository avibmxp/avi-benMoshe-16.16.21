<template>
  <div class="row search-wrapper">
    <div class="col-9">
      <input type="text" class="search-field" :placeholder="placeholder" v-model="cityToSearch" />
      <div class="col-11 search-options">
        <SearchFieldOption
          v-for="city in citiesLst"
          :key="city.key"
          :city="city"
          v-on:selectedEvent="selectedEvent"
        ></SearchFieldOption>
      </div>
    </div>
    <input type="button" class="col-3 search-btn" @click="search" v-bind:value="btnName" />
  </div>
</template>

<script>
import SearchFieldOption from "@/components/search-field-option.vue";
import City from "@/classes/City.js";
import Error from "@/classes/Error.js";
import Weather from "@/classes/Weather.js";
import mixin from "@/helpers/mixin.js";
const axios = require("axios");

export default {
  name: "search-field",
  components: {
    SearchFieldOption
  },
  mixins: [mixin],
  props: {
    placeholder: {
      type: String,
      default: "Search"
    },
    btnName: {
      type: String,
      default: "Search"
    }
  },
  mounted() {
    if (this.$store.state.selectedCity === null) {
      // First load will show tel-aviv forecast
      this.initCity(215854, "Tel Aviv");
    }
    if (window.location.hash != "") {
      // Check if the use come from favorite page
      let hashData = window.location.hash
        .replace("#", "")
        .trim()
        .split("&");
      let cityKey = hashData[0];
      let cityName = hashData[1].replace("%20", "-");
      this.initCity(cityKey, cityName);
    }
  },
  data() {
    return {
      cityToSearch: "",
      citiesLst: [],
      englishLetterRegax: /^[A-Za-z0-9]*$/
    };
  },
  watch: {
    cityToSearch(newVal) {
      var _self = this;
      if (newVal != "") {
        if (this.englishLetterRegax.test(newVal.trim().replace(" ", ""))) {
          axios
            .get(this.autoCompleteRequest(newVal))
            .then(res => {
              if (res != "" && res.data != "" && res.status == "200") {
                // Init the forecast component and the city list data
                _self.citiesLst = [];
                this.$store.commit("setCurrentForcast", null);
                res.data.forEach(item => {
                  const city = new City(
                    item.Key,
                    item.Type,
                    item.Rank,
                    item.LocalizedName
                  );
                  _self.citiesLst.push(city);
                });
              } else {
                const error = new Error(
                  "Auto complete error, status:" + res.status,
                  res.statusText,
                  "error",
                  "close"
                );
                _self.errorHandler(error);
              }
            })
            .catch(error => {
              const errorMsg = new Error(
                "General Error",
                error.message,
                "error",
                "close"
              );
              _self.errorHandler(errorMsg);
            });
        } else {
          const error = new Error(
            "English letters",
            "Please enter english letters only",
            "error",
            "Close"
          );
          this.cityToSearch = "";
          _self.errorHandler(error);
        }
      } else {
        this.citiesLst = [];
      }
    }
  },
  methods: {
    selectedEvent(value) {
      this.cityToSearch = value.name;
      this.citiesLst = [];
      this.$store.commit("setSelectedCity", value);
    },
    search() {
      this.currentForecastSearch(this.$store.state.selectedCity.key);
      this.futureForcastSearch(this.$store.state.selectedCity.key);
    },
    currentForecastSearch(cityKey) {
      var _self = this;
      axios
        .get(this.currentForecastRequest(cityKey))
        .then(res => {
          if (res !== "" && res.status === 200 && res.data.length > 0) {
            let weatherReponse = res.data[0];
            const weather = new Weather(
              weatherReponse.LocalObservationDateTime,
              weatherReponse.Temperature.Metric.Value,
              weatherReponse.Temperature.Metric.Unit,
              weatherReponse.WeatherIcon,
              weatherReponse.WeatherText
            );
            this.$store.commit("setCurrentForcast", weather);
          } else {
            const error = new Error(
              "Current forecast error, status:" + res.status,
              res.statusText,
              "error",
              "close"
            );
            _self.errorHandler(error);
          }
        })
        .catch(error => {
          const errorMsg = new Error(
            "General Error",
            error.message,
            "error",
            "close"
          );
          _self.errorHandler(errorMsg);
        });
    },
    futureForcastSearch(cityKey) {
      var _self = this;
      let forcastLst = [];

      axios
        .get(this.futureForecastsRequest(cityKey))
        .then(res => {
          if (res !== "" && res.status === 200) {
            res.data.DailyForecasts.forEach(singleForecast => {
              const weather = new Weather(
                singleForecast.Date,
                singleForecast.Temperature.Maximum.Value,
                singleForecast.Temperature.Maximum.Unit,
                singleForecast.Day.Icon,
                singleForecast.Day.IconPhrase
              );
              forcastLst.push(weather);
            });
            this.$store.commit("setFutureForcasts", forcastLst);
          } else {
            const error = new Error(
              "Future forecast error, status:" + res.status,
              res.statusText,
              "error",
              "close"
            );
            _self.errorHandler(error);
          }
        })
        .catch(error => {
          const errorMsg = new Error(
            "General Error",
            error.message,
            "error",
            "close"
          );
          _self.errorHandler(errorMsg);
        });
    },
    initCity(cityKey, cityName) {
      const initialCity = new City(cityKey, "", "", cityName);
      this.currentForecastSearch(initialCity.key);
      this.futureForcastSearch(initialCity.key);
      this.$store.commit("setSelectedCity", initialCity);
    }
  }
};
</script>

<style scoped>
.search-wrapper {
  margin-top: 5px;
}

.search-wrapper input {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 20px;
  cursor: pointer;
}

.search-wrapper input:focus {
  outline: none;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 20px;
}

.search-field {
  padding: 10px;
  width: 100%;
  border: 1px solid #2c3e50;
}

.search-options {
  background: rgba(255, 255, 255, 0.2);
  margin-left: 4%;
}

.search-btn {
  height: 45px;
  border: none;
  background: #2c3e50;
  color: #ffffff;
  cursor: pointer;
  padding: 10px;
}

.search-btn:hover {
  opacity: 0.5;
}
</style>