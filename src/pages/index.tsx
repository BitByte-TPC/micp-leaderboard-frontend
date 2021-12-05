import Head from "next/head";
import styles from "../styles/Home.module.css";
import Heading from "../components/Heading";
import TableHeadings from "../components/TableHeadings";
import TableRow from "../components/TableRow";
import { resultType } from "../utils/resultType";
import React from "react";

const Home: React.FC<{ results: resultType[] }> = ({ results }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>MICP Leaderboard</title>
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
  for (let i = 0; i < members.length; i++) {
    arr.push({
      rank: i + 1,
      username: members[i].username,
      score: members[i].currentRating - members[i].initialRating,
    });
  }
  return {
    props: {
      results: arr,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 24 hours
    revalidate: 60 * 60 * 24, // In seconds
  };
}

export default Home;
