const Buttons = ({ selectNextQuestion, selectPreviousQuestion, setSubmit,currentQuestion,questionsLength,setIsChoose }) => {
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
        <button onClick={handleNext}>Next</button>
      )}
      {currentQuestion === questionsLength - 1 && (
        <button onClick={handleSubmit}>Submit</button>
      )}
    </>
  );
};
export default Buttons;