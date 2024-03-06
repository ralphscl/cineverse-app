import { BrowserRouter, Routes, Route } from "react-router-dom";
// Components
import Layout from "../../Layout";
import Homepage from "../../pages/Homepage";
import ShowPage from "../../pages/ShowPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/tv" element={<ShowPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
