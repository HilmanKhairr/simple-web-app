"use client";

import SwButton from "@/components/SwButton";
import SwTextField from "@/components/SwTextField";
import SwTypography from "@/components/SwTypography";
import { encodeData } from "@/utils/common";
import { Box, Pagination, Stack, useMediaQuery, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AnimeCard from "./section/AnimeCard";
import AnimeCardSkeleton from "./section/AnimeCardSkeleton";
import NoData from "./section/NoData";

export default function Anime() {
  // State and Variables
  const theme = useTheme();
  const router = useRouter();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  const [params, setParams] = useState({
    page: 1,
    size: 25,
  });
  const [animeList, setAnimeList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [jumpValue, setJumpValue] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch API Functions
  const getData = async () => {
    const queryParams = new URLSearchParams({
      page: params.page.toString(),
      limit: params.size.toString(),
    });

    try {
      setLoading(true);
      const res = await fetch(`https://api.jikan.moe/v4/anime?${queryParams}`);
      const data = await res.json();

      setAnimeList(data?.data);
      setTotalPage(data?.pagination?.last_visible_page);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Event Handler Function
  const handleJumpPage = () => {
    if (jumpValue) {
      setParams((prev) => ({ ...prev, page: Number(jumpValue) }));
      setJumpValue("");
    }
  };

  const handleClickAnime = (id: number) => {
    router.push(`/anime/${encodeData(id.toString())}`);
  };

  const handleChangePage = (_: unknown, value: number) => {
    setParams((prev) => ({ ...prev, page: value }));
  };

  // Use Effects
  useEffect(() => {
    getData();
  }, [params]);

  return (
    <Box>
      <Stack
        gap={2}
        width="100%"
        direction="column"
        alignItems="center"
        padding={{ xs: 2, md: 4, lg: 8 }}
      >
        <SwTypography bold fontSize={50} color={theme.palette.primary.main} textAlign="center">
          Anime List
        </SwTypography>

        <Stack
          width="80%"
          flexWrap="wrap"
          direction="row"
          maxWidth="1200px"
          justifyContent="center"
        >
          {loading ? (
            Array.from(new Array(25)).map((_, index) => <AnimeCardSkeleton key={index} />)
          ) : animeList?.length > 0 ? (
            animeList?.map(
              (item: {
                title: string;
                score: number;
                mal_id: number;
                images: {
                  webp: {
                    image_url: string;
                    large_image_url: string;
                  };
                };
              }) => (
                <AnimeCard
                  key={item?.mal_id}
                  title={item?.title}
                  score={item?.score}
                  image={
                    isMdDown ? item?.images?.webp?.image_url : item?.images?.webp?.large_image_url
                  }
                  onClick={() => handleClickAnime(item?.mal_id)}
                />
              )
            )
          ) : (
            <NoData />
          )}
        </Stack>

        {Boolean(totalPage) && (
          <>
            <Stack gap={1} direction="row" alignItems="center">
              <SwTypography small>Go to page</SwTypography>
              <SwTextField
                numberOnly
                value={jumpValue}
                placeholder="Ex: 1"
                sx={{ width: "75px" }}
                onEnter={() => handleJumpPage()}
                onChange={(value: string) => setJumpValue(value)}
              />
              <SwButton disabled={!jumpValue} onClick={handleJumpPage}>
                Go
              </SwButton>
            </Stack>

            <Pagination
              showFirstButton
              showLastButton
              color="primary"
              shape="rounded"
              page={params.page}
              count={totalPage}
              size={isMdDown ? "small" : "medium"}
              onChange={handleChangePage}
            />
          </>
        )}
      </Stack>
    </Box>
  );
}
