export interface PaginationProps {
  total: number;
  current: number;
  size?: number;
  onChange?: (page: number) => void;
  delta?: number;
  hideOnSinglePage?: boolean;
  className?: string;
}