import Head from "next/head";
import styles from "../styles/Home.module.css";
import Heading from "../components/Heading";
import TableHeadings from "../components/TableHeadings";
import TableRow from "../components/TableRow";
import { resultType } from "../utils/resultType";
import React from "react";

const Home: React.FC<{ results: resultType[] }> = ({ results }) => {

  results.sort((a, b) => b.score - a.score);

  return (
    <main className={styles.container}>
      <Head>
        <title>MICP Leaderboard | TPC</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />  
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Heading />
      <section className={styles.rankSection}>
        {results.map((e, i) => (
          <TableRow
            key={i}
            rank={i+1}
            username={e.username}
            name={e.name}
            score={e.score}
            currentRating={e.currentRating}
          />
        ))}
      </section>
    </main>
  );
};

export async function getServerSideProps() {
  const response = await fetch('https://micp-backend.onrender.com/api/rankList', {
    method: 'GET',
    mode: 'cors',
    headers: {'Content-type' : 'application/json'}
  })

  if(!response.ok) {
    return {
      props: {}
    }
  }

  const data = await response.json()
  const rankList = data.users

  if(data) {
    return {
      props : {
        results : rankList
      }
    }
  }
}
export default Home;
