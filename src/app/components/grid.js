import styles from "../styles/grid.module.css";
import { GRID_HEIGHT, GRID_WIDTH, default as GridModel } from "../models/grid";
import { useCallback, useEffect, useRef, useState } from "react";
import Cell from "./cell";
import CellTally from "./cell-tally";

const TOTAL_CELLS = GRID_HEIGHT * GRID_WIDTH;

export default function Grid({ memoEnabled, setCurrentCoins, addTotalCoins }) {
  const [grid, setGrid] = useState(new GridModel(winCallback));
  const [selectedCellIndex, setSelectedCellIndex] = useState(0);
  const gridElement = useRef(null);

  function winCallback(coinsWon) {
    console.log("won callback");
    addTotalCoins(coinsWon);
  }

  const clickCell = useCallback(
    (colIndex, rowIndex) => {
      if (memoEnabled) {
        setGrid(grid.toggleMemo(colIndex, rowIndex));
      } else {
        setGrid(grid.flipCard(colIndex, rowIndex));
      }
      setSelectedCellIndex(colIndex * GRID_WIDTH + rowIndex);
    },
    [grid, memoEnabled]
  );

  const keyDownHandler = useCallback(
    (e) => {
      switch (e.key) {
        case "ArrowDown":
          if (selectedCellIndex < TOTAL_CELLS - GRID_WIDTH) {
            setSelectedCellIndex(selectedCellIndex + GRID_WIDTH);
          }
          break;
        case "ArrowUp":
          if (selectedCellIndex > GRID_WIDTH - 1) {
            setSelectedCellIndex(selectedCellIndex - GRID_WIDTH);
          }
          break;
        case "ArrowLeft":
          if (selectedCellIndex % 5 !== 0) {
            setSelectedCellIndex(selectedCellIndex - 1);
          }
          break;
        case "ArrowRight":
          if ((selectedCellIndex + 1) % 5 !== 0) {
            setSelectedCellIndex(selectedCellIndex + 1);
          }
          break;
        case " ":
          clickCell(
            Math.floor(selectedCellIndex / GRID_HEIGHT),
            selectedCellIndex % GRID_WIDTH
          );
          break;
      }
    },
    [clickCell, selectedCellIndex]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [clickCell, keyDownHandler, selectedCellIndex]);

  useEffect(() => {
    const contextMenuListener = (e) => {
      e.preventDefault();
    };
    document.addEventListener("contextmenu", contextMenuListener);
    return () => {
      document.removeEventListener("contextmenu", contextMenuListener);
    };
  }, []);

  useEffect(() => {
    setCurrentCoins(grid.currentCoins);
  }, [grid, setCurrentCoins]);

  useEffect(() => {
    if (!grid || !grid.grid) {
      setGrid(grid.initialize());
    }
  }, [grid, setGrid]);
  return (
    <div className={styles.OuterGridContainer} ref={gridElement}>
      <div className={styles.gridColContainer}>
        <div className={styles.gridRowContainer}>
          <div className={styles.innerGridContainer}>
            {grid &&
              grid.grid?.map((col, colIndex) => {
                return col.map((cell, rowIndex) => (
                  <Cell
                    key={rowIndex}
                    cell={cell}
                    clickHandler={() => clickCell(colIndex, rowIndex)}
                    flipCard={() => setGrid(grid.flipCard(colIndex, rowIndex))}
                    toggleMemo={() =>
                      setGrid(grid.toggleMemo(colIndex, rowIndex))
                    }
                    selected={
                      selectedCellIndex === colIndex * GRID_WIDTH + rowIndex
                    }
                  ></Cell>
                ));
              })}
          </div>
          <div className={styles.rowTally}>
            {grid &&
              [...Array(GRID_HEIGHT)].map((_e, index) => {
                return (
                  <CellTally
                    key={index}
                    tally={grid.getRowTallies(index)}
                  ></CellTally>
                );
              })}
          </div>
        </div>
        <div className={styles.colTally}>
          {grid &&
            [...Array(GRID_WIDTH)].map((_e, index) => {
              return (
                <CellTally
                  key={index}
                  tally={grid.getColTallies(index)}
                ></CellTally>
              );
            })}
          {/* EMPTY DIV */}
          <div style={{ height: "100px", width: "100px" }}></div>
        </div>
      </div>
      {(grid.won || grid.lost) && (
        <div className={styles.frostedContainer}>
          <div className={styles.gameOverContainer}>
            <div>{grid.won ? "YOU WON!" : "YOU LOST :("}</div>
            <button onClick={() => setGrid(grid.initialize())}>
              PLAY AGAIN?
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
