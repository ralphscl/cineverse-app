import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Components
import Layout from "../../Layout";

// Lazy-load your pages/components
const HomePage = lazy(() => import("../../pages/HomePage"));
const TvListPage = lazy(() => import("../../pages/tv/TvListPage"));
const TvPage = lazy(() => import("../../pages/tv/TvPage"));

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading Components...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/tv" element={<TvListPage />} />
            <Route path="/tv/:slug" element={<TvPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
