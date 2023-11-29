import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { decode } from "html-entities";
import QuestionsLevel1 from "./QuestionsLevel1";

const FinalPageLevel1 = ({ answers, resetMainPage }) => {
  const [score, setScore] = useState(0);

  const [togglesArr, setTogglesArr] = useState([]);

  useEffect(() => {
    const correctAnswers = answers.filter((answer) => {
      return answer.isCorrectAnswer;
    });
    correctAnswers.forEach((element) => {
      decode(element);
    });

    setScore(
      Math.round(correctAnswers.length * (100 / QuestionsLevel1.length))
    );
  }, []);

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
      <h2>Score:{score}%</h2>
      <div className="accordion" id="accordionFinalPage">
        {answers.sort((a,b)=>a.questionIndex-b.questionIndex).map((e, index) => (
          <div className="accordion-item" key={uuidv4()}>
            <h3 className="accordion-header" id={`heading${index}`}>
              <button
                className={
                  e.isCorrectAnswer
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
                Question {e.questionIndex + 1} <br />
                {decode(QuestionsLevel1[e.questionIndex].question)}
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
              <p>Your answer: {decode(e.answer)}</p>
              <p>Correct answer: {decode(QuestionsLevel1[e.questionIndex].correctAnswer)}</p>
            </div>
          </div>
        ))}
      </div>
      <Button variant="primary" onClick={handleClick}>
        Try Again
      </Button>
    </>
  );
};

export default FinalPageLevel1;
