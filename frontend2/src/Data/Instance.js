import Data from "./Data";
import Room from "./Room";
import Item from "./Item";

const room = new Room();

for (let itemData of Data) {
  let { id, type, name, desc, imgSrc_jpg, imgSrc_png } = itemData;
  let item = new Item(id, type, name, desc, imgSrc_jpg, imgSrc_png);
  room.addItem(item);
}

export default room;
