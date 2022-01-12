import React, { useState } from 'react'

const Button = (props) => (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
)

const StatisticsLine = (props) => {
  return(
    <tr>
      <td>
        {props.text}
      </td>
      <td> 
        {props.value}
      </td>
    </tr>
  )
}

const Statistics = (props) => {
  let good = props.good
  let bad = props.bad
  let neutral = props.neutral
  let total = good+bad+neutral
  let kkonnn = (good+bad*-1) / total
  if (total == 0 ) {
    return(
      <div>
        <h2>statistics</h2>
        <p>No data - no stats</p>
      </div>
    )
  }
  return(
    <>
    <h2>statistics</h2>
    <table>
      <StatisticsLine text="good" value={good} />
      <StatisticsLine text="neutral" value={neutral} />
      <StatisticsLine text="bad" value={bad} />
      <StatisticsLine text="keskiarvo" value={kkonnn} />
      <StatisticsLine text="positiivisten määrä %" value={(good / total)*100} />
    </table>
    </>
  )
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodPlus = () => setGood(good + 1)
  const neutralPlus = () => setNeutral(neutral + 1)
  const badPlus = () => setBad(bad + 1)

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={goodPlus} text="good" />
      <Button handleClick={neutralPlus} text="neutral"/>
      <Button handleClick={badPlus} text="bad"/>
      
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App