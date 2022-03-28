import React, { useState } from "react";
import { TabProps } from ".";
import { STab } from "./styles";
import TabContent from "./TabContent";
import TabControl from "./TabControl";

export default function Tab(props: TabProps) {
  const { tabContent, tabTitle, defaultTab = 0, onTabChange } = props;

  const [tab, setTab] = useState(defaultTab);

  return (
    <STab>
      <TabControl
        onChange={(tab: number) => {
          setTab(tab);
          onTabChange?.(tab);
        }}
        currentTab={tab}
        tabTitle={tabTitle}
      />
      <TabContent currentTab={tab} tabContent={tabContent} />
    </STab>
  );
}
