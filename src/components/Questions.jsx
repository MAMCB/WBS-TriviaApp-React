import React from 'react'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Form } from 'react-bootstrap';
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
  useEffect(() => {
    console.log(question);
  }, []);

  function unEscape(htmlStr) {
    htmlStr = htmlStr.replace(/&lt;/g, "<");
    htmlStr = htmlStr.replace(/&gt;/g, ">");
    htmlStr = htmlStr.replace(/&quot;/g, '"');
    htmlStr = htmlStr.replace(/&#039;/g, "'");
    htmlStr = htmlStr.replace(/&amp;/g, "&");
    return htmlStr;
  }

  function handleAnswer(e) {
    setUserAnswers([...userAnswers, answers[e.id]]);
  }

  return (
    <div className="container m-5">
      <h5>{unEscape(question.question)}</h5>
      <Form>
        {
          <>
            <Row>
              <Col>
                {answers > 0 && <p>{answers[0]}</p>}
                <Form.Check
                  type="checkbox"
                  checked={false}
                  id="0"
                  onChange={(e) => handleAnswer(e)}
                />
              </Col>
              <Col>
                <p>{answers[1]}</p>
                <Form.Check
                  type="checkbox"
                  checked={false}
                  id="1"
                  onChange={(e) => handleAnswer(e)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <p>{answers[2]}</p>
                <Form.Check
                  type="checkbox"
                  checked={false}
                  id="2"
                  onChange={(e) => handleAnswer(e)}
                />
              </Col>
              <Col>
                <p>{answers[3]}</p>
                <Form.Check
                  type="checkbox"
                  checked={false}
                  id="3"
                  onChange={(e) => handleAnswer(e)}
                />
              </Col>
            </Row>
          </>
        }
      </Form>
      <Buttons
        selectNextQuestion={selectNextQuestion}
        selectPreviousQuestion={selectPreviousQuestion}
        setSubmit={setSubmit}
        currentQuestion={currentQuestion}
        questionsLength={questionsLength}
      />
    </div>
  );
}

export default Questions