const PersonForm = ({
  newName,
  newNumber,
  setNewName,
  setNewNumber,
  addPerson,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name:
        <input
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
        />
      </div>

      <div>
        number:
        <input
          value={newNumber}
          onChange={(event) => setNewNumber(event.target.value)}
        />
      </div>

      <button type="submit">add</button>
    </form>
  );
};

export default PersonForm;
