import React, { useState } from "react";
import "./App.css";
import Checkbox from "components/Checkbox";
import Pagination from "components/Pagination";

function App() {
  const [state, setState] = useState(false);

  const [page, setPage] = useState(1);

  return (
    <div className="App">
      <p>
        <Checkbox checked={state} onChange={() => setState((prev) => !prev)} />
      </p>
      <p>
        <Pagination
          total={100}
          current={page}
          onChange={(page: number) => {
            setPage(page);
            console.log(page)
          }}
        />
      </p>
    </div>
  );
}

export default App;
