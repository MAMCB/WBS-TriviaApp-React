import 'bootstrap/dist/css/bootstrap.min.css';
import { useState,useEffect } from 'react'
import Results from './Components/Results';
import { v4 as uuidv4 } from "uuid";


import './App.css'
import CategoryGrid from './components/CategoryGrid'

function App() {
  
  const [questions,setQuestions] =useState([]);
  const [answers,setAnswers] =useState([]);
  
  



const submitAnswer=(answer)=>{
  setAnswers([...answers,answer]);
  
}


  return (
    <>
   <CategoryGrid />
   </>
  )
}

export default App
