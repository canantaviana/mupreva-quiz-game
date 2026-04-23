export const cleanData = (rawData) => {
  const IMAGE_URL = "https://pre-dedalo.mupreva.org";

  const gameData = {
    backgroundImage: {},
    logoImage: {},
    questions: {},
    levels: {},
    title: {},
    credits: {},
  };

  const result = rawData.result;

  if (!result || result.length != 2) {
    return null;
  }

  result.forEach((langElement) => {
    const lang = langElement.id;
    const { children_data, images_data, title, description } =
      langElement.result[0];

    gameData.title[lang] = title;
    gameData.credits[lang] = description;

    images_data.forEach((imgElement) => {
      if (imgElement.title === "fondo") {
        gameData.backgroundImage[lang] = IMAGE_URL + imgElement.image;
      } else if (imgElement.title === "logo") {
        gameData.logoImage[lang] =
          IMAGE_URL +
          imgElement.image.replace("1.5MB", "original").replace(".jpg", ".png");
      }
    });

    gameData.questions[lang] = {};

    gameData.levels[lang] = children_data
      .filter((levelElement) => levelElement.type_data === '["2"]')
      .map((levelElement) => {
        gameData.questions[lang][levelElement.section_id] =
          levelElement.children_data
            .filter((questionElement) => questionElement.type_data === '["3"]')
            .map((questionElement) => {
              return {
                question: questionElement.title,
                id: questionElement.section_id,
              };
            });
        return {
          title: levelElement.title,
          id: levelElement.section_id,
        };
      })
      .sort((a, b) => a.id - b.id);
  });

  return gameData;
};

export const cleanAnswers = (rawData) => {
  const answersData = {
    answers: {},
    correct: null,
  };

  rawData.result.forEach((answerElement) => {
    if (
      answerElement.type_data !== '["4"]' &&
      answerElement.type_data !== '["5"]'
    ) {
      return;
    }
    answersData.answers[answerElement.section_id] = {
      id: answerElement.section_id,
      title: answerElement.title,
      correct: answerElement.type_data === '["4"]' ? true : false,
    };
    if (answerElement.type_data === '["4"]') {
      answersData.correct = answerElement.section_id;
    }
  });

  return answersData;
};
