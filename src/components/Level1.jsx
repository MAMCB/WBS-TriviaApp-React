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
import FinalPageLevel1 from './FinalPageLevel1';


function Level1() {
  const [isResult, setIsResult] = useState(false);
  const [isQuiz, setIsQuiz] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]); 
  const [isChoose, setIsChoose] = useState([
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false]
  ]);


 function handleAnswer(e, indexQuestion) {
   const updatedCheckboxes = isChoose.map((checkboxes, questionIndex) =>
     questionIndex === indexQuestion
       ? checkboxes.map((checkbox, checkboxIndex) =>
           checkboxIndex === parseInt(e.target.id) ? !checkbox : checkbox
         )
       : checkboxes
   );
   

   const newAnswer = {
     questionIndex: indexQuestion,
     answer: QuestionsLevel1[indexQuestion].answers[e.target.id],
     isCorrectAnswer:
       QuestionsLevel1[indexQuestion].answers[e.target.id] ===
       QuestionsLevel1[indexQuestion].correctAnswer,
   };

   if (userAnswers.find((e) => e.questionIndex === indexQuestion)) {
     const reMapAnswers = userAnswers
       .map((answer) =>
         answer.questionIndex === indexQuestion ? null : answer
       )
       .filter(Boolean);

     if (e.target.checked) {
       const newUpdate = updatedCheckboxes.map((checkboxes, questionIndex) =>
         questionIndex === indexQuestion
           ? checkboxes.map((checkbox, checkboxIndex) =>
               checkboxIndex === parseInt(e.target.id) ? true : false
             )
           : checkboxes
       );

       setIsChoose(newUpdate);
       setUserAnswers([...reMapAnswers, newAnswer]);
     } else {
       setIsChoose(updatedCheckboxes);
       setUserAnswers(reMapAnswers);
     }
   } else {
     setUserAnswers([...userAnswers, newAnswer]);
     setIsChoose(updatedCheckboxes);
   }
 }

 const resetMainPage = () => {
   setIsResult(false);
   setIsQuiz(false);
   setUserAnswers([]);
   setIsChoose([
     [false, false, false, false],
     [false, false, false, false],
     [false, false, false, false],
     [false, false, false, false],
     [false, false, false, false],
     [false, false, false, false],
   ]);
 };



  return (
    <>
      {isResult ? (
        <FinalPageLevel1 answers={userAnswers} resetMainPage={resetMainPage} />
      ) : isQuiz ? (
        <div>
          {QuestionsLevel1.map((question, index) => (
            <div key={index}>
              <h2>{decode(question.question)}</h2>
              <div className="answersStack d-flex flex-row align-items-center">
                <Row md={2} className="g-4">
                  {question.answers.map((answer, answerIndex) => (
                    <Form key={uuidv4()}>
                      <div className="d-flex g-3">
                        <Stack gap={3} direction="horizontal" key={uuidv4()}>
                          <Form.Check
                            className="me-3 "
                            type="checkbox"
                            id={`${answerIndex}`}
                            checked={isChoose[index][answerIndex]}
                            onChange={(e) => handleAnswer(e, index)}
                          />
                          <p>{decode(answer)}</p>
                        </Stack>
                      </div>
                    </Form>
                  ))}
                </Row>
              </div>
            </div>
          ))}
          <Button variant="primary" onClick={() => setIsResult(!isResult)}>
            Submit
          </Button>
        </div>
      ) : (
        <div>
          <h1 className="mb-3">Start Quiz Level 1</h1> <br />
          <Button variant="primary" onClick={() => setIsQuiz(!isQuiz)}>
            Start Quiz
          </Button>
        </div>
      )}
    </>
  );
}

export default  Level1;