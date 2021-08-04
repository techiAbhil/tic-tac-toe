import React, { useState } from 'react'

const initialBoxState = Array(9).fill(null);

const lineArray = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 4, 8],
  [2, 4, 6],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8]

]


function App() {

  const [boxState, setBoxState] = useState(initialBoxState);
  const [tickCount, setTickCount] = useState(0);

  const drawXO = (boxID) => {
    if (boxState[boxID]) {
      // if key is not null then return 
      return;
    }
    const updatedBoxState = [...boxState];
    updatedBoxState[boxID] = tickCount % 2 === 0 ? 'X' : 'O';
    setBoxState(updatedBoxState);
    setTickCount(tickCount + 1);

    let winner = null;
    lineArray.forEach((line) => {
      if (line.every(columnIndex => updatedBoxState[columnIndex] === 'X')) {
        winner = 'X';
      } else if (line.every(columnIndex => updatedBoxState[columnIndex] === 'O')) {
        winner = 'O';
      }
    });

    if (winner)
      alert(`Winner is ${winner}`);
  }

  const onClearBtnClick = () => {
    setBoxState(initialBoxState);
    setTickCount(0);
  }

  return (
    <main>
      <section className="box-container">
        {
          boxState.map((_, index) => {
            return (
              <div key={index} id={`box-${index}`} className="box" onClick={() => drawXO(index)}>
                {boxState[index] ?? ""}
              </div>
            )
          })
        }
      </section>

      <div className="btn-container">
        <button className="btn" disabled={tickCount === 0} onClick={onClearBtnClick}>Clear</button>
      </div>
    </main>
  );
}

export default App;
