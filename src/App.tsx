import { useEffect } from "react";
import PollCard from "./components/PollCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./app/store";
import { fetchPollsAsync } from "./features/pollSlice";
import { IPollsState } from "./types";
// import Footer from "./components/Footer";

const App = () => {
  // const [polls, setPolls] = useState<IPoll[]>([]);

  const { polls, isLoading } = useSelector<RootState, IPollsState>(
    (state) => state.polls
  );
  const dispatch = useDispatch<AppDispatch>();
  console.log(polls, "polls");
  useEffect(() => {
    dispatch(fetchPollsAsync());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="w-full h-screen flex  items-center justify-center gap-5">
        {polls.length > 0 &&
          polls.map((poll) => <PollCard key={poll._id} {...poll} />)}
      </div>

      {/* <Footer /> */}
    </>
  );
};
export default App;
