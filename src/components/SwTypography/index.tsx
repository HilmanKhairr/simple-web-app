import { SxProps, Theme, Typography } from "@mui/material";
import { FC, ReactNode } from "react";

interface SwTypographyProps {
  big?: boolean;
  bold?: boolean;
  children: ReactNode;
  color?: string;
  fontSize?: number | string;
  fontWeight?: number;
  small?: boolean;
  semiBold?: boolean;
  sx?: SxProps<Theme>;
  textAlign?: "left" | "center" | "right" | "justify";
}

const SwTypography: FC<SwTypographyProps> = ({
  big = false,
  bold = false,
  children,
  color = "inherit",
  fontSize,
  fontWeight,
  small = false,
  semiBold = false,
  sx,
  textAlign,
  ...props
}): ReactNode => {
  return (
    <Typography
      textOverflow="ellipsis"
      fontSize={fontSize}
      textAlign={textAlign}
      sx={{
        color: color,
        whiteSpace: "pre-line",
        wordBreak: "break-word",
        fontSize: big ? "24px" : small ? "14px" : fontSize ? fontSize : "16px",
        fontWeight: bold ? "800" : semiBold ? "600" : fontWeight ? fontWeight : "400",
        ...sx,
      }}
      {...props}
    >
      {children}
    </Typography>
  );
};

export default SwTypography;
