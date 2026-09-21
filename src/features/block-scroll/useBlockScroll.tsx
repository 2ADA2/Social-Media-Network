import { useEffect, useState } from "react";

export const useBlockScroll = () => {
  const [block, setBlock] = useState(false);

  useEffect(() => {
    if (block) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflowY = "auto";
    }

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [block]);

  const blockScroll = () => setBlock(true);
  const unblockScroll = () => setBlock(false);

  return { blockScroll, unblockScroll };
};
