import { useEffect, useState } from 'react'
import phoneService from './services/phonebook'
import PersonList from './components/PersonList'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    phoneService.getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const oldPerson = persons.find(p => p.name === newName)
    if (newName === '' || newNumber === '') {
      alert("Will not add person with empty name or number")
    } else if (oldPerson !== undefined) {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          phoneService.update({...oldPerson, number: newNumber}).then(() =>
            phoneService.getAll().then(response =>
              setPersons(response.data)
            )
          )
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      phoneService.create(newPerson)
        .then(response => {
          setPersons(persons.concat([response]))
          setNewName('')
          setNewNumber('')
        })
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
        newNumber={newNumber}
        />
      <h2>Numbers</h2>
      <PersonList persons={persons} setPersonState={setPersons} filterName={filterName} />
    </div>
  )

}

export default App