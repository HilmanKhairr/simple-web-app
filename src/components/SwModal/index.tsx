import { SaveOutlined } from "@mui/icons-material";
import { Breakpoint, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import SwButton from "../SwButton";
import SwTypography from "../SwTypography";

interface SwModalProps {
  children?: React.ReactNode;
  closeOnBackdropClick?: boolean;
  disabledYes?: boolean;
  hideAction?: boolean;
  labelYes?: string;
  labelNo?: string;
  loading?: boolean;
  open: boolean;
  size?: false | Breakpoint;
  title?: string;
  titleComponent?: React.ReactNode;
  onClose?: () => void;
  onConfirm?: () => void;
}

const SwModal: React.FC<SwModalProps> = ({
  children,
  closeOnBackdropClick = false,
  disabledYes = false,
  hideAction,
  labelYes = "Simpan",
  labelNo = "Tutup",
  loading,
  open,
  size = "md",
  title,
  titleComponent,
  onClose,
  onConfirm,
  ...props
}) => {
  return (
    <Dialog
      fullWidth
      open={open}
      maxWidth={size}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      onClose={(_, reason) => {
        if (reason && reason === "backdropClick" && !closeOnBackdropClick) return;
        if (onClose instanceof Function) onClose();
      }}
      {...props}
    >
      {(title || titleComponent) && (
        <DialogTitle id="draggable-dialog-title">
          {titleComponent ? (
            titleComponent
          ) : (
            <SwTypography big bold>
              {title}
            </SwTypography>
          )}
        </DialogTitle>
      )}
      <DialogContent>{children}</DialogContent>
      {!hideAction && (
        <DialogActions sx={{ justifyContent: "flex-end !important" }}>
          {onClose instanceof Function && (
            <SwButton color="primary" variant="outlined" loading={!!loading} onClick={onClose}>
              {labelNo}
            </SwButton>
          )}
          {onConfirm instanceof Function && (
            <SwButton
              color="success"
              loading={!!loading}
              disabled={disabledYes}
              startIcon={<SaveOutlined />}
              onClick={onConfirm}
            >
              {labelYes}
            </SwButton>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default SwModal;
