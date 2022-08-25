import React, { useState } from "react";
import "./App.css";
import yellowShape from "./assets/images/shape-1.png";
import blueShape from "./assets/images/shape-2.png";
import QuestionList from "./components/QuestionList/QuestionList";

function App() {
  const [gameStart, setGameStart] = useState(false);
  function handleGameStart() {
    setGameStart((prevState) => !prevState);
  }
  return (
    <main>
      <img src={yellowShape} className="shape--top" alt="Shape Top" />
      {gameStart ? (
        <QuestionList handleGameStart={handleGameStart} />
      ) : (
        <section className="quizzy--intro">
          <h1 className="quizzy--title">Quizzical</h1>
          <p className="quizzy--description">
            Test your knowledge to max limit
          </p>
          <button className="btn--primary" onClick={handleGameStart}>
            Start Quiz
          </button>
        </section>
      )}
      <img src={blueShape} className="shape--bot" alt="Shape Bottom" />
      <footer>
        Developed By&nbsp;
        <a href="https://github.com/michaeladiansyh" rel="noopener noreferrer">
          Michael Adiansyah
        </a>
      </footer>
    </main>
  );
}

export default App;
