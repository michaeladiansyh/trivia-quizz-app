const getQuestionAPI = () => {
  return fetch("https://opentdb.com/api.php?amount=5")
    .then((res) => res.json())
    .then((data) => data.results);
};

export default getQuestionAPI;
