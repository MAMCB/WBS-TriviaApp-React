import {useState, useEffect} from 'react'
import categories from '../categories'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios';


function CategoryGrid() {
  
  const [isResult, setIsResult] = useState(false);
  const [isQuiz, setIsQuiz] = useState(false);
  const [category, setCategory] = useState('0');
  const [questions, setQuestions] = useState([]);
  const [answers,setAnswers] = useState([]);
  
  



  const submitAnswer=(answer)=>{
    setAnswers([...answers,answer]);
    
  }

  // useEffect(() => {
  //   if(category !== '0'){
  //     fetch(`https://opentdb.com/api.php?amount=10&category=${category}`)
  //     .then(res => res.json())
  //     .then(data =>
  //       setTimeout(() => {
  //         setQuestions(data);
  //       }, 1000),
  //     )
  //     .catch(error => console.error(error));
  //   }
  // }, [category]);

  useEffect(() => {
    if(category !== '0'){
      axios.get(`https://opentdb.com/api.php?amount=10&category=${category}`)
      .then(data =>
        setTimeout(() => {
          setQuestions(data);
        }, 1000),
      )
      .catch(error => console.error(error));
    }
  }, [category]);


//  useEffect(() => {
//   console.log(questions);
//  }, [questions])


  const CardHandler = (e) => {
    setIsQuiz(true);
    setCategory(e.currentTarget.id);
  }

  return (
    <>
    {isResult?<p>ssgsg</p>
    :isQuiz?<p>place for questions component</p>
    :<><h1 className='mb-3'>Choose your category</h1>
          <Row xs={1} md={3} xl={4} xxl={5} className="g-4">
            {categories.map(categoryCard => (
              <Col key={categoryCard.value}>
                <Card id={categoryCard.value} className='card-category' onClick={CardHandler}>
                  <Card.Img variant="top" className='category-img' src={categoryCard.img} />
                  <Card.Body>
                    <Card.Title>{categoryCard.category}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row></>
    }
    </>
  )
}

export default CategoryGrid