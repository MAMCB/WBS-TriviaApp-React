import { v4 as uuidv4 } from "uuid";

const Results = ({ questions, answers }) => {
  const qaPairs = [];

  for (let i = 0; i < questions.length; i++) {
    const answer = answers.find((e) => e.question === questions[i].id);
    qaPairs.push({
      question: questions[i].text,
      answer: answer.answer,
    });
  }

  return (
    <>
      <h1>Your final results:</h1>
      <h2>Score:{score}%</h2>
      {qaPairs.map((e) => (
        <p key={uuidv4()}>{e.question + " " + e.answer}</p>
      ))}
    </>
  );
};
export default Results;
