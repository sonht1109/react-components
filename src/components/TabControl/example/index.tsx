import React, { useState } from "react";
import TabControl from "..";

export default function TabExample() {
  const [tab, setTab] = useState<number>(2);

  return (
    <div style={{overflow: 'auto'}}>
      <TabControl
        tabTitle={["1", <div>2nd tab</div>, <span>3nd tab</span>]}
        currentTab={tab}
        onChange={(tab: number) => setTab(tab)}
      />
      <div>Current tab is index {tab}</div>
    </div>
  );
}
