import Image from "next/image";
import styles from "../styles/cell.module.css";
import { useEffect, useRef } from "react";

export default function Cell({ cell, clickHandler, toggleMemo, selected }) {
  const cellElement = useRef(null);
  return (
    <div
      ref={cellElement}
      className={`${styles.cell} ${selected && styles.cellSelected}`}
    >
      {cell.flipped ? (
        <div className={styles.flippedContainer}>
          {cell.value > 0 ? (
            <div className={styles.cellContent}>{cell.value}</div>
          ) : (
            <Image
              src="/voltorb_full.png"
              height={100}
              width={100}
              alt="flipped-voltorb"
            ></Image>
          )}
        </div>
      ) : (
        <div
          className={styles.unflippedContainer}
          onClick={clickHandler}
          onContextMenu={() => toggleMemo()}
        >
          <Image
            className={styles.cellImage}
            src="/blanktile.svg"
            priority={true}
            alt="unflipped card"
            width={100}
            height={100}
          ></Image>
          {cell.memo && (
            <Image
              className={styles.cellMemo}
              priority={true}
              src="/voltorb_memo.png"
              width={80}
              height={80}
              alt="memo"
            ></Image>
          )}
        </div>
      )}
    </div>
  );
}
