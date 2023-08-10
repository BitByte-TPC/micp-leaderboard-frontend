import Head from "next/head";
import styles from "../styles/Home.module.css";
import Heading from "../components/Heading";
import TableHeadings from "../components/TableHeadings";
import TableRow from "../components/TableRow";
import { resultType } from "../utils/resultType";
import React from "react";
import { NextApiRequest, NextApiResponse } from 'next'

const Home: React.FC<{ results: resultType[] }> = ({ results }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>MICP Leaderboard | TPC</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Heading />
      <table className={styles.table}>
        <tbody>
          <TableHeadings />
          {results.map((e, i) => (
            <TableRow key={i} {...e} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export async function getStaticProps() {
  const body = {
    query:
      "query {allMembers(_size: 1000) {data {username, initialRating, currentRating}}}",
  };
  const res = await fetch(process.env.DB_URL!, {
    method: "POST",
    headers: {
      Authorization: "bearer " + process.env.DB_SECRET,
    },
    body: JSON.stringify(body),
  });
  const rawData = await res.json();
  if (!rawData) {
    return {
      notFound: true,
    };
  }
  const arr: resultType[] = [];
  const members = rawData.data.allMembers.data;
  members.sort((a: any, b: any) => {
    return (
      b.currentRating - b.initialRating - (a.currentRating - a.initialRating)
    );
  });
  let curRank = 1;
  const map = new Map();
  for (let i = 0; i < members.length; i++) {
    const tempScore = members[i].currentRating - members[i].initialRating;
    let tempRank = curRank;
    if (map.has(tempScore)) {
      tempRank = map.get(tempScore);
    } else {
      map.set(tempScore, tempRank);
    }
    arr.push({
      rank: tempRank,
      username: members[i].username,
      score: tempScore,
    });
    curRank++;
  }
  return {
    props: {
      results: arr,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 days
    revalidate: 60 * 60 * 24 * 10, // In seconds
  };
}

export default Home;
