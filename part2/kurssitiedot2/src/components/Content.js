import React from 'react'
import Part from './Part'

const Content = (props) => {
    const parts = props.parts.parts
    return(
      <div>
        <ul>
          {parts.map(part => <li key={part.id}><Part part={part['name']} exercises={part['exercises']}></Part></li>)}
        </ul>
        
      </div>
    )
  }

export default Content