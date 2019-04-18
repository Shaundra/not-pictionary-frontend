import React, { Component, Fragment } from 'react';
import NewGuessForm from '../components/NewGuessForm';
import AnswerForm from '../components/AnswerForm';
import GuessList from '../components/GuessList';
import { API_ROOT, HEADERS } from '../constants';


const PlayerInteraction = (props) => {

  const handleForm = (ev) => {
    ev.preventDefault()
    const formType = ev.target.name
    const formValue = ev.target[formType].value
    const playerId = JSON.parse(localStorage.getItem('playerData')).playerId
    const type = 'form'

    fetch(API_ROOT+`/game/${props.gameId}`, {
      method: 'PATCH',
      headers: HEADERS,
      body: JSON.stringify({[formType]: formValue, playerId, type})
    })
    .then(response => response.json())
    .then(console.log('after patching from form'))
  }

  if (props.isDrawing) {
    return (
      <Fragment>
        <AnswerForm handleForm={handleForm}/>
        <GuessList
          gameId={props.gameId}
          isDrawing={props.isDrawing}
          gameOver={props.gameOver}
          endGame={props.endGame}
        />
      </Fragment>
    )
  }
  else {
    return (
      <Fragment>
        <NewGuessForm handleForm={handleForm}/>
        <GuessList
          gameId={props.gameId}
          isDrawing={props.isDrawing}
          gameOver={props.gameOver}
          endGame={props.endGame}
        />
      </Fragment>
    )
  }
}

export default PlayerInteraction;
