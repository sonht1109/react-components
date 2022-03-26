import LazyImage from "components/LazyImage";
import { Children, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import InfiniteScroll from "..";

const SItem = styled.div`
  .item {
    overflow: hidden;
    & > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
`;

export default function InfiniteScrollComponent() {
  const [data, setData] = useState<any[]>([]);

  const fetchMore = useCallback(
    () =>
      fetch("https://dog.ceo/api/breeds/image/random/15")
        .then((res) => {
          return !res.ok
            ? res.json().then((e) => Promise.reject(e))
            : res.json();
        })
        .then((res) => {
          setData((prev: any[]) => [...prev, ...res?.message]);
        })
        .catch((err) => {
          console.error("ERR_IN_FETCHING", err);
        }),
    []
  );

  useEffect(() => {
    fetchMore();
  }, [fetchMore]);

  return (
    <InfiniteScroll
      scrollableStyle={{
        maxHeight: 300,
      }}
      containerStyle={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)'
      }}
      fetchMore={fetchMore}
      hasMore={true}
      loader={<h3 style={{ textAlign: "center" }}>Loading ...</h3>}
      renderChildren={(ref) =>
        Children.toArray(
          data.map((d: any, i: number) => (
            <SItem ref={data.length - i - 1 === 0 ? ref : null}>
              <div className="item">
                <LazyImage src={d} placeholderSrc="https://dummyimage.com/600x400/000/fff" />
              </div>
            </SItem>
          ))
        )
      }
    />
  );
}
