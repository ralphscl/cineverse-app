import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// CSS
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/series");
  }, [navigate]);

  return null;
};

export default HomePage;
