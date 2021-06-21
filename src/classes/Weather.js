var moment = require("moment");

export default class Weather {
  constructor(date, temperature, unit, icon, text) {
    this.weekDay = this.dateFormat(date);
    this.temperature = Math.round(temperature);
    this.unit = unit;
    this.icon = icon;
    this.text = text;
  }

  dateFormat(date) {
    return moment(date).format("dddd");
  }
}
