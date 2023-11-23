import React from 'react'
import { useState, useEffect } from 'react'

function Questions({question,selectNextQuestion,selectPreviousQuestion}) {

    const handleNextQuestion = ()=>{
        selectNextQuestion();
    }

    const handlePreviousQuestion = ()=>{
        selectPreviousQuestion();
    }
    

    
  return (
    <div className='container m-5'>
      <h1>{question}</h1>
      <div>
        <input type='checkbox' id='' onChange={ ""} checked={""}></input>
        <label ></label>
      </div>
        <button></button>

    </div>
  )
}

export default Questions