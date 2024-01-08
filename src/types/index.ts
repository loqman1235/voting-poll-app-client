interface IVote {
  option: string;
  votes: number;
  percentage: number;
}

export interface IPoll {
  _id: string;
  question: string;
  options: string[];
  votes: IVote[];
}

export interface PollOptionProps {
  id: number;
  label: string;
  percentage: number;
  isActive: boolean;
  onToggle: (id: number) => void;
}
