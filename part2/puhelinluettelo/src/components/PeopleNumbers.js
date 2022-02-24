import react from 'react'
import DelButt from './DelButt'

const PeopleNumbers = (props) => {
    return(
      <ul>
          {props.persons.filter(prs => prs.name.toLowerCase().includes(props.newFilter))
          .map(prs => <li key={prs.id}>
            {prs.name} {prs.number}
            <DelButt id={prs.id} buttFunc={props.buttFunc}/>
            </li>)}
        </ul>
    )
  }

export default PeopleNumbers