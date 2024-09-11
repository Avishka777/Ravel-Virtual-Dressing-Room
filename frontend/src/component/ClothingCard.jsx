/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function ClothingCard({
  itemName,
  itemPrice,
  images = [],
  productId,
  thumbnailImage,
}) {
  const [mainImage, setMainImage] = useState(thumbnailImage || images[0] || "");
  const navigate = useNavigate();

  const handleImageClick = (image) => {
    setMainImage(image);
  };

  const handleCardClick = () => {
    navigate(`/product/${productId}`);
  };

  return (
    <Card
      sx={{ width: "300px", boxShadow: "1rem", margin: 1 }}
      onClick={handleCardClick}
    >
      <CardMedia
        component="img"
        height="400"
        image={mainImage}
        alt="Main Image"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {itemName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {itemPrice}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {images.map((image, index) => (
          <IconButton
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              handleImageClick(image);
            }}
          >
            <CardMedia
              component="img"
              height="50"
              width="50"
              image={image}
              alt={`Thumbnail ${index + 1}`}
              sx={{
                border: mainImage === image ? "2px solid blue" : "none",
                borderRadius: 1,
              }}
            />
          </IconButton>
        ))}
        <IconButton
          aria-label="add to favorites"
          onClick={(e) => e.stopPropagation()}
        >
          <ShoppingCartIcon />
        </IconButton>
        <IconButton aria-label="share" onClick={(e) => e.stopPropagation()}>
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
