import React from "react";
import Image from 'next/image'
import styles from "./Heading.module.css";
import DarkMode from "../DarkMode";


const Heading: React.FC = () => {

  return (
    <header className={styles.container}>
      <div className={styles.title}>
        <div className={styles.logo}>
            <span>M</span>
            <span>I</span>
            <span>C</span>
            <span>P</span>
        </div>
        <div>Most Improved Competitive Programmer | Leaderboard</div>
      </div>
      <div className={styles.sideHead}>
        <div className={styles.tpcLogo}>
          <Image src={'/TPC.png'} alt='TPC' width={150} height={150} layout='intrinsic' />
        </div>
        <DarkMode />
      </div>
    </header>
  )
};

export default Heading;
