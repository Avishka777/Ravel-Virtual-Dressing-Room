import ClothingCard from "./ClothingCard";
import clothing1 from "../assets/clothes/clothing1.jpg";
import clothing2 from "../assets/clothes/clothing2.jpg";
import clothing3 from "../assets/clothes/clothing3.jpg";
import clothing4 from "../assets/clothes/clothing4.jpg";
import clothing5 from "../assets/clothes/clothing5.jpg";
import clothing6 from "../assets/clothes/clothing6.jpg";
import { Grid } from "@mui/material";

export default function AllClothing() {
  const items = [
    {
      itemName: "Dreamer Tee - Unisex",
      itemPrice: "LKR 4,450.00",
      images: [clothing1, clothing2, clothing3],
    },
    {
      itemName: "Globe Supersize Tee - Unisex",
      itemPrice: "LKR 3,500.00",
      images: [clothing4, clothing5, clothing6],
    },
  ];

  return (
    <Grid
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "center",
      }}
    >
      {items.map((item, index) => (
        <ClothingCard
          key={index}
          itemName={item.itemName}
          itemPrice={item.itemPrice}
          images={item.images}
        />
      ))}
    </Grid>
  );
}
