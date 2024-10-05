export default class Room {
  constructor() {
    this.room = [];
  }
  addItem(item) {
    this.room = [...this.room, item];
  }
}
