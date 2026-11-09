import axios from 'axios'
import { useState, useEffect } from 'react'
import Filter from './Filter'
import Persons from './Persons'
import PersonForm from './PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  },[])

  const addPerson = (event) =>{
    event.preventDefault()

    const exists = persons.some(person => person.name === newName)

    if(exists){
      alert(`${newName} is already added to phonebook`)

      return
    }

    const newPersonObject = {
      name: newName,
      number: newNumber,
    }

    setPersons(persons.concat(newPersonObject))
    setNewName('')
    setNewNumber('')
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onFilterChange={(event) => setFilter(event.target.value)} />
        
      <h3>Add a new</h3>

      <PersonForm newName={newName} newNumber={newNumber} setNewName={setNewName}
      setNewNumber={setNewNumber} addPerson={addPerson}/>

      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />

    </div>
  )
}

export default App