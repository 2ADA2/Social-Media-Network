import { useEffect } from 'react';

export const useBlockScroll = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, []);
};
