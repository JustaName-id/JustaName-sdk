"use client";

import React from 'react';

/**
 * A custom React hook to determine if a component has been mounted.
 *
 * @returns {boolean} A boolean flag indicating whether the component is currently mounted.
 */
export const useMounted = () => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);


  return mounted;
}