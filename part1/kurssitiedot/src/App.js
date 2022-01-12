import React from 'react'

const Header = (props) => {
  console.log(props.course.name)
  return(
    <>
      <h1>{props.course.name}</h1>
    </>
  )
}

const Part = (props) => {
  return(
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

const Content = (props) => {
  const parts = props.parts.parts
  return(
    <div>
      <Part part={parts[0]['name']} exercises={parts[0]['exercises']}></Part>
      <Part part={parts[1]['name']} exercises={parts[1]['exercises']}></Part>
      <Part part={parts[2]['name']} exercises={parts[2]['exercises']}></Part>
    </div>
  )
}

const Total = (props) => {
  let total = 0
  props.parts.parts.forEach(part => {
    total += part['exercises']
  })
  return(
    <p>Number of exercises {total}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course} />
      <Total parts={course} />
    </div>
  )
}

export default App