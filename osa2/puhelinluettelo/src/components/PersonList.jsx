import Person from './Person'

const PersonList = ({ persons, filterName }) => {
  return (
    <>
      {persons.filter(p => p.name.toLowerCase().includes(filterName)).map((person, idx) =>
          <Person key={`${person.name}${idx}`} name={person.name} number={person.number} ></Person>
      )}
    </>
  )
}

export default PersonList