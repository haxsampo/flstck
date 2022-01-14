import React from 'react'
import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = (props) => {
    return(
      <>
        <Header course={props.course} />
        <Content parts={props.course} />
        <Total parts={props.course} />
      </>
    )
}

export default Course