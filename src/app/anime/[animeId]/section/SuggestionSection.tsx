"use client";

import SwTypography from "@/components/SwTypography";
import { encodeData } from "@/utils/common";
import { Box, Grid2, Skeleton, Stack } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

type SuggestionSectionProps = {
  data?: {
    entry: {
      mal_id: number;
      title: string;
      images: {
        webp: {
          image_url: string;
        };
      };
    };
  }[];
  loading?: boolean;
};

const SuggestionSection = ({ data, loading }: SuggestionSectionProps) => {
  // States and Variables
  const router = useRouter();

  // Event Handler Function
  const handleClickSuggestion = (id: number) => {
    router.push(`/anime/${encodeData(id.toString())}`);
  };

  if (loading) return <SkeletonSuggestionSection />;

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={12}>
        <SwTypography semiBold fontSize={36}>
          Suggestions
        </SwTypography>
      </Grid2>
      <Grid2 size={12} sx={{ overflowX: "auto" }}>
        <Stack direction="row" sx={{ width: "max-content" }} gap={2}>
          {data?.map(
            (item: {
              entry: {
                mal_id: number;
                title: string;
                images: {
                  webp: {
                    image_url: string;
                  };
                };
              };
            }) => (
              <Box
                key={item?.entry?.mal_id}
                width={150}
                borderRadius="6px"
                overflow="hidden"
                sx={{ cursor: "pointer" }}
                onClick={() => handleClickSuggestion(item?.entry?.mal_id)}
              >
                <Box position="relative" paddingBottom="140%">
                  <Image
                    width={0}
                    height={0}
                    alt="Anime Cover"
                    loader={() => item?.entry?.images?.webp?.image_url}
                    src={item?.entry?.images?.webp?.image_url}
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      boxShadow: "inset 0px -40px 40px 0px rgba(0,0,0,1)",
                    }}
                  />
                  <SwTypography
                    fontSize={11}
                    color="white"
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      whiteSpace: "nowrap",
                      maxWidth: "100%",
                      overflow: "hidden",
                      padding: 1,
                    }}
                  >
                    {item?.entry?.title}
                  </SwTypography>
                </Box>
              </Box>
            )
          )}
        </Stack>
      </Grid2>
    </Grid2>
  );
};

const SkeletonSuggestionSection = () => (
  <Grid2 container spacing={2}>
    <Grid2 size={12}>
      <Skeleton variant="text" width={200} height={40} />
    </Grid2>
    <Grid2 size={12} sx={{ overflowX: "auto" }}>
      <Stack direction="row" sx={{ width: "max-content" }} gap={2}>
        {Array.from(new Array(10)).map((_, index) => (
          <Skeleton
            key={index}
            width={150}
            height={200}
            variant="rectangular"
            sx={{ borderRadius: "6px" }}
          />
        ))}
      </Stack>
    </Grid2>
  </Grid2>
);

export default SuggestionSection;
