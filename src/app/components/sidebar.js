import Image from "next/image";
import styles from "../styles/sidebar.module.css";

export default function Sidebar({
  totalCoins,
  currentCoins,
  memoEnabled,
  toggleMemo,
  currentLevel,
}) {
  return (
    <div className={styles.sidebar}>
      <div className={styles.scoreboard}>
        <div className={styles.coinLabel}>Your coins</div>
        <div className={styles.coinTotal}>
          {totalCoins.toLocaleString(undefined, {
            minimumIntegerDigits: 5,
            useGrouping: false,
          })}
        </div>
        <div className={styles.coinLabel}>Earned coins</div>
        <div className={styles.coinTotal}>
          {currentCoins.toLocaleString(undefined, {
            minimumIntegerDigits: 5,
            useGrouping: false,
          })}
        </div>
        <div className={styles.coinLabel}>Level {currentLevel}</div>
      </div>
      <div className={styles.memoButton}>
        <Image
          src="/voltorb-flip/memo_button.png"
          width={157}
          height={179}
          alt="Toggle memo"
          title="Toggle memo"
          className={`${styles.memoImage} ${
            memoEnabled && styles.memoImageToggled
          }`}
          onClick={() => toggleMemo()}
        ></Image>
      </div>
    </div>
  );
}
