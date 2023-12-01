import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { decode } from "html-entities";

const FinalPage = ({ questions, answers, resetMainPage }) => {
  console.log(answers);
  // const qaPairs = [];
  const [score, setScore] = useState(0);

  const [togglesArr, setTogglesArr] = useState([]);

  useEffect(() => {
    const correctAnswers = answers.filter((answer, index) => {
      return answer.answer === questions[index].correct_answer;
    });
    correctAnswers.forEach(element => {decode(element)
      
    });
    
    console.log(correctAnswers);

    setScore(Math.round(correctAnswers.length * (100 / questions.length)));
  }, [questions, answers]);

  // for (let i = 0; i < questions.length; i++) {

  //   qaPairs.push({
  //     question: questions[i].question,
  //     answer: answers[i].answer,
  //   });
  // }

  function toggleItem(index) {
    setTogglesArr((prevToggles) => {
      const newArray = [...prevToggles];
      newArray[index] = { id: index, status: !newArray[index]?.status };
      return newArray;
    });
  }
  function handleClick() {
    resetMainPage();
  }

  return (
    <>
      <h1>Your final results:</h1>
      <h2>Score: {score}%</h2>
      {/* {questions.map((e, index) => (
        <p
          className={
            e.correct_answer === answers[index].answer ? "correct" : "incorrect"
          }
          key={uuidv4()}
        >
          {e.question + " " + answers[index].answer}
        </p>
      ))} */}

      {/*Accordian variant */}
      <div
        className="accordion w-50 d-flex flex-column mb-3  m-auto"
        id="accordionFinalPage"
      >
        {questions.map((e, index) => (
          <div className="accordion-item flex-fill" key={uuidv4()}>
            <h3 className="accordion-header" id={`heading${index}`}>
              <button
                className={
                  e.correct_answer === answers[index].answer
                    ? "correct accordion-button"
                    : "incorrect accordion-button"
                }
                id={`heading${index}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`collapse${index}`}
                aria-expanded={togglesArr[index]?.status ? "true" : "false"}
                aria-controls={`collapse${index}`}
                onClick={() => toggleItem(index)}
              >
                Question {index + 1} <br />
                {decode(e.question)}
              </button>
            </h3>
            <div
              className={
                togglesArr[index]?.status
                  ? "accordion-collapse collapse show"
                  : "accordion-collapse collapse"
              }
              id={`collapse${index}`}
              aria-labelledby={`heading${index}`}
              data-bs-parent="#accordionFinalPage"
            >
              <p>Your answer: {decode(answers[index].answer)}</p>
              <p>Correct answer: {decode(e.correct_answer)}</p>
            </div>
          </div>
        ))}
      </div>
      <Button className="mt-4" variant="primary" onClick={handleClick}>
        Start new Quiz
      </Button>
    </>
  );
};
export default FinalPage;
