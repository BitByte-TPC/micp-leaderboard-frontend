import React from "react";
import styles from "./TableHeadings.module.css";

const TableHeadings: React.FC = () => {
  return (
    <tr className={styles.container}>
      <th>Rank</th>
      <th>Username</th>
      <th>Score</th>
    </tr>
  );
};

export default TableHeadings;
