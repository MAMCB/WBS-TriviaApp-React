const Buttons = ({ selectNextQuestion, selectPreviousQuestion, setSubmit }) => {
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
      <button onClick={handlePrevious}>Previous</button>
      <button onClick={handleNext}>Next</button>
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
};
export default Buttons;