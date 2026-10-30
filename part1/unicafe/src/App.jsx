import { useState } from 'react'

const Heading = (props) => <h1>{props.text}</h1>

const Button = (props) =>{
  return(
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const StatisticLine = (props)=>{
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const {good, neutral, bad} = props

  const total = good + neutral + bad

  if (total === 0) {
    return (
      <div>
        <Heading text='statistics' />
        <p>No feedback given</p>
      </div>
    )
  }


  const average = (total === 0) ? 0 : (good - bad) / total

  const positive = (total === 0) ? 0 : (good/total) * 100

  return (
    <div>
      <Heading text='statistics' />
      <table>
        <tbody>
          <StatisticLine text='good' value={good} />
          <StatisticLine text='neutral' value={neutral} />
          <StatisticLine text='bad' value={bad} />
          <StatisticLine text='all' value={total} />
          <StatisticLine text='average' value={average} />
          <StatisticLine text='positive' value={`${positive} %`} />
        </tbody>
      </table>
    </div>
  )

}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Heading text='give feedback'></Heading>

      <Button onClick={() => setGood(good+1)} text='good'></Button>
      <Button onClick={() => setNeutral(neutral+1)} text='neutral'></Button>
      <Button onClick={() => setBad(bad+1)} text='bad'></Button>

      <Statistics good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

export default App