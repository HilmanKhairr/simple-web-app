"use client";

import assets from "@/assets";
import SwTypography from "@/components/SwTypography";
import { primary } from "@/utils/const/color";
import { Stack } from "@mui/material";
import Image from "next/image";

const NoData = () => {
  return (
    <Stack direction="column" alignItems="center" gap={1}>
      <Image
        width={300}
        alt="not found image"
        src={assets.images.search}
        style={{ minWidth: 200 }}
      />
      <SwTypography big semiBold color={primary[400]}>
        No data found
      </SwTypography>
    </Stack>
  );
};

export default NoData;
