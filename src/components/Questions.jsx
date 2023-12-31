import React from 'react'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Form, Stack } from 'react-bootstrap';
import { useState, useEffect } from 'react'
import Buttons from './Buttons';
import { decode } from "html-entities";
import { Transition } from 'react-transition-group';





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


  // function unEscape(htmlStr) {
  //   htmlStr = htmlStr.replace(/&lt;/g, "<");
  //   htmlStr = htmlStr.replace(/&gt;/g, ">");
  //   htmlStr = htmlStr.replace(/&quot;/g, '"');
  //   htmlStr = htmlStr.replace(/&#039;/g, "'");
  //   htmlStr = htmlStr.replace(/&amp;/g, "&");
  //   htmlStr = htmlStr.replace(/&eacute;/g, "é");
  //   htmlStr = htmlStr.replace(/&ocirc;/g, "ô");
  //   htmlStr = htmlStr.replace(/&pi;/g, "π");
  //   htmlStr = htmlStr.replace(/&ntilde;/g, "ñ");
  //   htmlStr = htmlStr.replace(/&euml;/g, "ë");
  //   return htmlStr;
  // }


  // function handleAnswer(e) {
  //   const answerThis = [...userAnswers].filter(answer => {
  //     return answer.id === currentQuestion;
  //   })
  //   if(answerThis.length > 0){
  //     e.target.checked = false;

  //     if(!e.target.checked && answerThis[0].answerId === e.currentTarget.id){

  //       const deleteAnswer = [...userAnswers].filter(answer => {
  //         return answer.id !== currentQuestion;
  //       })
  //       setUserAnswers(deleteAnswer);

  //       const newChoose = isChoose.map((ele, index) => {
  //         if(index == answerThis[0].answerId){
  //           ele = false;
  //         }
  //         return ele;
  //       })
        
  //       setIsChoose(newChoose);
  //     }
  //   } else {
  //       const newAnswer = {
  //         id: currentQuestion,
  //         answerId: e.currentTarget.id,
  //         answer: answers[e.currentTarget.id]
  //       }
  //       setUserAnswers([...userAnswers, newAnswer]);
  //       const newChoose = isChoose.map((ele, index) => {
  //         if(index == newAnswer.answerId){
  //           ele = true;
  //         }
  //         return ele;
  //       })
        
  //       setIsChoose(newChoose);
  //     }    
  // }

function handleAnswer(e) {
  const clickedAnswerId = parseInt(e.currentTarget.id);
  const answerThis = userAnswers.find(
    (answer) => answer.id === currentQuestion
  );

  // Uncheck the checkbox related to the existing answer and check the clicked checkbox
  const newChoose = isChoose.map((ele, index) => {
    if (answerThis && index === answerThis.answerId) {
      ele = false; // Uncheck existing answer
    } else if (index === clickedAnswerId) {
      ele = !ele; // Toggle the state of the clicked checkbox
    }
    return ele;
  });

  // Update the state with the new checkbox states
  setIsChoose(newChoose);

  // Update the userAnswers array based on the clicked checkbox
  if (answerThis) {
    const updatedUserAnswers = userAnswers.filter(
      (answer) => answer.id !== currentQuestion
    );
    setUserAnswers([
      ...updatedUserAnswers,
      {
        id: currentQuestion,
        answerId: clickedAnswerId,
        answer: answers[clickedAnswerId],
      },
    ]);
  } else {
    setUserAnswers([
      ...userAnswers,
      {
        id: currentQuestion,
        answerId: clickedAnswerId,
        answer: answers[clickedAnswerId],
      },
    ]);
  }
}



  return (
    <
      >
      <div className='wrapperQuestions'>      <h5 className="question h1">{decode(question.question)}</h5>
      <Form className='questionForm '>
        {
          <>
            <Stack
              gap={3}
              direction="horizontal"
              className="justify-content-md-center"
            >
              <Row md={2} className="g-4">
                {answers.map((answer, index) => (
                  <Stack gap={3} direction="horizontal" key={index}>
                    <Form.Check
                      type="checkbox"
                      checked={isChoose[index]}
                      id={`${index}`}
                      onChange={(e) => handleAnswer(e)}
                    />
                    <p>{decode(answer)}</p>
                  </Stack>
                ))}
              </Row>
            </Stack>
          </>
        }
      </Form></div>

      <Buttons
        selectNextQuestion={selectNextQuestion}
        selectPreviousQuestion={selectPreviousQuestion}
        setSubmit={setSubmit}
        currentQuestion={currentQuestion}
        questionsLength={questionsLength}
        setIsChoose={setIsChoose}
        isChoose={isChoose}
      />
    </>
  );
}

export default Questions