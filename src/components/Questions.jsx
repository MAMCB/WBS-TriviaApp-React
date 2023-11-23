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

  function handleAnswer(e) {
    setUserAnswers([...userAnswers, answers[e.id]]);
    setIsAnswered(!isAnswered);
  }

  return (
      <>
      <h5 className='question'>{unEscape(question.question)}</h5>
      <Form>
      {<>
      <Stack gap={3} direction="horizontal" className='justify-content-md-center'>
        <Row md={2} className="g-4 w-75">
          {answers.map((answer, index) => (
            <Stack gap={3} direction="horizontal">
                <Form.Check
                  type="checkbox"
                  checked={false}
                  id={index}
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