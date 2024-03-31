"use client";

import React, { useState, ChangeEvent, FocusEvent, KeyboardEvent } from "react";

interface YearTitleProps {
  year: number;
  onYearChange: (newYear: number) => void;
}

// I created this component to handle the non click-by-click year change on holidays table.
const YearTitle: React.FC<YearTitleProps> = ({ year, onYearChange }) => {
  const [editingYear, setEditingYear] = useState<number | null>(year);

  const handleYearChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEditingYear(Number(event.target.value));
  };

  const handleBlur = () => {
    if (editingYear !== null) {
      onYearChange(editingYear);
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleBlur();
    }
  };

  return (
    <input
      type="number"
      value={editingYear === null ? "" : editingYear}
      onChange={handleYearChange}
      onBlur={handleBlur}
      onKeyPress={handleKeyPress}
      className="bg-transparent border border-white text-center text-3xl font-marck"
    />
  );
};

export default YearTitle;
