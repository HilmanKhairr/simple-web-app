import {
  Box,
  FormControl,
  FormHelperText,
  InputAdornment,
  TextField,
  Theme,
  useTheme,
} from "@mui/material";
import React, { FC, KeyboardEventHandler, ReactNode } from "react";
import SwTypography from "../SwTypography";

interface SwTextFieldProps {
  disabled?: boolean;
  endIcon?: string | number | ReactNode;
  error?: boolean;
  fullWidth?: boolean;
  helperText?: string;
  helperTextVisibility?: "initial" | "hidden";
  hideLabel?: boolean;
  isTextArea?: boolean;
  label?: string;
  maxLength?: number;
  name?: string;
  numberOnly?: boolean;
  placeholder?: string;
  required?: boolean;
  size?: "small" | "medium";
  startIcon?: string | number | ReactNode;
  type?: string;
  value?: string;
  variant?: "outlined" | "filled" | "standard";
  onBlur?: () => void;
  onChange?: (value: string) => void;
  onEnter?: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const SwTextField: FC<SwTextFieldProps> = ({
  disabled = false,
  endIcon,
  error = false,
  fullWidth = true,
  helperText = "",
  helperTextVisibility = "initial",
  hideLabel = false,
  isTextArea = false,
  label,
  maxLength = 255,
  name,
  numberOnly = false,
  placeholder,
  required,
  size = "small",
  startIcon,
  type,
  value = "",
  variant = "outlined",
  onBlur = () => {},
  onChange = () => {},
  onEnter = () => {},
  ...props
}): ReactNode => {
  const theme: Theme = useTheme();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const tempValue = event.target.value;
    if (maxLength) {
      onChange(tempValue.toString().slice(0, maxLength));
    } else {
      onChange(event.target.value);
    }
  };

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (ev) => {
    if (ev.key === "Enter") {
      return onEnter();
    }

    const allowKey: string[] = [
      "Backspace",
      "Delete",
      "ArrowDown",
      "ArrowUp",
      "ArrowRight",
      "ArrowLeft",
      "Tab",
    ];
    if (allowKey.includes(ev?.key)) {
      return;
    }

    if (type === "number") {
      const NUMBER_REGEX: RegExp = numberOnly ? /^[0-9]+$/ : /^[0-9,]+$/;
      if (!NUMBER_REGEX.test(ev?.key)) {
        ev?.preventDefault();
      }
    } else if (numberOnly) {
      const NUMBER_REGEX: RegExp = /^[0-9]+$/;
      if (!NUMBER_REGEX.test(ev?.key)) {
        ev?.preventDefault();
      }
    }
  };

  return (
    <Box>
      <FormControl variant="standard" fullWidth={fullWidth}>
        {!hideLabel && (
          <SwTypography semiBold small sx={{ marginBottom: "4px" }}>
            {label} {required && <span style={{ color: "red" }}>*</span>}
          </SwTypography>
        )}
        <TextField
          label=""
          className="SwTextField"
          autoComplete="off"
          rows={helperTextVisibility === "hidden" ? 4.8 : 4}
          id={name}
          name={name}
          type={type}
          size={size}
          error={error}
          variant={variant}
          disabled={disabled}
          value={value || ""}
          fullWidth={fullWidth}
          multiline={isTextArea}
          {...props}
          slotProps={{
            ...props?.slotProps,
            input: {
              placeholder,
              startAdornment: startIcon && (
                <InputAdornment position="start">{startIcon}</InputAdornment>
              ),
              endAdornment: endIcon && <InputAdornment position="start">{endIcon}</InputAdornment>,
              ...props?.slotProps?.input,
              ...props?.slotProps?.InputProps,
            },
          }}
          onBlur={onBlur}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <FormHelperText
          sx={{
            overflowWrap: "break-word",
            marginLeft: "16px !important",
            visibility: helperText ? "visible" : helperTextVisibility,
            color: error ? theme.palette.error.main : theme.palette.common.black,
          }}
        >
          {helperText || (helperTextVisibility === "hidden" && "hidden_text")}
        </FormHelperText>
      </FormControl>
    </Box>
  );
};

export default SwTextField;
