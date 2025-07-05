import "./App.css";
import MainPage from "./pages/main-page/main-page";
import ErrorBoundary from "./components/error-boundary/error-boundary";

function App() {
  return (
    <ErrorBoundary>
      <MainPage />
    </ErrorBoundary>
  );
}

export default App;