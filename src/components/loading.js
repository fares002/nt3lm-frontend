import React from 'react';
import { ClipLoader } from 'react-spinners';

const LoadingComponent = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader color="blue" loading={true} size={70} />
    </div>
  );
};

export default LoadingComponent;
