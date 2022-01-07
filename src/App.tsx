import React, { useState } from "react";
import "./App.css";
import Checkbox from "components/Checkbox";
import Pagination from "components/Pagination";
import Radio from "components/Radio";
import DatePicker from "components/DatePicker";
import Skeleton from "components/Skeleton";
import CountDown from "components/CountDown";

function App() {
  const [state, setState] = useState(false);

  const [page, setPage] = useState(1);

  return (
    <div className="App">
      <p>
        <Checkbox checked={state} onChange={() => setState((prev) => !prev)} />
      </p>
      <p>
        <Radio checked={state} onChange={() => setState((prev) => !prev)} />
      </p>
      <p>
        <Pagination
          total={100}
          current={page}
          onChange={(page: number) => {
            setPage(page);
            console.log(page);
          }}
        />
      </p>
      <p>
        <DatePicker />
      </p>
      <p style={{ display: "flex" }}>
        <Skeleton
          style={{
            borderRadius: "50%",
            width: 40,
            height: 40,
            marginRight: 10,
          }}
        />
        <div>
          <Skeleton />
          <Skeleton style={{ height: 40 }} />
          <Skeleton hideAnimation={true} style={{ height: 50 }} />
        </div>
      </p>
      <p>
        <CountDown
          then={new Date(new Date(new Date().getTime() + 60000))}
          renderCompletionist={() => <p>FINISH !!!</p>}
        />
      </p>
    </div>
  );
}

export default App;
