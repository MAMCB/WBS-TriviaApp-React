import {useState, useEffect} from 'react'

import FinalPageLevel2 from './FinalPageLevel2';
import Questions from "./Questions";
import QuestionsLevel1 from "./QuestionsLevel1";
import Button from "react-bootstrap/Button";

function Level2() {
  const [isResult, setIsResult] = useState(false);
  const [isQuiz, setIsQuiz] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]); //ANSWERS FOR FORM
  const [userAnswers, setUserAnswers] = useState([]); //USER ANSWERS
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(()=>{
    const questions =QuestionsLevel1.map((question)=>question);
    setQuestions(questions);
  },[])

  useEffect(()=>{
    const answers =QuestionsLevel1.map((question)=>question.answers);
    setAnswers(answers);
  },[])

  const selectNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  const selectPreviousQuestion = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  const setSubmit = () => {
    setIsResult(true);
  };

  const resetMainPage = () => {
    setIsResult(false);
    setIsQuiz(false);
    setCurrentQuestion(0);

    
    setUserAnswers([]);
  };
  return (
    <>
      {isResult ? (
        <FinalPageLevel2
          answers={userAnswers}
          questions={questions}
          resetMainPage={resetMainPage}
        />
      ) : isQuiz && questions.length > 0 && answers.length > 0 ? (
        <Questions
          question={[...questions][currentQuestion]}
          selectNextQuestion={selectNextQuestion}
          selectPreviousQuestion={selectPreviousQuestion}
          answers={[...answers][currentQuestion]}
          setAnswers={setAnswers}
          userAnswers={userAnswers}
          setUserAnswers={setUserAnswers}
          currentQuestion={currentQuestion}
          questionsLength={questions.length}
          setSubmit={setSubmit}
        />
      ) : (
        <>
          <div className="lv1-quiz">
            <h1 className="mb-3">Start Quiz Level 2</h1>
            <br />
            <Button
              size="lg"
              variant="primary"
              onClick={() => setIsQuiz(!isQuiz)}
            >
              Start Quiz
            </Button>
          </div>
        </>
      )}
    </>
  );
}

export default Level2;