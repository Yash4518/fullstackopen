import personService from './services/server'
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
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        console.log('Error fetching persons:', error)
      })
  },[])

  const addPerson = (event) =>{
    event.preventDefault()

    const exists = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())

    if(exists){
      const existingPerson = persons.find(person => person.name === newName)
      if(window.confirm(`${existingPerson.name} is already added to the phonebook, replace the old number with new one?`)){
        personService
          .update(existingPerson.id, {...existingPerson, number: newNumber})
          .then(updatedPerson => {
            setPersons(previousPersons =>
              previousPersons.map(person =>
                person.id === updatedPerson.id ? updatedPerson : person
              )
            )
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            console.log('Error updating person:', error)
          })
      }

      return
    }

    const newPersonObject = {
      name: newName,
      number: newNumber,
    }

    personService
      .create(newPersonObject)
      .then(returnedPerson => {
        setPersons(previousPersons => previousPersons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        console.log('Error adding person:', error)
      })
  }


  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(previousPersons => previousPersons.filter(p => p.id !== id))
        })
        .catch(error => {
          console.log('Error deleting person:', error)
        })
    }
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
      <Persons persons={filteredPersons} deletePerson={deletePerson} />

    </div>
  )
}

export default App