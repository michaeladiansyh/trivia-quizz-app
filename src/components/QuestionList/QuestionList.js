import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import "./QuestionList.css";
import getQuestionAPI from "../../services/getQuestionsAPI";
import Question from "../Question/Question";

function QuestionList(props) {
  const [questionArray, setQuestionArray] = useState([]);
  const [checkAnswerButton, setCheckAnswerButton] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [isOver, setIsOver] = useState(false);

  //check if all question is answer?
  const allQuestionsAnswered = questionArray.every(
    (question) => question.selectedAnswer !== ""
  );

  //set state so we can pass data from API
  useEffect(() => {
    getQuestionAPI().then((questions) => {
      if (questions.length === 0) {
        props.handleGameStart();
        return;
      }

      return setQuestionArray(
        questions.map((question) => {
          return {
            ...question,
            id: nanoid(),
            selectedAnswer: "",
            showAnswer: false,
          };
        })
      );
    });
  }, []);

  //count correct answer
  useEffect(() => {
    if (questionArray.length !== 0 && allQuestionsAnswered) {
      let correctAnswer = 0;
      questionArray.forEach((question) => {
        if (question.correct_answer === question.selectedAnswer)
          correctAnswer++;
      });
      setCorrectAnswer(correctAnswer);
      setCheckAnswerButton(true);
    }
  }, [questionArray]);

  //handling for selected answer pass to Question Component
  const handleSelectAnswer = (quesstionId, answer) => {
    if (!isOver) {
      setQuestionArray((prevQuestionArray) =>
        prevQuestionArray.map((question) =>
          question.id === quesstionId
            ? { ...question, selectedAnswer: answer }
            : question
        )
      );
    }
  };

  //handling  for checking all answer
  const checkAnswers = () => {
    if (allQuestionsAnswered) {
      setIsOver(true);
      setQuestionArray((prevQuestionArray) =>
        prevQuestionArray.map((question) => ({
          ...question,
          showAnswer: true,
        }))
      );
    }
  };

  //reseting question
  const reset = () => {
    setCheckAnswerButton(false);
    setIsOver(false);
    props.handleGameStart();
  };

  //mapping for rendering component
  const questions = questionArray.map((question) => (
    <Question
      key={question.id}
      id={question.id}
      question={question.question}
      correctAnswer={question.correct_answer}
      incorrectAnswers={question.incorrect_answers}
      difficulty={question.difficulty}
      category={question.category}
      selectedAnswer={question.selectedAnswer}
      showAnswer={question.showAnswer}
      handleSelectAnswer={handleSelectAnswer}
    />
  ));

  return (
    <section className="list--container">
      {questions}
      <div className="bottom--container">
        {isOver && (
          <h3 className="correct--answers">
            You Scored {correctAnswer}/5 correct answers
          </h3>
        )}
        <button
          className={`btn--primary ${
            checkAnswerButton
              ? "btn--check--answer"
              : "btn--check--asnwer-disabled"
          }`}
          onClick={isOver ? reset : checkAnswers}
        >
          {isOver ? "Retry" : "Check Answers"}
        </button>
      </div>
    </section>
  );
}

export default QuestionList;
