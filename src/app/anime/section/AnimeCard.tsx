import SwTypography from "@/components/SwTypography";
import { Box, Card, CardContent, CardMedia } from "@mui/material";

type AnimeCardProps = {
  title: string;
  score: number;
  image: string;
  onClick: () => void;
};

const AnimeCard = ({ title, score, image, onClick }: AnimeCardProps) => {
  return (
    <Box
      margin="5px"
      width={{
        xs: "calc(50% - 10px)",
        sm: "calc(33.33% - 10px)",
        md: "calc(25% - 10px)",
        lg: "calc(20% - 10px)",
        xl: "calc(16.66% - 10px)",
      }}
      sx={{
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <Card>
        <Box sx={{ position: "relative", paddingBottom: "140%" }}>
          <CardMedia
            component="img"
            alt={title}
            image={image}
            sx={{ position: "absolute", width: "100%", height: "100%" }}
          />
        </Box>
        <CardContent>
          <SwTypography
            semiBold
            sx={{
              height: "45px",
              lineHeight: 1.3,
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
            }}
          >
            {title}
          </SwTypography>
          <SwTypography small>Score: {score || "N/A"}</SwTypography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AnimeCard;
