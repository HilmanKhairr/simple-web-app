"use client";

import AnimeCard from "@/app/anime/section/AnimeCard";
import SwTypography from "@/components/SwTypography";
import useFavoriteStore, { FavoriteProps } from "@/store/FavoriteStore";
import { encodeData } from "@/utils/common";
import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import NoData from "../section/NoData";

export default function Favorites() {
  // State and Variables
  const theme = useTheme();
  const router = useRouter();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
  const favoriteStore = useFavoriteStore((state) => state) as {
    items: FavoriteProps[];
    totalItems: number;
  };

  // Event Handler Functions
  const handleClickAnime = (id: number) => {
    router.push(`/anime/${encodeData(id.toString())}`);
  };

  return (
    <Box>
      <Stack
        gap={2}
        width="100%"
        direction="column"
        alignItems="center"
        padding={{ xs: 0, md: 4, lg: 8 }}
      >
        <SwTypography bold fontSize={50} color={theme.palette.primary.main} textAlign="center">
          Favorite Anime List
        </SwTypography>

        <Stack
          width="80%"
          flexWrap="wrap"
          direction="row"
          maxWidth="1200px"
          justifyContent="center"
        >
          <Stack direction="row" flexWrap="wrap" justifyContent="center" width="100%">
            {favoriteStore.items?.length > 0 ? (
              favoriteStore.items.map((item) => (
                <AnimeCard
                  key={item?.mal_id}
                  title={item?.title}
                  score={item?.score}
                  image={
                    isMdDown ? item?.images?.webp?.image_url : item?.images?.webp?.large_image_url
                  }
                  onClick={() => handleClickAnime(item?.mal_id)}
                />
              ))
            ) : (
              <NoData />
            )}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
