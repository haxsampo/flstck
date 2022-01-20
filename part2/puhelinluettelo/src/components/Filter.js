import React from 'react'

const Filter = (props) => {
    return(
      <p>
        <input value={props.filterValue} onChange={props.handleFilterChange}/>
      </p>
    )
  }


export default Filter