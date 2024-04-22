import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Components
import Layout from "../../Layout";

// Lazy-load your pages/components
const SeriesList = lazy(() => import("../../pages/series/SeriesList"));
const SeriesPage = lazy(() => import("../../pages/series/SeriesPage"));
const HomePage = lazy(() => import("../../pages/homepage/HomePage"));
const NotFound = lazy(() => import("../../pages/notfound/NotFound"));

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<section>Loading Components...</section>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/series" element={<SeriesList />} />
            <Route path="/series/:slug" element={<SeriesPage />} />
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
