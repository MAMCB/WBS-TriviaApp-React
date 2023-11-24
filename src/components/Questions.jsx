import React from 'react'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Form, Stack } from 'react-bootstrap';
import { useState, useEffect } from 'react'
import Buttons from './Buttons';


function Questions({
  question,
  selectNextQuestion,
  selectPreviousQuestion,
  answers,
  setAnswers,
  setUserAnswers,
  setSubmit,
  userAnswers,
  currentQuestion,
  questionsLength,
}) {

  const [isChoose, setIsChoose] = useState([false, false, false, false]);


  function unEscape(htmlStr) {
    htmlStr = htmlStr.replace(/&lt;/g, "<");
    htmlStr = htmlStr.replace(/&gt;/g, ">");
    htmlStr = htmlStr.replace(/&quot;/g, '"');
    htmlStr = htmlStr.replace(/&#039;/g, "'");
    htmlStr = htmlStr.replace(/&amp;/g, "&");
    htmlStr = htmlStr.replace(/&eacute;/g, "é");
    return htmlStr;
  }


  function handleAnswer(e) {
    const answerThis = [...userAnswers].filter(answer => {
      return answer.id === currentQuestion;
    })
    if(answerThis.length > 0){
      e.target.checked = false;

      if(!e.target.checked && answerThis[0].answerId === e.currentTarget.id){

        const deleteAnswer = [...userAnswers].filter(answer => {
          return answer.id !== currentQuestion;
        })
        setUserAnswers(deleteAnswer);

        const newChoose = isChoose.map((ele, index) => {
          if(index == answerThis[0].answerId){
            ele = false;
          }
          return ele;
        })
        setIsChoose(newChoose);
      }
    } else {
        const newAnswer = {
          id: currentQuestion,
          answerId: e.currentTarget.id,
          answer: answers[e.currentTarget.id]
        }
        setUserAnswers([...userAnswers, newAnswer]);
        const newChoose = isChoose.map((ele, index) => {
          if(index == newAnswer.answerId){
            ele = true;
          }
          return ele;
        })
        setIsChoose(newChoose);
      }    
  }

  return (
      <>
      <h5 className='question'>{unEscape(question.question)}</h5>
      <Form>
      {<>
      <Stack gap={3} direction="horizontal" className='justify-content-md-center'>
        <Row md={2} className="g-4 w-75">
          {answers.map((answer, index) => (
            <Stack gap={3} direction="horizontal" key={index}>
                <Form.Check
                  type="checkbox"
                  checked={isChoose[index]}
                  id={`${index}`}
                  onChange={(e) => handleAnswer(e)} />
                <p>{unEscape(answer)}</p>
              </Stack>
          ))}
        </Row>
        </Stack>
      </>}
    </Form><Buttons
        selectNextQuestion={selectNextQuestion}
        selectPreviousQuestion={selectPreviousQuestion}
        setSubmit={setSubmit}
        currentQuestion={currentQuestion}
        questionsLength={questionsLength} 
        setIsChoose={setIsChoose}/></>
  );
}

export default Questions