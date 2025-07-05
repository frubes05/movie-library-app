import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store";
import { GlobalContextProvider } from "./context/global";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <BrowserRouter>
          <GlobalContextProvider>
            <App />
          </GlobalContextProvider>
        </BrowserRouter>
      </Provider>
    </HelmetProvider>
  </StrictMode>
);
