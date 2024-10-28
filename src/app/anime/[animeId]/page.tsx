"use client";

import SwButton from "@/components/SwButton";
import SwModal from "@/components/SwModal";
import SwTypography from "@/components/SwTypography";
import useFavoriteStore, { FavoriteProps } from "@/store/FavoriteStore";
import { decodeData } from "@/utils/common";
import { neutralDark } from "@/utils/const/color";
import { Favorite, FavoriteBorder, SmartDisplayOutlined } from "@mui/icons-material";
import { Box, Grid2, Rating, Skeleton, Stack, useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import NoData from "../section/NoData";
import SuggestionSection from "./section/SuggestionSection";

export type DataDetailProps = {
  mal_id: number;
  title: string;
  title_japanese: string;
  images: {
    webp: {
      image_url: string;
      large_image_url: string;
    };
  };
  synopsis: string;
  trailer: {
    url: string;
  };
  score: number;
  year: number;
};

export default function DetailAnime({ params }: { params: { animeId: string } }) {
  // State and Variables
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  const id: string = decodeData(params.animeId);
  const favoriteStore = useFavoriteStore((state) => state) as {
    items: FavoriteProps[];
    totalItems: number;
    addFavorite: (favorite: FavoriteProps) => void;
    removeFavorite: (id: number) => void;
  };
  const isAnimeFavorited = favoriteStore?.items?.some((item) => item?.mal_id === Number(id));

  const [dataDetail, setDataDetail] = useState<DataDetailProps | null>(null);
  const [dataRecommendation, setDataRecommendation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModalTrailer, setOpenModalTrailer] = useState(false);

  // Fetch API Functions
  const getDataDetail = async () => {
    try {
      const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
      const data = await res.json();

      setDataDetail(data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getDataRecommendation = async () => {
    try {
      const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/recommendations`);
      const data = await res.json();

      setDataRecommendation(data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Event Handler Function
  const handleAddFavorite = () => {
    if (dataDetail) favoriteStore?.addFavorite(dataDetail);
  };

  const handleRemoveFavorite = () => {
    favoriteStore?.removeFavorite(Number(id));
  };

  // Use Effects
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await Promise.all([getDataDetail(), getDataRecommendation()]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <SkeletonDetailAnime />;
  if (!loading && !dataDetail) return <NoData />;

  return (
    <Box padding="25px">
      <Stack direction="column" gap={5}>
        <Grid2 container spacing={2} display="flex" justifyContent="center">
          <Grid2 size="auto" minWidth="225px" width={{ xs: "70%", sm: "50%", md: "22%" }}>
            <Box
              sx={{
                position: "relative",
                paddingBottom: "140%",
                border: `1px solid ${neutralDark[500]}`,
                borderRadius: "6px",
              }}
            >
              {loading ? (
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height="100%"
                  sx={{ position: "absolute" }}
                />
              ) : (
                <Image
                  width={0}
                  height={0}
                  alt="Anime Cover"
                  loader={() => dataDetail?.images?.webp?.large_image_url || ""}
                  src={dataDetail?.images?.webp?.large_image_url || ""}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                  }}
                />
              )}
            </Box>
            {dataDetail?.trailer?.url && (
              <SwButton
                fullWidth
                loading={loading}
                color="tertiary"
                startIcon={<SmartDisplayOutlined />}
                sx={{ marginTop: 1 }}
                onClick={() => setOpenModalTrailer(true)}
              >
                Watch Trailer
              </SwButton>
            )}
            {isAnimeFavorited ? (
              <SwButton
                fullWidth
                loading={loading}
                variant="outlined"
                color="error"
                startIcon={<FavoriteBorder />}
                sx={{ marginTop: 1 }}
                onClick={handleRemoveFavorite}
              >
                Remove from Favorites
              </SwButton>
            ) : (
              <SwButton
                fullWidth
                loading={loading}
                variant="outlined"
                startIcon={<Favorite />}
                sx={{ marginTop: 1 }}
                onClick={handleAddFavorite}
              >
                Add to Favorites
              </SwButton>
            )}
          </Grid2>
          <Grid2 size={{ xs: 12, md: "grow" }}>
            <Box width="100%">
              <Grid2 container spacing={1}>
                <Grid2 size={{ xs: 12, md: 9 }}>
                  <SwTypography
                    semiBold
                    fontSize={30}
                    color={neutralDark[400]}
                    textAlign={isMdDown ? "center" : "left"}
                  >
                    {dataDetail?.title}
                  </SwTypography>
                  {dataDetail?.title !== dataDetail?.title_japanese && (
                    <SwTypography
                      big
                      semiBold
                      color={neutralDark[200]}
                      textAlign={isMdDown ? "center" : "left"}
                    >
                      {dataDetail?.title_japanese}
                    </SwTypography>
                  )}
                </Grid2>
                <Grid2
                  size={{ xs: 12, md: 3 }}
                  display="flex"
                  alignItems="center"
                  justifyContent={{ xs: "center", md: "flex-end" }}
                >
                  <Stack direction="column" gap={1} alignItems="center">
                    <Rating
                      readOnly
                      size="large"
                      precision={0.1}
                      value={Number(((Number(dataDetail?.score) * 5) / 10).toFixed(1))}
                      style={{ maxWidth: 180 }}
                    />
                    <SwTypography small textAlign="center" sx={{ width: "100%" }}>
                      Score: {dataDetail?.score || "-"}
                    </SwTypography>
                  </Stack>
                </Grid2>
                <Grid2 size={12}>
                  <SwTypography semiBold>Synopsis :</SwTypography>
                  <SwTypography textAlign="justify">{dataDetail?.synopsis}</SwTypography>
                </Grid2>
                <Grid2 size={12}>
                  <SwTypography>Year Release: {dataDetail?.year || "-"}</SwTypography>
                </Grid2>
              </Grid2>
            </Box>
          </Grid2>
        </Grid2>

        {dataRecommendation?.length > 0 && (
          <SuggestionSection data={dataRecommendation} loading={loading} />
        )}
      </Stack>

      <SwModal
        hideAction
        closeOnBackdropClick
        open={openModalTrailer}
        onClose={() => setOpenModalTrailer(false)}
      >
        <ReactPlayer
          controls
          url={dataDetail?.trailer?.url}
          width="100%"
          height="60vh"
          config={{
            youtube: {
              playerVars: { showinfo: 1 },
            },
          }}
        />
      </SwModal>
    </Box>
  );
}

const SkeletonDetailAnime = () => (
  <Box padding="25px">
    <Stack direction="column" gap={5}>
      <Grid2 container spacing={2} display="flex" justifyContent="center">
        <Grid2 size="auto" minWidth="225px" width={{ xs: "70%", sm: "50%", md: "22%" }}>
          <Box
            sx={{
              position: "relative",
              paddingBottom: "140%",
              borderRadius: "6px",
            }}
          >
            <Skeleton
              variant="rectangular"
              width="100%"
              height="100%"
              sx={{ position: "absolute" }}
            />
          </Box>
          <Skeleton variant="text" width="100%" height={40} />
        </Grid2>
        <Grid2 size={{ xs: 12, md: "grow" }}>
          <Box width="100%">
            <Grid2 container spacing={1}>
              <Grid2 size={{ xs: 12, md: 9 }}>
                <Skeleton
                  variant="text"
                  width="70%"
                  height={40}
                  sx={{
                    justifySelf: { xs: "center", md: "start" },
                  }}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, md: 3 }}>
                <Skeleton
                  variant="text"
                  height={40}
                  sx={{ justifySelf: { xs: "center", md: "end" }, width: { xs: "30%", md: "70%" } }}
                />
              </Grid2>
              <Grid2 size={12}>
                <Skeleton variant="text" width={50} height={24} />
                <Skeleton variant="text" width="90%" height={24} />
                <Skeleton variant="text" width="100%" height={24} />
                <Skeleton variant="text" width="90%" height={24} />
                <Skeleton variant="text" width="95%" height={24} />
                <Skeleton variant="text" width="70%" height={24} />
              </Grid2>
            </Grid2>
          </Box>
        </Grid2>
      </Grid2>
      <SuggestionSection loading={true} />
    </Stack>
  </Box>
);
