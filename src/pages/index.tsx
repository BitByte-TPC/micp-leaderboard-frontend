import Head from "next/head";
import styles from "../styles/Home.module.css";
import Heading from "../components/Heading";
import TableHeadings from "../components/TableHeadings";
import TableRow from "../components/TableRow";
import { resultType } from "../utils/resultType";
import React from "react";
import { NextApiRequest, NextApiResponse } from 'next'

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

export async function getServerSideProps( {req, res}:{req:NextApiRequest, res:NextApiResponse} )  {
  const response = await fetch(`${process.env.RANKLIST}`, {
    method: 'GET',
    mode: 'cors',
    headers: {'Content-type' : 'application/json'}
  })

  if(!response.ok) {
    res.status(400).end()
    return {
      props: {}
    }
  }

  const data = await response.json()
  const rankList = data.users

  if(data) {
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=259200, stale-while-revalidate=59' //Catch for 3 days (Vercel Edge Caching)
    )
    res.statusCode = 200
    return {
      props : {
        results : rankList
      }
    }
  }
}
export default Home;
