import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Components
import Layout from "../../Layout";

// Lazy-load your pages/components
const HomePage = lazy(() => import("../../pages/HomePage"));
const TvShowsPage = lazy(() => import("../../pages/TvShowsPage"));
const TvShowPage = lazy(() => import("../../pages/TvShowPage"));

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/tv" element={<TvShowsPage />} />
            <Route path="/tv/:slug" element={<TvShowPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
