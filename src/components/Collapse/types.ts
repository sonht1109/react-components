import { ReactNode } from "react";

export interface CollapseProps {
  isOpen: boolean;
  transition?: string;
  children: ReactNode;
}