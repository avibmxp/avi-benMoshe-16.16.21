export default class Favorites {
  constructor(key, name, temperature, unit) {
    this.key = key;
    this.name = name;
    this.temperature = Math.round(temperature);
    this.unit = unit;
  }
}
