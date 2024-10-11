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
          src="/memo_button.png"
          width={314}
          height={358}
          alt="Toggle memo"
          title="Toggle memo"
          className={`${styles.memoImage} ${
            memoEnabled && styles.memoImageToggled
          }`}
          onClick={() => toggleMemo()}
        ></Image>
      </div>
      {/* <div className={styles.quitButton}>
        <Image
          src="/quit_button.png"
          width={330}
          height={142}
          alt="Quit button"
          title="Quit"
          className={styles.quitImage}
        ></Image>
      </div> */}
    </div>
  );
}
