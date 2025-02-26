# SpeedClick
A simple reactiontime game, designed to measure your reaction time.
https://speed-click-6p8nq9gxa-chris-projects-fbf975d7.vercel.app/

Insperation from Human Benchmark:
https://humanbenchmark.com/tests/reactiontime 

SpeedClick should be more preciese than humanbenchmark.


//TODO
User history

add extra field to a user, when signing up: reactionTimeHistory []

everytime you signin and play the game your time is stored in the reactionTimeHistory[]

store this value as a number

When you login, fetch your reactionTimeHistory, from this find the lowest value = highscore, and the latestPushed ReactionTime, your previous score.

Leaderboard

have a leaderboard array in the app.js with size 10.

this leaderboard needs to contain object with id, username and reactionTimeScores

every time you play and your time is being registerd, we fetch the leaderboard, we loop over the leaderboard checking if your time is below the last element in the array, if it is we check the next on in the line, until it is no longer smaller than the next element we until we reached the end of the array, if so we replace the value the reaction time we bigger than, with an object containing , id, username and highscore.

displaying leaderboard

I display the leader board, by fetching the leaderboard, lopping over it and retreving username information and reaction time.

I also display the ranking.