import { useState } from 'react'
import Filter from './Filter'
import Persons from './Persons'
import PersonForm from './PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
  { name: 'Ada Lovelace', number: '39-44-5323523' },
  { name: 'Dan Abramov', number: '12-43-234345' },
  { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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