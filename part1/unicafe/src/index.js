import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addGoodVote = () => setGood(good + 1);
  const addNeutralVote = () => setNeutral(neutral + 1);
  const addBadVote = () => setBad(bad + 1);

  return (
    <>
      <h2>Give feedback</h2>
      <div>
        <button onClick={addGoodVote}>good</button>
        <button onClick={addNeutralVote}>neutral</button>
        <button onClick={addBadVote}>bad</button>
      </div>
      <h2>Statistics</h2>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
