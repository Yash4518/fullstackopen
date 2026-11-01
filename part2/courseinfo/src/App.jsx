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


const Total = ({parts}) => {
  const total = parts.reduce(
    (sum, part) => sum + part.exercises,0
  )
  return (
  <p><strong>total of {total} exercises</strong></p>
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
      <Total parts={course.parts}/>
    </div>
  )
}

export default App