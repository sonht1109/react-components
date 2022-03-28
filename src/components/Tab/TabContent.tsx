import React from "react";
import { TabContentProps } from ".";

export default function TabContent(props: TabContentProps) {
  const { currentTab, tabContent } = props;

  return <div className="tab__content">{tabContent[currentTab]}</div>;
}
