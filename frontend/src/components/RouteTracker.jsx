import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPage } from "../analytics.js";

export default function RouteTracker() {
  const location = useLocation();

  useEffect(() => {
    trackPage(location.pathname + location.search);
  }, [location]);

  return null;
}