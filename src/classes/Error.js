export default class Error {
  constructor(title, text, type, confirmButtonText) {
    this.title = title;
    this.text = text;
    this.type = type;
    this.confirmButtonText = confirmButtonText;
  }
}
