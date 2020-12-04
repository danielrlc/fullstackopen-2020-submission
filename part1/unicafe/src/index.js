import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad > 0) {
    return (
      <>
        <h2>Statistics</h2>
        <table>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={good + neutral + bad} />
          <Statistic
            text="average"
            value={(good - bad) / (good + neutral + bad) || 0}
          />
          <Statistic
            text="positive"
            value={(good / (good + neutral + bad)) * 100 || 0}
          />
        </table>
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

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
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
        <Button text="good" handleClick={addGoodVote} />
        <Button text="neutral" handleClick={addNeutralVote} />
        <Button text="bad" handleClick={addBadVote} />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
