import { useEffect, useState } from "react";
import PollCard from "./components/PollCard";
import api from "./api/api";
import { IPoll } from "./types";

const App = () => {
  const [polls, setPolls] = useState<IPoll[]>([]);

  const getPolls = async () => {
    try {
      const res = await api.get("/polls");
      if (res.status === 200) {
        setPolls(res.data.polls);
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPolls();
  }, []);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-5">
      {polls.length > 0 &&
        polls.map((poll) => <PollCard key={poll._id} {...poll} />)}
    </div>
  );
};
export default App;
