import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";

const FinalPage = ({ questions, answers }) => {
  console.log(answers);
  // const qaPairs = [];
  const[score,setScore]=useState(0);

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
    </>
  );
};
export default FinalPage;