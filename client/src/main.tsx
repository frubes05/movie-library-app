import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store";
import { GlobalContextProvider } from "./context/global";
import { NotificationProvider } from "./context/notification";
import { BrowserRouter } from "react-router-dom";
import NotificationSnackbar from "./components/notification/notification-snackbar";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <NotificationProvider>
          <GlobalContextProvider>
            <App />
            <NotificationSnackbar />
          </GlobalContextProvider>
        </NotificationProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);