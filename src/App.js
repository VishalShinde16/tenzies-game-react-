import React from 'react'
import './App.css';
import { Die } from "./components/Die"
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
function App() {

  function allNewDice() {

    const numbers = []
    for (let i = 0; i < 10; i++) {
      numbers.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      })
    }
    return numbers
  }

  const [alldiceNumbers, setalldiceNumbers] = React.useState(allNewDice())
  const[tenzies,setTenzies] = React.useState(false)
  const alldices = alldiceNumbers.map((dice) => {

    return <Die value={dice.value} key={dice.id} isHeld={dice.isHeld} heldDice={heldDice} id={dice.id} />
  })

  function handleRoll() {
    
    if(!tenzies){
      setalldiceNumbers(alldiceNumbers => alldiceNumbers.map(dice => {
      return dice.isHeld ? dice : { ...dice, value: Math.ceil(Math.random() * 6) }
    }))
    }else{
      setTenzies(false)
      setalldiceNumbers(allNewDice)
    }
  }


  function heldDice(id) {
    setalldiceNumbers(oldDicenumbers => oldDicenumbers.map(die => {
      return die.id === id ? { ...die, isHeld: !die.isHeld } : die

    }))
  }

  

  React.useEffect(()=>{
    const allheld = alldiceNumbers.every(die =>die.isHeld===true)
    const firstvalue = alldiceNumbers[0].value
    const allsamevalue = alldiceNumbers.every(die=>die.value === firstvalue)

    if(allheld && allsamevalue){
      setTenzies(true)
      console.log("You Won!!")
    }
  },[alldiceNumbers])

  return (
    <div className="App">
      <div className="container">
        <div className="inner-container">
          {tenzies && <Confetti/>}
          <div className="instructions">
            <h1 className="title">Tenzies</h1>
            <p className="rules">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          </div>
          
          <div className="dice-container">
            {alldices}
          </div>
          <button className='btn-roll' onClick={handleRoll}>{tenzies ? "New Game":"Roll"}</button>
        </div>
      </div>
    </div>
  );
}

export default App;
