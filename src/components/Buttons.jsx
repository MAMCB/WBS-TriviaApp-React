import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';

const Buttons = ({
  selectNextQuestion,
  selectPreviousQuestion,
  setSubmit,
  currentQuestion,
  questionsLength,
  setIsChoose,
  isChoose,
}) => {
  const[previousChoices,setPreviousChoices]=useState([])

  const handlePrevious = () => {
    selectPreviousQuestion();
    
  
    setIsChoose([...previousChoices][currentQuestion - 1].choice.isChoose);
  };

  const handleNext = () => {
    const previousChoice ={
      questionIndex:{currentQuestion},
      choice:{isChoose}
    }
    setPreviousChoices([...previousChoices, previousChoice]);
    selectNextQuestion();
    
    setIsChoose([false, false, false, false]);
  };

  const handleSubmit = () => {
    setSubmit();
  };

  return (
    <>
      {currentQuestion !== 0 && (
        <Button variant="primary" className="previous" onClick={handlePrevious}>
          Previous
        </Button>
      )}
      {currentQuestion < questionsLength - 1 && (
        <Button
          className="next"
          onClick={handleNext}
          disabled={![...isChoose].includes(true) ? true : false}
          variant="primary"
        >
          Next
        </Button>
      )}
      {currentQuestion === questionsLength - 1 && (
        <Button
          className={[...isChoose].includes(true)?"submit":"next"}
          onClick={handleSubmit}
          disabled={![...isChoose].includes(true) ? true : false}
          variant="primary"
        >
          Submit
        </Button>
      )}
    </>
  );
};
export default Buttons;
