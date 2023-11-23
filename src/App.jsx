import { useState,useEffect } from 'react'
import Results from './Components/Results';
import { v4 as uuidv4 } from "uuid";
import axios from 'axios';
import _ from "lodash";

import './App.css'

function App() {
  
  const [questions,setQuestions] =useState([]);
  const [answers,setAnswers] =useState([]);
  
  



const submitAnswer=(answer)=>{
  setAnswers([...answers,answer]);
  
}


  return (
    <>
    
      
    </>
  )
}

export default App
