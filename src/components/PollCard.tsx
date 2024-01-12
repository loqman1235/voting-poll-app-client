import { useState } from "react";
import { PollOption } from "./PollOption";
import { IPoll, IPollsState, ITotalVotes } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { votePollAsync } from "../features/pollSlice";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../app/store";
// import { votePollAsync } from "../features/pollSlice";

const PollCard: React.FC<IPoll> = ({
  _id,
  question,
  options,
  votes,
  endsAt,
}) => {
  const [activeOption, setActiveOption] = useState<number | null>(() => {
    const storedActiveOption = localStorage.getItem("activeOption");
    return storedActiveOption ? parseInt(storedActiveOption) : null;
  });

  // check if the poll has ended
  const isPollEnded = endsAt ? new Date(endsAt) < new Date() : false;

  const { totalVotes } = useSelector<RootState, IPollsState>(
    (state) => state.polls
  );

  const targetTotalVotes: ITotalVotes | undefined = totalVotes.find(
    (total) => total._id === _id
  );
  const percentages = votes.map((vote) => {
    if (targetTotalVotes) {
      return vote !== 0
        ? Number(((vote * 100) / targetTotalVotes.total).toFixed(0))
        : 0;
    }
  });

  const dispatch = useDispatch<AppDispatch>();

  console.log(isPollEnded, "poll ended?");

  const handleOptionToggle = async (id: number) => {
    try {
      if (id !== activeOption) {
        await dispatch(votePollAsync({ pollId: _id, option: id.toString() }));
      }

      setActiveOption(id === activeOption ? null : id);
      localStorage.setItem("activeOption", id.toString());
    } catch (error) {
      console.error("Error voting:", error);
    }
  };
  return (
    <div className="min-w-[540px] p-6 bg-white shadow rounded-2xl">
      <h1 className="font-semibold text-xl mb-5 pb-5 border-b border-b-neutral-200">
        {question}
      </h1>

      {/* Options */}
      <div className="w-full flex flex-col gap-5">
        {options.map((option, i) => (
          <PollOption
            key={i}
            id={i}
            label={option}
            percentage={percentages[i]}
            onToggle={handleOptionToggle}
            isActive={i === activeOption}
            isPollEnded={isPollEnded}
          />
        ))}
      </div>

      {/* Total Votes */}
      <div className="w-full flex items-center justify-between">
        <p className="text-neutral-500 text-sm mt-5">
          Total Votes: {targetTotalVotes?.total}
        </p>
      </div>
    </div>
  );
};
export default PollCard;
