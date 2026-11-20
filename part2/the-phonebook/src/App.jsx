import personService from './services/server'
import { useState, useEffect } from 'react'
import Filter from './Filter'
import Persons from './Persons'
import PersonForm from './PersonForm'
import Notification from './Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
            showNotification(`Updated ${updatedPerson.name}`)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            showError(
              `Information of ${existingPerson.name} has already been removed from server`
            )
            
            setPersons(previousPersons => 
              previousPersons.filter(p => p.id !== existingPerson.id)
            )
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
        showNotification(`Added ${returnedPerson.name}`)
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

  const showNotification = (message) => {
    setNotification(message)

    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const showError = (message) => {
    setErrorMessage(message)

    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} type="notification"/>
      <Notification message={errorMessage} type="error" />
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