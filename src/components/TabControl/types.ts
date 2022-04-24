import { ReactNode } from "react";

export interface TabControlProps {
  currentTab: number;
  onChange: (tab: number) => void;
  tabTitle: ReactNode[];
}
export interface TabRect {
  x: number;
  width: number;
}