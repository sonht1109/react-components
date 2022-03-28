import { ReactNode } from "react";

export interface TabProps {
  tabTitle: string[];
  tabContent: ReactNode[];
  defaultTab?: number;
  onTabChange?: (tab: number) => void;
}

export interface TabControlProps {
  currentTab: number;
  onChange: (tab: number) => void;
  tabTitle: string[];
}

export interface TabContentProps {
  currentTab: number;
  tabContent: ReactNode[];
}

export interface TabRect {
  x: number;
  width: number;
}