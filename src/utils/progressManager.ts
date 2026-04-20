export const saveUserProgress = (email: string) => {
  const progressData = {
    currentStreak: localStorage.getItem("currentStreak"),
    bestStreak: localStorage.getItem("bestStreak"),
    quizDatesCompleted: localStorage.getItem("quizDatesCompleted"),
    completedLevels: localStorage.getItem("completedLevels"),
    lastQuizDate: localStorage.getItem("lastQuizDate"),
  };

  localStorage.setItem(
    `userProgress_${email}`,
    JSON.stringify(progressData)
  );
};

export const restoreUserProgress = (email: string) => {
  const savedProgress = localStorage.getItem(`userProgress_${email}`);

  if (savedProgress) {
    const progress = JSON.parse(savedProgress);

    localStorage.setItem("currentStreak", progress.currentStreak || "0");
    localStorage.setItem("bestStreak", progress.bestStreak || "0");

    progress.quizDatesCompleted
      ? localStorage.setItem(
          "quizDatesCompleted",
          progress.quizDatesCompleted
        )
      : localStorage.removeItem("quizDatesCompleted");

    progress.completedLevels
      ? localStorage.setItem(
          "completedLevels",
          progress.completedLevels
        )
      : localStorage.removeItem("completedLevels");

    progress.lastQuizDate
      ? localStorage.setItem("lastQuizDate", progress.lastQuizDate)
      : localStorage.removeItem("lastQuizDate");

  } else {
    localStorage.setItem("currentStreak", "0");
    localStorage.setItem("bestStreak", "0");
    localStorage.removeItem("quizDatesCompleted");
    localStorage.removeItem("completedLevels");
    localStorage.removeItem("lastQuizDate");
  }
};