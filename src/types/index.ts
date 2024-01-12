interface IVote {
  option: string;
  votes: number;
  percentage: number;
}

export interface IPoll {
  _id: string;
  question: string;
  options: string[];
  votes: number[];
  percentage: number[];
  endsAt?: string;
}

export interface PollOptionProps {
  id: number;
  label: string;
  percentage: number | undefined;
  isActive: boolean;
  onToggle: (id: number) => void;
  isPollEnded: boolean;
}

export interface ITotalVotes {
  _id: string;
  total: number;
}

export interface IPollsState {
  polls: IPoll[];
  totalVotes: ITotalVotes[];
  isLoading: boolean;
  error: string | null;
}
