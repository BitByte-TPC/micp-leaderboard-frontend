# Most Improved Competitive Programmers Leaderboard

A website to show current standings of most improved programmers of The Programming Club.

This repo is an SSG website to showcase the rankings.

## How it works?
The backend uses **codeforces API** to get all members in the group along with their ratings. **FaunaDB** is used as the database 
and the results are pushed to FaunaDB. FaunaDB provides a **GraphQL API** to interact with the data. 
The Frontend fetches the data from the database using the GraphQL API and caches the results to prevent unnecessary API calls.
