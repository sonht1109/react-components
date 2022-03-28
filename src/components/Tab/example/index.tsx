import React from "react";
import Tab from "..";

export default function TabExample() {
  return (
    <Tab
      defaultTab={2}
      tabTitle={["1", "2", "3"]}
      tabContent={[<div>1</div>, <div>2</div>, <div>3</div>]}
    />
  );
}
