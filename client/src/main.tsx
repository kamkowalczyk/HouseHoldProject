import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { SearchContextProvider } from "./context/SearchContext";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { SummaryContextProvider } from "./context/SummaryContext.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <SearchContextProvider>
          <SummaryContextProvider>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
          </SummaryContextProvider>
        </SearchContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
