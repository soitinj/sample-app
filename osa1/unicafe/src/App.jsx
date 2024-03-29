import { useState } from 'react'

const Header = ({ text }) => (
  <h1>{text}</h1>
)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({ stats }) => {
  if ((stats.good + stats.neutral + stats.bad > 0)) {
    return (
      <table style={{ tableLayout: 'fixed' }}><tbody>{
        Object.entries(stats).map(( [key, value], idx ) => (
          <StatisticsLine key={idx} text={key} stat={value}></StatisticsLine>
        ))
      }</tbody></table>
    )
  } else {
    return <p>No feedback given</p>
  }
}

const StatisticsLine = ({ text, stat }) => (
  <tr><td>{text}</td><td>{stat}</td></tr>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [avg, setAvg] = useState(0)
  const [posPct, setPosPct] = useState('0 %')

  const handleReview = (state, setState) => {
    return () => {
      let updatedGood = good
      let updatedBad = bad
      if (setState === setGood) updatedGood++
      if (setState === setBad) updatedBad++

      const updatedState = state + 1
      const updatedAll = good + neutral + bad + 1
      setAll(updatedAll)
      setAvg( ( (updatedGood * 1) + (updatedBad * -1) ) / updatedAll )
      setPosPct(`${(updatedGood / updatedAll) * 100} %`)
      setState(updatedState)
    }
  }

  const stats = {
    'good': good,
    'neutral': neutral,
    'bad': bad,
    'all': all,
    'average': avg,
    'positive': posPct
  }

  return (
    <div>
      <Header text={'give feedback here'}></Header>
      <Button handleClick={handleReview(bad, setBad)} text='bad'></Button>
      <Button handleClick={handleReview(neutral, setNeutral)} text='neutral'></Button>
      <Button handleClick={handleReview(good, setGood)} text='good'></Button>
      <Header text={'statistics'}></Header>
      <Statistics stats={stats}></Statistics>
      {/*
      <Stat text='bad' stat={bad}></Stat>
      <Stat text='neutral' stat={neutral}></Stat>
      <Stat text='good' stat={good}></Stat>
      <Stat text='average' stat={avg}></Stat>
      <Stat text='positive' stat={posPct}></Stat>
      */}
    </div>
  )
}

export default App