import { useState,useEffect } from 'react'
import Results from './Components/Results';
import { v4 as uuidv4 } from "uuid";
import axios from 'axios';
import _ from "lodash";

import './App.css'

function App() {
  const [complete, setComplete] = useState(false);
  const [questions,setQuestions] =useState([]);
  const [answers,setAnswers] =useState([]);
  const [category,setCategory] = useState(16);
  
  // useEffect(()=>{
  //   fetch(`https://opentdb.com/api.php?amount=10&category=${category}`)
  //     .then((res) => res.json())
  //     .then((data) => setQuestions(data.results))
  //     .catch((error) => console.error(error));
  // },[category])
  
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://opentdb.com/api.php?amount=10&category=${category}`
      );
      setQuestions(response.data.results);
    } catch (error) {
      if (error.response && error.response.status === 429) {
        const retryAfter =
          parseInt(error.response.headers["retry-after"], 10) || 7; // Default to 7 seconds if no valid header
        console.log(
          `Rate limit exceeded. Retrying after ${retryAfter} seconds.`
        );

        // Retry after the specified duration
        setTimeout(() => {
          fetchData();
        }, retryAfter * 1000);
      } else {
        console.error(error);
      }
    }
  };

  const delayedFetch = _.throttle(fetchData, 7000); // Throttle to one request per 7 seconds

  delayedFetch();
}, [category]);

console.log(questions);


const submitAnswer=(answer)=>{
  setAnswers([...answers,answer]);
  
}


  return (
    <>
    {complete?<Results questions={questions} answers={answers}/>:questions.length>0?questions.map((question)=><p key={uuidv4()}>{question.question}</p>):<p>Show landing page</p>}
      
    </>
  )
}

export default App
