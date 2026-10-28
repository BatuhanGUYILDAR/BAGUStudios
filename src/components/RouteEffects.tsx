import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Starts every newly opened page at the top instead of the previous page's scroll position.
function RouteEffects() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

export default RouteEffects;
