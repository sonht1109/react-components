import React, { ImgHTMLAttributes, useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  placeholderSrc: string;
}

const isElementInViewport = (el: HTMLImageElement) => {
  const rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.top <= (window.innerHeight || document.documentElement.clientHeight)
  );
};

export default function LazyImage(props: Props) {
  const [loaded, setLoaded] = useState<boolean>(false);

  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const listener = () => {
      if (ref.current) {
        if (!loaded && isElementInViewport(ref.current)) {
          const imgLoader = new Image();
          imgLoader.src = props.src || "";
          imgLoader.onload = () => {
            ref.current?.setAttribute('src', props.src || '')
            ref.current?.classList.add("opacity");
            setLoaded(false);
          };
        }
      }
    };
    listener();
    window.addEventListener("scroll", listener);
    return () => window.removeEventListener("scroll", listener);
  }, [loaded, props.src]);

  return <SImg ref={ref} alt="" {...props} src={props.placeholderSrc} />;
}

const SImg = styled.img`
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  -webkit-transition: opacity 0.5s ease-in-out;
  -moz-transition: opacity 0.5s ease-in-out;
  &.opacity {
    opacity: 1;
  }
`;
