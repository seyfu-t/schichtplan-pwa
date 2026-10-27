import React, { useState, useEffect } from 'react';

enum ShiftType {
  Nachtschicht = 'N',
  Tagschicht = 'T',
  Frei1 = 'F1',
  Frei2 = 'F2'
}

const ShiftSchedule: React.FC = () => {
  const BASE_DAY = new Date("2024-01-01").getDate();

  // State to manage the current date
  const [newDate, setNewDate] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedDateString = localStorage.getItem('selectedDate');
      if (storedDateString) {
        const storedDate = new Date(storedDateString);
        const baseDate = new Date("2024-01-01");

        const timeDiff = storedDate.getTime() - baseDate.getTime();
        const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

        setNewDate(daysDiff);
      }
    }
  }, []);

  const getVal = (drift: number, forColor: boolean): ShiftType | "-" => {
    const cycleIndex4 = (BASE_DAY + newDate - 1) % 4;
    const currentShift = shifts[(cycleIndex4 + drift) % 4];

    return (currentShift === ShiftType.Frei1 || currentShift === ShiftType.Frei2) && !forColor
      ? "-"
      : currentShift;
  };

  const shifts: ShiftType[] = [
    ShiftType.Nachtschicht,
    ShiftType.Frei1,
    ShiftType.Frei2,
    ShiftType.Tagschicht
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
        <div className={`shift-cell text-white font-extrabold p-2 rounded-lg text-center cursor-pointer flex-1 bg-green-500`}>
          {getVal(0, false)}
        </div>
        <div className={`shift-cell text-white font-extrabold p-2 rounded-lg text-center cursor-pointer flex-1 bg-red-500`}>
          {getVal(1, false)}
        </div>
        <div className={`shift-cell text-white font-extrabold p-2 rounded-lg text-center cursor-pointer flex-1 bg-blue-400`}>
          {getVal(3, false)}
        </div>
        <div className={`shift-cell text-white font-extrabold p-2 rounded-lg text-center cursor-pointer flex-1 bg-yellow-400`}>
          {getVal(2, false)}
        </div>
      </div>
    </div>
  );
};

export default ShiftSchedule;
