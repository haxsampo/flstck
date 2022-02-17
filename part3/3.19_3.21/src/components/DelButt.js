import react from 'react'

const DelButt = ({id, buttFunc}) => {
    return(
      <button onClick={(event) => buttFunc(event,id)}>
        delete
    </button>
    )
  }

export default DelButt