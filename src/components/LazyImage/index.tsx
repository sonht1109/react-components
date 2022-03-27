import React, { ImgHTMLAttributes, useEffect, useRef } from "react";
import styled from "styled-components";

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  placeholderSrc: string;
}

export default function LazyImage(props: Props) {
  const ref = useRef<HTMLImageElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();
    if (!ref.current) return;
    const refCurrent = ref.current;
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const imgLoader = new Image();
        imgLoader.src = props.src || "";
        imgLoader.onload = () => {
          refCurrent?.setAttribute("src", props.src || "");
          refCurrent?.classList.add("opacity");
        };
        imgLoader.onerror = () => {
          refCurrent?.setAttribute("src", props.placeholderSrc || "");
          refCurrent?.classList.add("opacity");
        };
        observer.current?.disconnect();
      }
    });
    observer.current.observe(refCurrent);

    return () => {
      if (refCurrent && observer.current) observer.current.disconnect();
    };
  }, [props.src, props.placeholderSrc]);

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
