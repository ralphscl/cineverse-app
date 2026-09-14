import { Suspense, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useOutlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import BackToTop from "./components/backToTop/BackToTop";
import ScrollToTop from "./components/router/ScrollToTop";
import { CineverseLoader } from "./components/loading/PageSkeleton";
import "./Layout.css";

const RouteLoader = ({ onLoadingChange }) => {
  useEffect(() => {
    onLoadingChange(true);
    return () => onLoadingChange(false);
  }, [onLoadingChange]);

  return <CineverseLoader className="route-loader" label="Preparing the next reel" />;
};

const Layout = () => {
  const location = useLocation();
  const outlet = useOutlet();
  const [isRouteLoading, setIsRouteLoading] = useState(false);

  return (
    <>
      <BackToTop />
      <ScrollToTop />

      <Navbar isRouteLoading={isRouteLoading} />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          className="route-stage"
          initial={{ opacity: 0, x: 28, filter: "blur(8px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, x: -22, filter: "blur(6px)" }}
          transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
        >
          <Suspense fallback={<RouteLoader onLoadingChange={setIsRouteLoading} />}>
            {outlet}
          </Suspense>
        </motion.div>
      </AnimatePresence>

      <Footer />
    </>
  );
};

export default Layout;
