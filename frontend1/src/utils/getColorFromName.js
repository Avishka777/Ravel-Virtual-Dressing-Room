export const getColorFromName = (name) => {
  let charSum = 0;
  for (let i = 0; i < name.length; i++) {
    charSum += name.charCodeAt(i);
  }
  let rgb = {
    red: "",
    green: "",
    blue: "",
  };

  if (charSum % 3 === 0) {
    rgb.red = 212;
    rgb.green = charSum % 50;
    rgb.blue = charSum % 120;
  } else if (charSum % 5 === 0) {
    rgb.red = charSum % 50;
    rgb.green = 212;
    rgb.blue = charSum % 120;
  } else if (charSum % 2 === 0) {
    rgb.red = charSum % 120;
    rgb.green = charSum % 50;
    rgb.blue = 212;
  } else {
    rgb.red = 90;
    rgb.green = charSum % 30;
    rgb.blue = charSum % 100;
  }

  console.log(rgb);
  return `rgba( ${rgb.red}, ${rgb.green}, ${rgb.blue}, 1)`;
};
