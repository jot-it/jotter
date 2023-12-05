"use client";
import { useEffect, useState } from "react";

const TICK_SIZE = 25;
const TICK_INTERVAL_DELAY = 100;
const INITIAL_SHOW_DELAY = 250;

function PageLoadingBar() {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(false);

  // Only show loading bar if it takes more than INITIAL_SHOW_DELAY to load
  // This prevents flashing the loading bar when the page is fast
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, INITIAL_SHOW_DELAY);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!show) {
      return;
    }
    const interval = setInterval(() => {
      setProgress((p) => Math.min(p + Math.random() * TICK_SIZE, 100));
    }, TICK_INTERVAL_DELAY);
    return () => {
      clearInterval(interval);
    };
  }, [show]);

  if (!show) {
    return null;
  }

  return (
    <div
      className="fixed left-0 right-0 top-0 z-50 h-1 rounded-r-full bg-cyan-800 transition-transform duration-300 ease-in-out"
      style={{
        transform: `translateX(${-100 + progress}%)`,
      }}
    />
  );
}

export default PageLoadingBar;
