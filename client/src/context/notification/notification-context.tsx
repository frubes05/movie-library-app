import { createContext, useContext } from "react";
import { AlertColor } from "@mui/material";

export interface NotificationState {
  open: boolean;
  message: string;
  severity: AlertColor;
  autoHideDuration?: number;
}

export interface NotificationContextType {
  notification: NotificationState;
  showNotification: (
    message: string,
    severity?: AlertColor,
    autoHideDuration?: number
  ) => void;
  hideNotification: () => void;
}

export const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within NotificationProvider");
  }
  return context;
};