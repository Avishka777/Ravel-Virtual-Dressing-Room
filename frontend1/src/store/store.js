import { proxy } from 'valtio';
import edit1 from "../assets/customize/edit1.png";
import edit2 from "../assets/customize/edit2.png";
import edit3 from "../assets/customize/edit3.png";

const state = proxy({
  intro: true,
  colors: ["#1091b4", '#ccc', '#726DE8', '#EF674E', '#353934', "#e30b9e", '#EFBD4E', '#80C670'],
  decals: [edit1, edit2, edit3],
  color: '#353934',
  decal: edit2,
  decalScale: 0.25,  
  decalPosition: { x: 0, y: 0.01, z: 0.15 },  
});

export { state };
