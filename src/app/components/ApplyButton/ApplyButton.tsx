'use client';
import React from 'react';
import { useDictionary } from '@/hooks/useDictionary';

export function ApplyButton() {
  const dic = useDictionary();
  return (
    <button
      data-testid="apply-button"
      className="mt-4 px-6 py-2 bg-[#927eec] text-white rounded hover:bg-[#6647f1] transition-colors w-[150px]"
      onClick={() => alert('Good luck!')}
      name="apply-button"
      aria-label="Apply Now"
    >
      {dic?.apply ?? 'Apply Now'}
    </button>
  );
}
