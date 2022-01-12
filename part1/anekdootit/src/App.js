import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

function undfReplacer(arr) {
  var newArr = [...arr]
  for(var i=0;i<newArr.length;i++) {
    if(arr[i] === undefined) {
      newArr[i] = 0
    }
  }
  return newArr
}

const JavaScriptOnRumaa = ({vArr, anecs}) => {
  let i = 0
  let nArr = undfReplacer(vArr)
  for(var j = 0;j<nArr.length;j++) {
    if(nArr[j] > nArr[i]) {
      i = j
    }
  }
  return(
    <p>{anecs[i]}</p>
  )
}


function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

function copyAndAddOne(arr, ind) {
  let newArr = [...arr]
  if (newArr[ind] === undefined) {
    newArr[ind] = 1
  } else {
    newArr[ind] += 1
  }
  //console.log(newArr)
  return newArr
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  const kakka = Array(anecdotes.length).fill(0)
  const [selected, setSelected] = useState(kakka)
  const [voteCount, setVoteCount] = useState([])
  const rando = () => setSelected(getRandomInt(anecdotes.length))
  const doVote = () => setVoteCount(copyAndAddOne(voteCount, selected))
  return (
    <div>
      {anecdotes[selected]}
      <p>
        <Button handleClick={rando} text="new anecdote"/>
        <Button handleClick={doVote} text="vote" />
      </p>
      <p>
        {voteCount[selected]}
      </p>
      <h2>anecdote with most votes</h2>
      <JavaScriptOnRumaa vArr={voteCount} anecs={anecdotes} />
    </div>
  )
}

export default App