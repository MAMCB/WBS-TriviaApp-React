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


  function unEscape(htmlStr) {
    htmlStr = htmlStr.replace(/&lt;/g, "<");
    htmlStr = htmlStr.replace(/&gt;/g, ">");
    htmlStr = htmlStr.replace(/&quot;/g, '"');
    htmlStr = htmlStr.replace(/&#039;/g, "'");
    htmlStr = htmlStr.replace(/&amp;/g, "&");
    htmlStr = htmlStr.replace(/&eacute;/g, "é");
    return htmlStr;
  }


  //TO DO, I have to clean checkboxes after the button have pushed, but I can't get them
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
      }
    } else {
      if(e.target.checked){
        const newAnswer = {
          id: currentQuestion,
          answerId: e.currentTarget.id,
          answer: answers[e.currentTarget.id]
        }
        setUserAnswers([...userAnswers, newAnswer]);
      }
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
        questionsLength={questionsLength} /></>
  );
}

export default Questions