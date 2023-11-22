import { useState,useEffect } from 'react'
import Results from './Components/Results';
import axios from 'axios';
import './App.css'

function App() {
  const [complete, setComplete] = useState(false);
  const [questions,setQuestions] =useState([]);
  const [answers,setAnswers] =useState([]);
  const [category,setCategory] = useState(0);

  useEffect(()=>{
    axios.get(`https://opentdb.com/api.php?amount=10&category=${category}`).then(response=>setQuestions(response.data)).catch(e=>console.error(e));
  },[])

  return (
    <>
    {complete?<Results questions={questions} answers={answers}/>:questions.length>0?<p>Start first question</p>:<p>Show landing page</p>}
      
    </>
  )
}

export default App
