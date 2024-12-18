import React, { useState, useEffect } from 'react';

// Enum and type definitions (equivalent to your original types)
enum ShiftType {
  Nachtschicht = 'N',
  Tagschicht = 'T',
  Frei1 = 'F1',
  Frei2 = 'F2'
}

const ShiftSchedule: React.FC = () => {
  // Base date for cycle calculation
  const BASE_DAY = new Date("2024-01-01").getDate();

  // State to manage the current date
  const [newDate, setNewDate] = useState(() => {
    // Initialize from localStorage, parse the date
    const storedDateString = localStorage.getItem('selectedDate');
    if (storedDateString) {
      // Parse the date and calculate the offset from the base date
      const storedDate = new Date(storedDateString);
      const baseDate = new Date("2024-01-01");

      // Calculate the difference in days
      const timeDiff = storedDate.getTime() - baseDate.getTime();
      const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

      return daysDiff;
    }
    return 0;
  });

  // Effect to set up periodic localStorage check
  useEffect(() => {
    // Function to check and update date from localStorage
    const checkLocalStorageDate = () => {
      const storedDateString = localStorage.getItem('selectedDate');
      if (storedDateString) {
        const storedDate = new Date(storedDateString);
        const baseDate = new Date("2024-01-01");

        // Calculate the difference in days
        const timeDiff = storedDate.getTime() - baseDate.getTime();
        const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

        // Only update if the calculated date is different from current state
        if (daysDiff !== newDate) {
          setNewDate(daysDiff);
        }
      }
    };

    // Initial check
    checkLocalStorageDate();

    // Set up interval to periodically check localStorage
    const intervalId = setInterval(checkLocalStorageDate, 100); // Check every second

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [newDate]); // Re-run if newDate changes

  // Function to get shift value or color
  const getVal = (drift: number, forColor: boolean): ShiftType | "-" => {
    const cycleIndex4 = (BASE_DAY + newDate - 1) % 4;
    const currentShift = shifts[(cycleIndex4 + drift) % 4];

    return (currentShift === ShiftType.Frei1 || currentShift === ShiftType.Frei2) && !forColor
      ? "-"
      : currentShift;
  };

  // Shifts array (preserving original order)
  const shifts: ShiftType[] = [
    ShiftType.Nachtschicht,  // A
    ShiftType.Frei1,         // B
    ShiftType.Frei2,         // D
    ShiftType.Tagschicht     // C
  ];

  return (
    <div className="w-full max-w-md mx-auto p-5 bg-gray-100 dark:bg-gray-900 rounded-lg text-center">
      <div className="flex justify-center space-x-0 gap-2 mb-1">
        <div className="shift-cell p-2 font-bold bg-white dark:bg-black dark:text-white rounded-lg text-center cursor-pointer flex-1">A</div>
        <div className="shift-cell p-2 font-bold bg-white dark:bg-black dark:text-white rounded-lg text-center cursor-pointer flex-1">B</div>
        <div className="shift-cell p-2 font-bold bg-white dark:bg-black dark:text-white rounded-lg text-center cursor-pointer flex-1">C</div>
        <div className="shift-cell p-2 font-bold bg-white dark:bg-black dark:text-white rounded-lg text-center cursor-pointer flex-1">D</div>
      </div>
      <div className="flex justify-center space-x-0 gap-2 mt-1">
        <div
          className={`shift-cell text-white font-extrabold p-2 rounded-lg text-center cursor-pointer flex-1 bg-green-500`}
        >
          {getVal(0, false)}
        </div>
        <div
          className={`shift-cell text-white font-extrabold p-2 rounded-lg text-center cursor-pointer flex-1 bg-red-500`}
        >
          {getVal(1, false)}
        </div>
        <div
          className={`shift-cell text-white font-extrabold p-2 rounded-lg text-center cursor-pointer flex-1 bg-blue-400`}
        >
          {getVal(3, false)}
        </div>
        <div
          className={`shift-cell text-white font-extrabold p-2 rounded-lg text-center cursor-pointer flex-1 bg-yellow-400`}
        >
          {getVal(2, false)}
        </div>
      </div>
    </div>
  );
};

export default ShiftSchedule;