import React, { Suspense } from "react";

// ** Router Import
import Router from "./router/Router";

// ** React Query Import
import { QueryClientProvider, QueryClient } from "react-query";

const client = new QueryClient({});

const App = () => {
  return (
    <Suspense fallback={null}>
      <QueryClientProvider client={client}>
        <Router />
      </QueryClientProvider>
    </Suspense>
  );
};

export default App;
