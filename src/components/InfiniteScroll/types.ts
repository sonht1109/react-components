import { CSSProperties, ReactNode } from "react";

export interface InfiniteScrollProps {
  isReverse?: boolean;
  renderChildren: (ref: (node: any) => void) => ReactNode;
  hasMore: boolean;
  fetchMore: () => void;
  loader?: ReactNode;
  containerStyle?: CSSProperties;
  scrollableStyle?: CSSProperties;
}