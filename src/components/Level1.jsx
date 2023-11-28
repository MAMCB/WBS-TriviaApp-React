import {useState, useEffect} from 'react'
import categories from '../categories'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import QuestionsLevel1 from './QuestionsLevel1';
import Button from 'react-bootstrap/Button';
import { Form, Stack } from 'react-bootstrap';
import { decode } from "html-entities";
import { v4 as uuidv4 } from "uuid";


function Level1() {
  const [isResult, setIsResult] = useState(false);
  const [isQuiz, setIsQuiz] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]); 
  const [isChoose, setIsChoose] = useState([false, false, false, false]);

console.log(userAnswers);
  function handleAnswer(e, indexQuestion) {
    console.log(indexQuestion);
    console.log(e.target.id);
    console.log(QuestionsLevel1[indexQuestion].answers[e.target.id]);
  // const answerThis = [...userAnswers].filter((answer) => {
  //   return answer.id === e.target.id;
  // });
  // if (answerThis.length > 0) {
  //   e.target.checked = false;

  //   if (!e.target.checked && answerThis[0].answerId === e.currentTarget.id) {
  //     const deleteAnswer = [...userAnswers].filter((answer) => {
  //       return answer.id !== e.target.id;
  //     });
  //     setUserAnswers(deleteAnswer);

  //     const newChoose = isChoose.map((ele, index) => {
  //       if (index == answerThis[0].answerId) {
  //         ele = false;
  //       }
  //       return ele;
  //     });

  //     setIsChoose(newChoose);
  //   }
  // } else {
  //   const newAnswer = {
  //     id: e.target.id,
  //     answerId: e.currentTarget.id,
  //     answer: QuestionsLevel1[indexQuestion].answers[e.target.id],
  //   };
  //   setUserAnswers([...userAnswers, newAnswer]);
  //   const newChoose = isChoose.map((ele, index) => {
  //     if (index == newAnswer.answerId) {
  //       ele = true;
  //     }
  //     return ele;
  //   });

  //   setIsChoose(newChoose);
  // }
}


  return (
    <>
      {isQuiz ? (
        <div>
          {QuestionsLevel1.map((question, index) => (
            <div key={index}>
              <h2>{decode(question.question)}</h2>
              <div className="answersStack">
                {question.answers.map((answer, answerIndex) => (
                  <Form key={uuidv4()}>
                    <Form.Check
                      type="checkbox"
                      id={`${answerIndex}`}
                      
                      onChange={(e) => handleAnswer(e,index)}
                    />
                    <p>{decode(answer)}</p>
                  </Form>
                ))}
              </div>
            </div>
          ))}
          <button>Submit</button>
        </div>
      ) : (
        <div>
          <p>Start quiz</p> <br />{" "}
          <button variant="primary" onClick={() => setIsQuiz(!isQuiz)}>
            Start the Quiz
          </button>
        </div>
      )}
    </>
  );
}

export default  Level1;