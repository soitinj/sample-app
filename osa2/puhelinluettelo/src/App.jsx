import { useState } from 'react'
import PersonList from './components/PersonList'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (newName === '' || newNumber === '') {
      alert("Will not add person with empty name or number")
    } else if (persons.some(p => p.name === newName) ) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat([newPerson]))
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterHandler={handleFilterChange} filterName={filterName} />
      <h2>Add a new person</h2>
      <PersonForm
        submitHandler={handleSubmit}
        nameChangeHandler={handleNameChange}
        numberChangeHandler={handleNumberChange}
        newName={newName}
        newNumber={newNumber} />
      <h2>Numbers</h2>
      <PersonList persons={persons} filterName={filterName} />
    </div>
  )

}

export default App