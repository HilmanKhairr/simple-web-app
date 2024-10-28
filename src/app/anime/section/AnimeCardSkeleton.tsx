import { Box, Skeleton } from "@mui/material";

type AnimeCardSkeletonProps = {
  key: string | number;
};

const AnimeCardSkeleton = ({ key }: AnimeCardSkeletonProps) => {
  return (
    <Box
      key={key}
      margin="5px"
      width={{
        xs: "calc(50% - 10px)",
        sm: "calc(33.33% - 10px)",
        md: "calc(25% - 10px)",
        lg: "calc(20% - 10px)",
        xl: "calc(16.66% - 10px)",
      }}
    >
      <Skeleton variant="rectangular" width="100%" height="300px" sx={{ borderRadius: "6px" }} />
    </Box>
  );
};

export default AnimeCardSkeleton;
