import {useState, useEffect} from 'react'
import categories from '../categories'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import FinalPage from './FinalPage';
import Questions from './Questions';
import Spinner from 'react-bootstrap/Spinner';



function CategoryGrid() {
  
  const [isResult, setIsResult] = useState(false);
  const [isQuiz, setIsQuiz] = useState(false);
  const [category, setCategory] = useState('0');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]); //ANSWERS FOR FORM
  const [userAnswers, setUserAnswers] = useState([]); //USER ANSWERS
  const [currentQuestion,setCurrentQuestion]=useState(0);
  
  



 
  useEffect(() => {
    if(category !== '0'){
      fetch(`https://opentdb.com/api.php?amount=10&category=${category}`)
      .then(res => res.json())
      .then(data =>
        setTimeout(() => {
          setQuestions(data.results);
        }, 1000),
      )
      .catch(error => console.error(error));
    }
  }, [category]);

  // useEffect(() => {
  //   if(category !== '0'){
  //     axios.get(`https://opentdb.com/api.php?amount=10&category=${category}`)
  //     .then(data =>
  //       setTimeout(() => {
  //         setQuestions(data.results);
  //       }, 1000),
  //     )
  //     .catch(error => console.error(error));
  //   }
  // }, [category]);

  useEffect(() => {
   const answersArr = questions.map(question => {
     const answers = shuffleAnswers(question.correct_answer, question.incorrect_answers);
     return answers;
   },)
  
  setAnswers(answersArr); 
  }, [questions])


  const shuffleAnswers = (correctAnswer, incorrectAnswers) => {
    const allAnswers = [correctAnswer, ...incorrectAnswers];

    // Fisher-Yates shuffle algorithm
    for (let i = allAnswers.length - 1; i > 0; i--) {
     const j = Math.floor(Math.random() * (i + 1));
     [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
    }
    return allAnswers;};


 

const selectNextQuestion=()=>{
  setCurrentQuestion(currentQuestion + 1);
  }

  const selectPreviousQuestion = () => {
    setCurrentQuestion(currentQuestion - 1);
}

const setSubmit = ()=>{
  setIsResult(true);
}

const resetMainPage = ()=>{
  setIsResult(false);
  setIsQuiz(false);
  setCurrentQuestion(0);
  setCategory("0");
  setQuestions([]);
  setAnswers([]);
  setUserAnswers([]);
}



  const CardHandler = (e) => {
    setIsQuiz(true);
    setCategory(e.currentTarget.id);
  }
  
  return (
    <>
      {isResult ? (
        <FinalPage
          answers={userAnswers}
          questions={questions}
         
          resetMainPage={resetMainPage}
        />
      ) : isQuiz && questions.length > 0 && answers.length > 0 ? (
        <Questions
          question={[...questions][currentQuestion]}
          selectNextQuestion={selectNextQuestion}
          selectPreviousQuestion={selectPreviousQuestion}
          answers={[...answers][currentQuestion]}
          setAnswers={setAnswers}
          userAnswers={userAnswers}
          setUserAnswers={setUserAnswers}
          currentQuestion={currentQuestion}
          questionsLength={questions.length}
          setSubmit={setSubmit}
        />
      ) : isQuiz?<Spinner animation="border" variant="primary" />: (
        <>
          <h1 className="mb-3">Choose your category</h1>
          <Row xs={1} md={3} xl={4} xxl={5} className="g-4">
            {categories.map((categoryCard) => (
              <Col key={categoryCard.value}>
                <Card
                  id={categoryCard.value}
                  className="card-category"
                  onClick={CardHandler}
                >
                  <Card.Img
                    variant="top"
                    className="category-img"
                    src={categoryCard.img}
                  />
                  <Card.Body>
                    <Card.Title>{categoryCard.category}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
}

export default CategoryGrid