import React from "react";
import styles from "./TableRow.module.css";

type propType = {
  username: string,
  score: number,
  ccId: string,
  cfId: string,
  ccRating:number,
  cfRating:number,
  rank: number
}

const TableRow: React.FC<propType> = ({ username, score, ccId, cfId, rank, cfRating, ccRating }) => {
  return (
    <div className={styles.cardWrapper}>
      <section className={styles.rank}>
        <span>
          {(rank >= 1 && rank <= 9) ? `0${rank}` : rank}
        </span>
      </section>
      <section className={styles.userDetails}>
        <div className={styles.userName}> {username} </div>
        <div className={styles.userHandleandRating}>
          <span className={styles.cc}>
            <b>CodeChef&nbsp;</b>
            {`Id: ${ccId} | Rating: ${ccRating}`}
          </span>
          <span className={styles.cf}>
            <b>CodeForces&nbsp;</b>
            {`Id: ${cfId} | Rating: ${cfRating}`}
          </span>
        </div>
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
