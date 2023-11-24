const Buttons = ({ selectNextQuestion, selectPreviousQuestion, setSubmit, currentQuestion, questionsLength, setIsChoose, isChoose }) => {
  const handlePrevious = () => {
    selectPreviousQuestion();
  };

  const handleNext = () => {
    selectNextQuestion();
    setIsChoose([false, false, false, false])
  };

  const handleSubmit = ()=>{
    setSubmit();
  }

  return (
    <>
      {!currentQuestion === 0 && (
        <button onClick={handlePrevious}>Previous</button>
      )}
      {currentQuestion < questionsLength - 1 && (
        <button onClick={handleNext} disabled={![...isChoose].includes(true)?true:false}>Next</button>
      )}
      {currentQuestion === questionsLength - 1 && (
        <button onClick={handleSubmit} disabled={![...isChoose].includes(true)?true:false}>Submit</button>
      )}
    </>
  );
};
export default Buttons;