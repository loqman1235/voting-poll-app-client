import { useEffect, useState } from "react";
import { PollOptionProps } from "../types";

export const PollOption: React.FC<PollOptionProps> = ({
  id,
  label,
  percentage,
  isActive,
  onToggle,
}) => {
  const [toPercentage, setToPercentage] = useState(0);

  const handleOptionClick = () => {
    onToggle(id);
  };

  useEffect(() => {
    const countToPercentage = setInterval(() => {
      setToPercentage((prev) => {
        if (prev < percentage) {
          return prev + 1;
        } else {
          return prev;
        }
      });
    }, 2);

    return () => clearInterval(countToPercentage);
  }, [percentage]);

  return (
    <div
      className={`w-full flex flex-col gap-2 p-4 border  rounded-md cursor-pointer ${
        isActive ? "border-indigo-500 " : " border-neutral-200"
      }`}
      onClick={handleOptionClick}
    >
      <div className="w-full flex items-center justify-between font-medium text-lg">
        <div className="flex items-center gap-2">
          <div
            className={`w-4 h-4 cursor-pointer rounded-full border-2  flex items-center justify-center ${
              isActive ? "border-indigo-500" : "border-neutral-300"
            }`}
          >
            {isActive && (
              <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
            )}
          </div>
          <h4 className="font-normal">{label}</h4>
        </div>
        <span className="text-neutral-400 font-normal">{toPercentage}%</span>
      </div>
      <div className="w-full bg-neutral-200 rounded-full h-2 relative overflow-hidden">
        <div
          style={{ width: percentage + "%" }}
          className={`absolute left-0 bg-indigo-500 h-full rounded-full animate_progress`}
        ></div>
      </div>
    </div>
  );
};
