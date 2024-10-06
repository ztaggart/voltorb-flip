"use client";
import { useState, useEffect } from "react";
import Grid from "./components/grid";
import styles from "./styles/page.module.css";
import Sidebar from "./components/sidebar";

export default function Home() {
  const [totalCoins, setTotalCoins] = useState(0);
  const [currentCoins, setCurrentCoins] = useState(0);
  const [memoEnabled, setMemoEnabled] = useState(0);

  useEffect(() => {
    const keyDown = (e) => {
      if (e.key === "Control") {
        setMemoEnabled(!memoEnabled);
      }
    };
    document.addEventListener("keydown", keyDown);
    return () => {
      document.removeEventListener("keydown", keyDown);
    };
  }, [memoEnabled]);
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Sidebar
          memoEnabled={memoEnabled}
          totalCoins={totalCoins}
          currentCoins={currentCoins}
          toggleMemo={() => setMemoEnabled(!memoEnabled)}
        ></Sidebar>
        <Grid
          memoEnabled={memoEnabled}
          setCurrentCoins={setCurrentCoins}
          addTotalCoins={(coinsWon) => setTotalCoins(totalCoins + coinsWon)}
        ></Grid>
      </main>
    </div>
  );
}
