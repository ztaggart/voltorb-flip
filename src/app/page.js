"use client";
import { useState, useEffect } from "react";
import Grid from "./components/grid";
import styles from "./styles/page.module.css";
import Sidebar from "./components/sidebar";
import Head from "next/head";

export default function Home() {
  const [totalCoins, setTotalCoins] = useState(0);
  const [currentCoins, setCurrentCoins] = useState(0);
  const [memoEnabled, setMemoEnabled] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);

  useEffect(() => {
    let coins = Number(localStorage.getItem("totalCoins")) || 0;
    setTotalCoins(coins);
  }, []);

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
      <Head>
        <title>Voltorb flip</title>
      </Head>
      <main className={styles.main}>
        <Sidebar
          memoEnabled={memoEnabled}
          totalCoins={totalCoins}
          currentCoins={currentCoins}
          toggleMemo={() => setMemoEnabled(!memoEnabled)}
          currentLevel={currentLevel}
        ></Sidebar>
        <Grid
          memoEnabled={memoEnabled}
          setCurrentCoins={setCurrentCoins}
          addTotalCoins={(coinsWon) => {
            setTotalCoins(totalCoins + coinsWon);
            localStorage.setItem("totalCoins", totalCoins + coinsWon + "");
          }}
          setCurrentLevel={setCurrentLevel}
        ></Grid>
      </main>
    </div>
  );
}
