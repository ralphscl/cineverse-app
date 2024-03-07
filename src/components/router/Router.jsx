import { BrowserRouter, Routes, Route } from "react-router-dom";
// Components
import Layout from "../../Layout";
import HomePage from "../../pages/HomePage";
import ListingPage from "../../pages/ListingPage";
import ShowPage from "../../pages/ShowPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/tv" element={<ListingPage />} />
          <Route path="/tv/:slug" element={<ShowPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
