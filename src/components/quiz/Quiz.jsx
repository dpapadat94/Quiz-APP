import { useRef, useState } from "react";
import "./Quiz.css";
import { quizData } from "../../assets/quizData";

function Quiz() {
  let [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(quizData[index]);
  const [answered, setanswered] = useState(false);
  const [score, setScore] = useState(0);
  let [result, setResult] = useState(false);

  const choice1 = useRef(null);
  const choice2 = useRef(null);
  const choice3 = useRef(null);
  const choice4 = useRef(null);

  const choiceArray = [choice1, choice2, choice3, choice4];

  const checkAns = (e, ans) => {
    if (answered === false) {
      if (question.correctAns === ans) {
        e.target.classList.add("correct");
        setanswered(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        setanswered(true);
        choiceArray[question.correctAns - 1].current.classList.add("correct");
      }
    }
  };

  const next = () => {
    if (answered === true) {
      if (index === quizData.length - 1) {
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setQuestion(quizData[index]);
      setanswered(false);
      choiceArray.map((choice) => {
        choice.current.classList.remove("wrong");
        choice.current.classList.remove("correct");

        return null;
      });
    }
  };
  const reset = () => {
    setIndex(0);
    setQuestion(quizData[0]);
    setScore(0);
    setanswered(false);
    setResult(false);
  };

  return (
    <div className="container">
      <h1>General Knowledge Trivia</h1>

      {result ? (
        <></>
      ) : (
        <>
          <h2>
            {index + 1}. {question.question}{" "}
          </h2>
          <ul>
            <div className="li-box">
              <li
                ref={choice1}
                onClick={(e) => {
                  checkAns(e, 1);
                }}
              >
                {question.answer1}
              </li>
              <li
                ref={choice2}
                onClick={(e) => {
                  checkAns(e, 2);
                }}
              >
                {question.answer2}
              </li>
            </div>
            <div className="li-box">
              <li
                ref={choice3}
                onClick={(e) => {
                  checkAns(e, 3);
                }}
              >
                {question.answer3}
              </li>
              <li
                ref={choice4}
                onClick={(e) => {
                  checkAns(e, 4);
                }}
              >
                {question.answer4}
              </li>
            </div>
          </ul>
          <div className="footer-box">
            <div className="index">
              Question {index + 1} of {quizData.length}
            </div>
            <button onClick={next}>Next</button>
          </div>
        </>
      )}
      {result ? (
        <>
          <h2>{(score / quizData.length) * 100 >= 80 && "Great Job!"}</h2>
          <h2>
            {(score / quizData.length) * 100 < 80 && "Better Luck Next Time!"}
          </h2>
          <div className="results">
            <p>
              You answered {score} out of {quizData.length} correct{" "}
            </p>
            <h2>{(score / quizData.length) * 100}%</h2>
          </div>
          <button className="restart" onClick={reset}>
            Reset
          </button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Quiz;
