const Header = (props) => <h1>{props.course}</h1>

const Content = ({parts}) => {

  return (
  <div>
    {parts.map( (part,index) => <Part key={`${part.name}-${index}`} part={part}/>)}
  </div>
)}


const Part = ({part}) => (
  <p>
    {part.name} {part.exercises}
  </p>
)


const Total = ({exercises}) => {
  const total = exercises.reduce(
    (sum, exercise) => sum + exercise,0
  )
  return (
  <p>Number of exercises {total}</p>
)
}

const Course = ({course}) => (
    <div>
      <Header course={course.name}/>  
      <Content parts={course.parts} />  
    </div>
  )


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  }

  return (
    <div>
      <Course course={course}/>
      <Total exercises={course.parts.map(part => part.exercises)}/>
    </div>
  )
}

export default App