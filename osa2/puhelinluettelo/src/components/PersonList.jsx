import DeleteButton from './DeleteButton'
import Person from './Person'
import phoneService from '../services/phonebook' 

const PersonList = ({ persons, filterName, setPersonState }) => {
  const deleteHandler = (person) => {
    return () => {
      if (window.confirm(`Delete ${person.name}?`)) {
        phoneService.remove(person)
          .then(response => {
            console.log(response)
            phoneService.getAll().then(response => setPersonState(response.data))
          }
        )
      }
    }
  }

  return (
    <>
      {persons.filter(p => p.name.toLowerCase().includes(filterName)).map((person) =>
        <div key={person.id} style={{ display: 'flex', alignItems: 'left' }}>
          <Person name={person.name} number={person.number}></Person>
          &nbsp;
          <DeleteButton deleteHandler={deleteHandler(person)}></DeleteButton>
        </div>
      )}
    </>
  )
}

export default PersonList