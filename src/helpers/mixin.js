import Swal from "sweetalert2";
export default {
  data() {
    return {
      //apiKey: "PiOy74A9NBFhEwOrIlMjmlF84aOHRO21",
      apiKey: "AYcGcFPSdOjccGgTnHVVl8inXKZcLnAg",
      autocompleteUrl:
        "https://dataservice.accuweather.com/locations/v1/cities/autocomplete?",
      currentForecastUrl:
        "https://dataservice.accuweather.com/currentconditions/v1/",
      futureForecastsUrl:
        "https://dataservice.accuweather.com/forecasts/v1/daily/5day/"
    };
  },
  methods: {
    autoCompleteRequest(query) {
      return this.autocompleteUrl + "apikey=" + this.apiKey + "&q=" + query;
    },
    currentForecastRequest(locationKey) {
      return this.currentForecastUrl + locationKey + "?apikey=" + this.apiKey;
    },
    futureForecastsRequest(locationKey) {
      return this.futureForecastsUrl + locationKey + "?apikey=" + this.apiKey;
    },
    convertCelsiusToFahrenheit(unit) {
      return Math.round((parseInt(unit) * 9) / 5 + 32);
    },
    convertFahrenheitToCelsius(unit) {
      return Math.round(((parseInt(unit) - 32) * 5) / 9);
    },
    errorHandler(error) {
      Swal.fire({
        title: error.title,
        text: error.text,
        type: error.type,
        confirmButtonText: error.confirmButtonText
      });
    }
  }
};
