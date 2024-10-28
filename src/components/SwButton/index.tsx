import LoadingButton from "@mui/lab/LoadingButton";
import { SxProps, Theme } from "@mui/material";
import { FC, MouseEventHandler, ReactNode } from "react";

type SIZE_TYPE = "small" | "medium" | "large";

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    primaryButton: true;
    secondaryButton: true;
    tertiaryButton: true;
    successButton: true;
    errorButton: true;
    infoButton: true;
    warningButton: true;
    inheritButton: true;
    primaryIconButton: true;
    secondaryIconButton: true;
    tertiaryIconButton: true;
    successIconButton: true;
    errorIconButton: true;
    infoIconButton: true;
    warningIconButton: true;
    inheritIconButton: true;
  }
}

type ButtonColorProps =
  | "primaryButton"
  | "secondaryButton"
  | "tertiaryButton"
  | "successButton"
  | "warningButton"
  | "errorButton"
  | "infoButton"
  | "inheritButton";
type IconButtonColorProps =
  | "primaryIconButton"
  | "secondaryIconButton"
  | "tertiaryIconButton"
  | "successIconButton"
  | "warningIconButton"
  | "errorIconButton"
  | "infoIconButton"
  | "inheritIconButton";

interface LsButtonProps {
  children: ReactNode;
  color?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "success"
    | "warning"
    | "error"
    | "info"
    | "inherit";
  disabled?: boolean;
  fullWidth?: boolean;
  iconOnly?: boolean;
  loading?: boolean;
  radius?: string;
  size?: SIZE_TYPE | number;
  startIcon?: ReactNode;
  sx?: SxProps<Theme>;
  variant?: "contained" | "outlined" | "text";
  onClick?: MouseEventHandler | undefined;
}

const SwButton: FC<LsButtonProps> = ({
  children,
  color = "primary",
  disabled = false,
  fullWidth = false,
  iconOnly = false,
  loading = false,
  radius = "6px",
  size = "medium",
  startIcon,
  sx,
  variant = "contained",
  onClick = () => {},
  ...props
}): ReactNode => {
  const tempColor: ButtonColorProps | IconButtonColorProps = iconOnly
    ? `${color}IconButton`
    : `${color}Button`;
  const tempSizeButton: SIZE_TYPE = typeof size === "number" ? "large" : size;
  const tempSizeIconButton: number =
    {
      small: 32,
      medium: 36,
      large: 40,
    }[size] || (size as number);

  return iconOnly ? (
    <LoadingButton
      color={tempColor}
      variant={variant}
      loading={loading}
      disabled={disabled}
      fullWidth={fullWidth}
      startIcon={children}
      sx={{
        borderRadius: radius,
        height: tempSizeIconButton,
        minWidth: tempSizeIconButton,
        maxWidth: tempSizeIconButton,
        fontSize: "16px",
        fontWeight: "600",
        textTransform: "none",
        "& .MuiButton-startIcon": {
          margin: "0px",
        },
        ...sx,
      }}
      {...props}
      onClick={onClick}
    />
  ) : (
    <LoadingButton
      size={tempSizeButton}
      color={tempColor}
      variant={variant}
      loading={loading}
      disabled={disabled}
      fullWidth={fullWidth}
      startIcon={startIcon}
      sx={{
        borderRadius: radius,
        fontSize: "16px",
        fontWeight: "600",
        textTransform: "none",
        ...sx,
      }}
      onClick={onClick}
      {...props}
    >
      {children}
    </LoadingButton>
  );
};

export default SwButton;
