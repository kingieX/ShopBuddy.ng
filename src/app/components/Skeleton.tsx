// components/ui/Skeleton.tsx
import React from 'react';

const Skeleton = ({ width = "100%", height = "20px" }) => {
  return (
    <div
      className="animate-pulse bg-gray-300 rounded"
      style={{ width, height }}
    ></div>
  );
};

export default Skeleton;
