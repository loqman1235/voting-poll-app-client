export interface IVote {
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
  hasPollEnded: boolean;
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

export interface IApiError {
  response: {
    data: {
      message: string;
    };
  };
}
