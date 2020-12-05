import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [votesRegister, setVotesRegister] = useState(
    new Array(anecdotes.length).fill(0),
  );
  const [
    anecdoteWithMostVotesPosition,
    setAnecdoteWithMostVotesPosition,
  ] = useState(0);

  const changeAnecdote = () =>
    setSelected(Math.floor(Math.random() * anecdotes.length));

  const addVote = () => {
    const updatedVotesRegister = votesRegister.map((item, position) => {
      if (position === selected) {
        return item + 1;
      } else {
        return item;
      }
    });

    setVotesRegister(updatedVotesRegister);

    var maxValue = updatedVotesRegister.reduce(function (a, b) {
      return Math.max(a, b);
    });
    var maxValuePosition = updatedVotesRegister.indexOf(maxValue);

    setAnecdoteWithMostVotesPosition(maxValuePosition);
  };

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {votesRegister[selected]} votes</p>
      <button onClick={addVote}>Vote</button>
      <button onClick={changeAnecdote}>Change anecdote</button>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[anecdoteWithMostVotesPosition]}</p>
    </div>
  );
};

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
