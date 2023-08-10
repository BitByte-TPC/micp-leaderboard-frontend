import React from "react";
import { resultType } from "../../utils/resultType";
import styles from "./TableRow.module.css";

type propType = {
  username: string,
  score: number,
  name: string,
  currentRating:number,
  rank: number
}

const TableRow: React.FC<propType> = ({ username, score, name, currentRating, rank }) => {
  return (
    <div className={styles.cardWrapper}>
      <section className={styles.rank}>
        <span>
          {(rank >= 1 && rank <= 9) ? `0${rank}` : rank}
        </span>
      </section>
      <section className={styles.userDetails}>
        <span className={styles.userName}> {(!username) ? name: username} </span>
        <span className={styles.userHandleandRating}> {`Name: ${(!name) ? 'N/A' : name} | Current Rating: ${currentRating}`}</span>
      </section>
      <section className={styles.score}>
        <div className={styles.overlay} />
        <span>
          {score}
        </span>
      </section>
    </div>
  );
};

export default TableRow
