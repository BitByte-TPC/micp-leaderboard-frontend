import Head from "next/head";
import styles from "../styles/Home.module.css";
import Heading from "../components/Heading";
import TableRow from "../components/TableRow";
import { resultType } from "../utils/resultType";
import React from "react";

const Home: React.FC<{ results: resultType[] }> = ({ results }) => {

  results.sort((a, b) => b.score - a.score);
  React.useEffect(() => {
    console.log(results)
  } ,[])

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
            username={e.name}
            ccId={e.codeChefId}
            cfId={e.codeForcesId}
            score={e.score}
            ccRating={e.ccCurrentRating}
            cfRating={e.cfCurrentRating}
          />
        ))}
      </section>
    </main>
  );
};

export async function getStaticProps()  {
  const response = await fetch(`${process.env.RANKLIST}`, {
    method: 'GET',
    mode: 'cors',
    headers: {'Content-type' : 'application/json'}
  })

  if(!response.ok) {
    return {
      props: {
        results: []
      }
    }
  }

  const data = await response.json()
  const rankList = data.users

  if(data) {
    return {
      props : {
        results : rankList
      },
      revalidate: 60*60*24*3 //3days in seconds
    }
  }
}
export default Home;
