"use client";

import assets from "@/assets";
import SwButton from "@/components/SwButton";
import SwTypography from "@/components/SwTypography";
import { Box, Divider, Stack, useMediaQuery, useTheme } from "@mui/material";
import { blue } from "@mui/material/colors";
import Image from "next/image";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const theme = useTheme();
  const router = useRouter();
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="calc(100vh - 64px)"
      padding={5}
    >
      <Stack direction="column">
        <Image
          src={assets.images.search}
          alt="404"
          width={isSmScreen ? 300 : 500}
          style={{ minWidth: 200, marginTop: -100 }}
        />
        <Stack direction="column">
          <Stack direction="row" alignItems="center" gap={1}>
            <SwTypography
              bold
              fontSize={isSmScreen ? 50 : 100}
              color={blue[900]}
              sx={{ minWidth: "max-content" }}
            >
              404
            </SwTypography>
            <Divider flexItem orientation="vertical" sx={{ bgcolor: "black" }} />
            <Stack direction="column" justifyContent="center">
              <SwTypography bold fontSize={isSmScreen ? 25 : 50} color={blue[900]}>
                Not Found
              </SwTypography>
              <SwTypography semiBold fontSize={isSmScreen ? 15 : 25} color={blue[600]}>
                Sorry, we couldn&apos;t find the page you were looking for.
              </SwTypography>
            </Stack>
          </Stack>
        </Stack>
        <SwButton sx={{ marginTop: 2 }} onClick={() => router.push("/")}>
          Back to Main Page
        </SwButton>
      </Stack>
    </Box>
  );
};

export default NotFound;
