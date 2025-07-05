import { useState, useCallback, type ReactNode } from "react";
import { AlertColor } from "@mui/material";
import { NotificationContext, NotificationState } from "./notification-context";

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<NotificationState>({
    open: false,
    message: "",
    severity: "info",
    autoHideDuration: 6000,
  });

  const showNotification = useCallback(
    (
      message: string,
      severity: AlertColor = "info",
      autoHideDuration: number = 6000
    ) => {
      setNotification({
        open: true,
        message,
        severity,
        autoHideDuration,
      });
    },
    []
  );

  const hideNotification = useCallback(() => {
    setNotification((prev) => ({
      ...prev,
      open: false,
    }));
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notification,
        showNotification,
        hideNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};