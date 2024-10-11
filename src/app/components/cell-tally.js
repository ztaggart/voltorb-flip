import Image from "next/image";
import styles from "../styles/cell-tally.module.css";

export default function CellTally({ cell, tally }) {
  return (
    <div className={styles.tallyContainer}>
      <div className={styles.valueDiv}>
        {tally.value.toLocaleString(undefined, { minimumIntegerDigits: 2 })}
      </div>
      <div className={styles.bombDiv}>
        <Image
          src="/voltorb-flip/voltorb_large.png"
          alt="voltorb"
          width={60}
          height={60}
          className={styles.voltorb}
        ></Image>
        <div className={styles.bombTally}>{tally.bombs}</div>
      </div>
    </div>
  );
}
