import { Snackbar, Alert, AlertTitle, Slide, type SlideProps } from "@mui/material";
import { useNotification } from "../../context/notification";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

const NotificationSnackbar = () => {
  const { notification, hideNotification } = useNotification();

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    hideNotification();
  };

  const getSeverityTitle = (severity: string) => {
    switch (severity) {
      case 'error':
        return 'Error';
      case 'warning':
        return 'Warning';
      case 'success':
        return 'Success';
      case 'info':
      default:
        return 'Information';
    }
  };

  return (
    <Snackbar
      open={notification.open}
      autoHideDuration={notification.autoHideDuration}
      onClose={handleClose}
      TransitionComponent={SlideTransition}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      sx={{
        '& .MuiSnackbarContent-root': {
          minWidth: '300px',
        },
      }}
    >
      <Alert
        onClose={handleClose}
        severity={notification.severity}
        variant="filled"
        sx={{
          width: '100%',
          '& .MuiAlert-message': {
            display: 'flex',
            flexDirection: 'column',
            gap: 0.5,
          },
        }}
      >
        <AlertTitle sx={{ margin: 0, fontWeight: 600 }}>
          {getSeverityTitle(notification.severity)}
        </AlertTitle>
        {notification.message}
      </Alert>
    </Snackbar>
  );
};

export default NotificationSnackbar;