"use client";

import React from 'react';
import { useSubname } from '@justaname.id/react';

export interface SubnameProps {
  currentSubname: string;
}
export const Subname: React.FC<SubnameProps> = ({ currentSubname }) => {
  const { subname } = useSubname({
    subname: currentSubname
  })


  if (!subname) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <p>{subname?.subname}</p>
    </div>
  )
}