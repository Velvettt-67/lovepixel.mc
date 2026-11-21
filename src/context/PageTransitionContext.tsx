import React, { useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PageTransitionContext } from './PageTransitionDefinition';

export const PageTransitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [homeTransitionKey, setHomeTransitionKey] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const triggerHomeReturn = useCallback(() => {
    // 1. Immediately reset viewport scroll to top
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // 2. Navigate to '/' if not already there, or if currently on a hash anchor
    if (location.pathname !== '/' || location.hash) {
      navigate('/', { replace: false });
    }

    // 3. Increment transition key to trigger the cinematic upward glide animation
    setHomeTransitionKey((prev) => prev + 1);

    // 4. Ensure scroll position stays at top on subsequent paint tick
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    });
  }, [location.pathname, location.hash, navigate]);

  return (
    <PageTransitionContext.Provider
      value={{
        homeTransitionKey,
        triggerHomeReturn,
      }}
    >
      {children}
    </PageTransitionContext.Provider>
  );
};
