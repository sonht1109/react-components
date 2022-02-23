import React, { useState } from "react";
import Checkbox from "components/Checkbox";
import Pagination from "components/Pagination";
import Radio from "components/Radio";
import DatePicker from "components/DatePicker";
import Skeleton from "components/Skeleton";
import CountDown from "components/CountDown";
import Collapse from "components/Collapse";
import Modal from "components/Modal";
import useModal from "components/Modal/useModal";
import InfiniteScrollComponent from "components/InfiniteScroll/example";

function App() {
  const [state, setState] = useState(false);

  const [page, setPage] = useState(1);

  const [isCollapseOpen, toggleCollapse] = useState(false);

  const { isOpen, toggleModal } = useModal();

  return (
    <div className="App">
      <p>
        <Checkbox
          label="Checkbox"
          checked={state}
          onChange={() => setState((prev) => !prev)}
        />
      </p>
      <p>
        <Radio
          label="Radio"
          checked={state}
          onChange={() => setState((prev) => !prev)}
        />
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
        <DatePicker
          pickerProps={{
            showTodayButton: true,
          }}
          disabledDays={[
            new Date(2022, 0, 1),
            new Date(2022, 2, 1),
            new Date(2022, 0, 12),
          ]}
          disabledRange={{
            after: new Date(2022, 2, 15),
            before: new Date(2021, 10, 15),
          }}
        />
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
          loading={<p>Loading countdown ...</p>}
          then={new Date(new Date(new Date().getTime() + 60000))}
          renderCompletionist={() => <p>FINISH !!!</p>}
          renderer={({ day, hour, min, sec }) => (
            <div>
              {day} days {hour}:{min}:{sec}
            </div>
          )}
        />
      </p>
      <p>
        <button onClick={() => toggleCollapse((prev) => !prev)}>
          Toggle Collapse
        </button>
        <Collapse isOpen={isCollapseOpen}>
          <div
            style={{
              width: 200,
              border: "1px solid",
              background: "red",
            }}
          >
            Et dolore veniam do aute voluptate culpa nulla. Aliqua elit nisi
            excepteur sunt quis ea quis minim dolore do enim veniam nulla.
            Adipisicing qui culpa non reprehenderit pariatur ex cillum laborum
            exercitation pariatur velit Lorem laboris et. Mollit ullamco eu
            labore pariatur id qui qui aute mollit laboris ea. Ipsum occaecat
            aliqua ut ad nisi. Velit quis proident Lorem tempor anim est do est
            deserunt. Dolor id magna cillum esse. Labore ut Lorem pariatur
            occaecat excepteur id duis irure exercitation non exercitation. Elit
            ad aute mollit in incididunt qui consectetur. Veniam nostrud culpa
            esse reprehenderit.
          </div>
        </Collapse>
      </p>
      <p>
        <button onClick={toggleModal}>Toggle Modal</button>
        <Modal {...{ isOpen, toggleModal }} title="Modal">
          <span>
            Ad cillum cupidatat ullamco cillum non esse esse dolore deserunt
            cupidatat commodo aliqua in commodo. Ad nisi qui ipsum cupidatat
            reprehenderit nostrud incididunt ut adipisicing. Esse laboris sint
            ut cupidatat officia eiusmod do est quis irure sit minim ut. Sint
            exercitation minim sit incididunt Lorem sit Lorem deserunt in duis
            est esse consequat consequat. Dolor laboris officia eu pariatur qui
            consequat aliqua ipsum consectetur amet. Minim ullamco incididunt
            commodo do est labore ullamco excepteur ut pariatur proident nulla
            ullamco anim. Cillum occaecat aliqua non reprehenderit non ut
            exercitation elit eu. Esse minim incididunt est sunt proident
            deserunt voluptate nostrud deserunt. Do cupidatat sint esse ullamco
            labore. Excepteur enim minim do fugiat ea. Sit amet eiusmod nostrud
            labore mollit culpa. Excepteur laboris consequat minim nisi magna et
            adipisicing.
          </span>
        </Modal>
      </p>
      <p>
        <InfiniteScrollComponent />
      </p>
    </div>
  );
}

export default App;
