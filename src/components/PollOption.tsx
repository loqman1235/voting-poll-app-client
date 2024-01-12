import { PollOptionProps } from "../types";

export const PollOption: React.FC<PollOptionProps> = ({
  id,
  label,
  percentage,
  isActive,
  onToggle,
  isPollEnded,
}) => {
  const handleOptionClick = () => {
    onToggle(id);
  };

  return (
    <div
      className={`w-full flex flex-col gap-2 p-3 border rounded-xl cursor-pointer ${
        isActive ? "border-emerald-500 " : " border-neutral-200"
      } ${isPollEnded ? "cursor-not-allowed !border-none !py-3 !px-0" : ""}`}
      onClick={handleOptionClick}
    >
      <div className="w-full flex items-center justify-between font-medium text-lg">
        <div className="flex items-center gap-2">
          <div
            className={`w-4 h-4 cursor-pointer rounded-full border-2  flex items-center justify-center ${
              isActive ? "border-emerald-500" : "border-neutral-300"
            } ${isPollEnded && "hidden"}`}
          >
            {isActive && (
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            )}
          </div>
          <h4 className="font-normal">{label}</h4>
        </div>
        <span className="text-neutral-400 font-normal">{percentage}%</span>
      </div>
      <div className="w-full bg-neutral-200 rounded-full h-2 relative overflow-hidden">
        <div
          style={{ width: percentage + "%" }}
          className={`absolute left-0 bg-emerald-500 h-full rounded-full animate_progress transition-[width]`}
        ></div>
      </div>
    </div>
  );
};
