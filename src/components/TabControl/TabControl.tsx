import classNames from "classnames";
import React, {
  Children,
  MouseEvent,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import { TabControlProps, TabRect } from ".";
import { STabControl } from "./styles";

const getActivePoint = (domRectParent: DOMRect, domRect: DOMRect): TabRect => {
  return {
    x: domRect.x - domRectParent.x,
    width: domRect.width,
  };
};

const PREFIX_ID = "tab__control__item--";
const ATTR = "data-tab";

export default function TabControl(props: TabControlProps) {
  const { currentTab, tabTitle, onChange } = props;
  const refParent = useRef<HTMLDivElement>(null);
  const refActive = useRef<HTMLDivElement>(null);

  const onClick = (e: MouseEvent) => {
    const selectedTab = (e.currentTarget as HTMLElement).getAttribute(ATTR);
    if (Number(selectedTab) !== currentTab) {
      onChange(Number(selectedTab));
    }
  };

  useEffect(() => {
    const listener = () => {
      const currentTabElement = document.getElementById(PREFIX_ID + currentTab);
      if (currentTabElement) {
        const domRect = currentTabElement.getBoundingClientRect();
        const domRectParent = refParent.current?.getBoundingClientRect();
        if (domRectParent && refActive.current) {
          const point = getActivePoint(domRectParent, domRect);
          refActive.current.style.left = point.x + "px";
          refActive.current.style.width = point.width + "px";
        }
      }
    };

    listener();

    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [currentTab]);

  return (
    <STabControl className="tab__control--container">
      <div className="tab__control" ref={refParent}>
        <div className="tab__control__active" ref={refActive}></div>
        {Children.toArray(
          tabTitle.map((t: ReactNode, i: number) => (
            <div
              id={PREFIX_ID + i}
              className={classNames("tab__control__item", {
                active: currentTab === i,
              })}
              data-tab={i}
              onClick={onClick}
              style={{ width: (i + 1) * 100 }}
              tabIndex={-1}
            >
              {t}
            </div>
          ))
        )}
      </div>
    </STabControl>
  );
}
