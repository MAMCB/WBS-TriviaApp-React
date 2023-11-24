import { useState, useEffect } from "react";

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
        <button onClick={handlePrevious}>Previous</button>
      )}
      {currentQuestion < questionsLength - 1 && (
        <button
          onClick={handleNext}
          disabled={![...isChoose].includes(true) ? true : false}
        >
          Next
        </button>
      )}
      {currentQuestion === questionsLength - 1 && (
        <button
          onClick={handleSubmit}
          disabled={![...isChoose].includes(true) ? true : false}
        >
          Submit
        </button>
      )}
    </>
  );
};
export default Buttons;
