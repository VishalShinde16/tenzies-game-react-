import React from 'react'
import "./die.css"
export const Die = (props) => {

  const styles ={
    backgroundColor : props.isHeld ? "#59E391" : "white"
  }
  return (
    <div className='die' style={styles} onClick={()=>{props.heldDice(props.id)}}>
        {props.value}
    </div>
  )
}
