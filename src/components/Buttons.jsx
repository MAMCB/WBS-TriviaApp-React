const Buttons = ({ selectNextQuestion, selectPreviousQuestion, setSubmit,currentQuestion,questionsLength }) => {
  const handlePrevious = () => {
    selectPreviousQuestion();
  };

  const handleNext = () => {
    selectNextQuestion();
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