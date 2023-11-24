import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";

const FinalPage = ({ questions, answers, rightAnswers }) => {
  console.log(answers);
  console.log("FinalAnna" + questions);
  // const qaPairs = [];
  const [score, setScore] = useState(0);

  useEffect(() => {
    const correctAnswers = answers.filter((answer, index) => {
      return answer.answer === questions[index].correct_answer;
    });
    console.log(correctAnswers);

    setScore(correctAnswers.length * (100 / questions.length));
  }, [questions, answers]);

  // for (let i = 0; i < questions.length; i++) {

  //   qaPairs.push({
  //     question: questions[i].question,
  //     answer: answers[i].answer,
  //   });
  // }

  return (
    <>
      <h1>Your final results:</h1>
      <h2>Score:{score}%</h2>
      {questions.map((e, index) => (
        <p
          className={
            e.correct_answer === answers[index].answer ? "correct" : "incorrect"
          }
          key={uuidv4()}
        >
          {e.question + " " + answers[index].answer}
        </p>
      ))}

      {/*Accordian variant */}
      <div className="accordion" id="accordionFinalPage">
        {questions.map((e, index) => (
          <div className="accordion-item" key={uuidv4()}>
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
                aria-expanded="true"
                aria-controls={`collapse${index}`}
              >
                Question {index + 1} <br />
                {e.question}
              </button>
            </h3>
            <div
              className="accordion-collapse collapse show"
              id={`collapse${index}`}
              aria-labelledby={`heading${index}`}
              data-bs-parent="#accordionFinalPage"
            >
              <p>Your answer: {answers[index].answer}</p>
              <p>Correct answer: {e.correct_answer}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default FinalPage;
