import { useState } from "react";
import { PollOption } from "./PollOption";
import { IPoll } from "../types";

const PollCard: React.FC<IPoll> = ({ question, votes }) => {
  const [activeOption, setActiveOption] = useState<number | null>(null);

  const handleOptionToggle = (id: number) => {
    setActiveOption(id === activeOption ? null : id);
  };
  return (
    <div className="min-w-[540px] p-6 bg-white shadow rounded-sm">
      <h1 className="font-semibold text-xl mb-5 pb-5 border-b border-b-neutral-200">
        {question}
      </h1>

      {/* Options */}
      <div className="w-full flex flex-col gap-5">
        {votes.map((vote, i) => (
          <PollOption
            key={i}
            id={i}
            label={vote.option}
            percentage={vote.percentage}
            onToggle={handleOptionToggle}
            isActive={i === activeOption}
          />
        ))}
      </div>
    </div>
  );
};
export default PollCard;
