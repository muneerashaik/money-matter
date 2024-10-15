import React from "react";

const useThrottle = (fn, delay) => {
  let last;
  return function (...args) {
    const now = new Date().getTime();
    if (now - last < delay) return;
    last = now;
    return fn(...args);
  };
};

export default useThrottle;
