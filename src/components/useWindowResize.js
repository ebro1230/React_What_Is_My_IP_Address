import React, { useState } from "react";

const useWindowResize = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  function findScreenSize() {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }

  return { width, height, findScreenSize };
};

export default useWindowResize;
