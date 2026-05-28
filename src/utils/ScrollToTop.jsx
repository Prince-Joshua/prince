import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });

    document.documentElement.scrollTo(0, 0)
    document.body.scrollTo(0,0)
  }, [pathname]);
  return null;
};
