import { useState,useEffect } from 'react'
import Results from './Components/Results';
import axios from 'axios';
import _ from "lodash";

import './App.css'

function App() {
  const [complete, setComplete] = useState(false);
  const [questions,setQuestions] =useState([]);
  const [answers,setAnswers] =useState([]);
  const [category,setCategory] = useState(1);
  

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://opentdb.com/api.php?amount=10&category=21`
      );
      setQuestions(response.data);
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

  return (
    <>
    {complete?<Results questions={questions} answers={answers}/>:questions.length>0?<p>Start first question</p>:<p>Show landing page</p>}
      
    </>
  )
}

export default App
