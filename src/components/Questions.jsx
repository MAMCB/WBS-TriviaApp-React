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
  userAnswers,
  setUserAnswers,
  selectNextQuestion,
  selectPreviousQuestion,
  setSubmit,
  userAnswers,
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
    setUserAnswers([...userAnswers]);
  }

  return (
    <div className="container m-5">
      <h5>{unEscape(question.question)}</h5>
      <Form>
        {
          <>
            <Row>
              <Col>
                <p>{answers[0]}</p>
                <Form.Check
                  type="checkbox"
                  checked={false}
                  id="0"
                  onChange={(e) => handleAnswer(e)}
                />
              </Col>
              <Col>
                <p>{answers[1]}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>{answers[2]}</p>
              </Col>
              <Col>
                <p>{answers[3]}</p>
              </Col>
            </Row>
          </>
        }
      </Form>
      <Buttons
        selectNextQuestion={selectNextQuestion}
        selectPreviousQuestion={selectPreviousQuestion}
        setSubmit={setSubmit}
      />
    </div>
  );
}

export default Questions