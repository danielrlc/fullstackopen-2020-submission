import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad > 0) {
    return (
      <>
        <h2>Statistics</h2>
        <div>
          <p>Good: {good}</p>
          <p>Neutral: {neutral}</p>
          <p>Bad: {bad}</p>
        </div>
        <div>
          <p>All: {good + neutral + bad}</p>
          <p>Average: {(good - bad) / (good + neutral + bad) || 0}</p>
          <p>Positive: {(good / (good + neutral + bad)) * 100 || 0}%</p>
        </div>
      </>
    );
  } else {
    return (
      <>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </>
    );
  }
};

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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
