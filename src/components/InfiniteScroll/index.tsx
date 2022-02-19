import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

export default function InfiniteScroll() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);

  const observer = useRef<any>();

  const getData = useCallback(() => {
    setLoading(true);
    fetch("https://dog.ceo/api/breeds/image/random/15")
      .then((res) => {
        return !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json();
      })
      .then((res) => {
        setData((prev: any[]) => [...prev, ...res?.message]);
      })
      .catch((err) => {
        console.error("ERR_IN_FETCHING", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const refLastItem = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          getData();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, getData]
  );

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <SContainer>
      <div className="container">
        {React.Children.toArray(
          data.map((d: string, i: number) => (
            <div
              className="item"
              ref={i + 1 === data.length ? refLastItem : null}
            >
              <img onLoad={e => {
                console.log(e)
              }} loading="lazy" src={d} alt="" />
            </div>
          ))
        )}
      </div>
      {loading && <p style={{ textAlign: "center" }}>Loading ...</p>}
    </SContainer>
  );
}
const SContainer = styled.div`
  max-height: 400px;
  overflow: auto;
  .container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  .item {
    aspect-ratio: 1;
    overflow: hidden;
    & > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
`;
