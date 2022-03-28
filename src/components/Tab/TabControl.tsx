import classNames from "classnames";
import React, { Children, MouseEvent, useEffect, useRef } from "react";
import { TabControlProps, TabRect } from ".";

const getActivePoint = (domRectParent: DOMRect, domRect: DOMRect): TabRect => {
  return {
    x: domRect.x - domRectParent.x,
    width: domRect.width,
  };
};

export default function TabControl(props: TabControlProps) {
  const { currentTab, tabTitle, onChange } = props;
  const refParent = useRef<HTMLDivElement>(null);
  const refActive = useRef<HTMLDivElement>(null);

  const onClick = (e: MouseEvent) => {
    const selectedTab = (e.target as HTMLElement).getAttribute("data-tab");
    if (Number(selectedTab) !== currentTab) {
      onChange(Number(selectedTab));
    }
  };

  useEffect(() => {
    const currentTabElement = document.getElementById(
      "tab__control__item--" + currentTab
    );
    if (currentTabElement) {
      const domRect = currentTabElement.getBoundingClientRect();
      const domRectParent = refParent.current?.getBoundingClientRect();
      if (domRectParent && refActive.current) {
        const point = getActivePoint(domRectParent, domRect);
        refActive.current.style.left = point.x + 'px';
        refActive.current.style.width = point.width + 'px';
      }
    }
  }, [currentTab]);

  return (
    <div className="tab__control" ref={refParent}>
      <div className="tab__control__active" ref={refActive}></div>
      {Children.toArray(
        tabTitle.map((t: string, i: number) => (
          <div
            id={`tab__control__item--` + i}
            className={classNames("tab__control__item", {
              active: currentTab === i,
            })}
            data-tab={i}
            onClick={onClick}
            style={{ width: (i + 1) * 100 }}
          >
            {t}
          </div>
        ))
      )}
    </div>
  );
}
