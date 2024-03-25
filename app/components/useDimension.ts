"use client";

import { useState } from "react";
import { useEffect } from "react";
import { useLayoutEffect } from "react";

export const useDimensions = (targetRef: React.RefObject<HTMLDivElement>) => {

  const getDimensions = () => {
    return {
      width: targetRef.current ? targetRef.current.offsetWidth : 0,
      height: targetRef.current ? targetRef.current.offsetHeight : 0
    };
  };

  const [dimensions, setDimensions] = useState(getDimensions);

  const handleResize = () => {
    const newDimensions = getDimensions();
    console.log("New dimensions: " + newDimensions.width + " " + newDimensions.height)
    setDimensions(newDimensions);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [targetRef.current]);

  useLayoutEffect(() => {
    handleResize();
  }, [targetRef.current]);


  return dimensions;
}