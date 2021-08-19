import React, { useState } from 'react'
import Swal from 'sweetalert2';

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
  const [winningLine, setWinningLine] = useState([]);

  const highlightWinner = (winner, line) => {
    setWinningLine(line);
    setTimeout(() => {
      if (winner) {
        Swal.fire({
          icon: 'success',
          title: 'We have a Winner!',
          text: `Winner is ${winner}`
        }
        ).then(() => {
          onClearBtnClick();
        });
      }
    }, 2000)
  }

  const drawXO = (boxID) => {
    if (boxState[boxID] || winningLine.length !== 0) {
      // if key is not null then return 
      return;
    }
    const updatedBoxState = [...boxState];
    updatedBoxState[boxID] = tickCount % 2 === 0 ? 'X' : 'O';
    setBoxState(updatedBoxState);
    setTickCount(tickCount + 1);

    lineArray.forEach((line) => {
      if (line.every(columnIndex => updatedBoxState[columnIndex] === 'X')) {
        highlightWinner('X', line);
        return;
      } else if (line.every(columnIndex => updatedBoxState[columnIndex] === 'O')) {
        highlightWinner('O', line);
        return;
      }
    });

    //check if the match is draw
    if (tickCount === 8) {
      Swal.fire({
        icon: 'info',
        title: 'Oops..!',
        text: `The match is draw`
      }
      ).then(() => {
        onClearBtnClick();
      });
    }
  }

  const onClearBtnClick = () => {
    setWinningLine([]);
    setBoxState(initialBoxState);
    setTickCount(0);
  }

  return (
    <main>
      <section className="box-container">
        {
          boxState.map((_, index) => {
            const shouldHighlight = winningLine.some(lineIndex => lineIndex === index);
            return (
              <div key={index} id={`box-${index}`} className={`box ${shouldHighlight ? "highlight-text" : ""}`} onClick={() => drawXO(index)}>
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
