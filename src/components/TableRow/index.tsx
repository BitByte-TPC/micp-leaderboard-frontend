import React from "react";
import { resultType } from "../../utils/resultType";
import styles from "./TableRow.module.css";

const TableRow: React.FC<resultType> = ({ rank, username, score }) => {
  return (
    <tr>
      <td className={styles.cell}>{rank}</td>
      <td className={styles.cell}>{username}</td>
      <td className={styles.cell}>{score}</td>
    </tr>
  );
};

export default TableRow;
