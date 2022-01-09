import React from 'react'

const Hello = (props) => {
  return (
    <div>
      <p>Hello world {props.name}, you are {props.age} years old</p>
    </div>
  )
}
 
const App = () => {
  const ika = 25158
  return (
    <div>
      <p>Greetings</p>
      <Hello name="jaska" age={20} />
      <Hello name="eerika" age={ika}/>
    </div>
  )
}

export default App