const animals = ["dog", "cat", "turtle", "pig", "ant", "axolotl"];
const apiBaseUrl = "https://api.giphy.com/v1";
const apiKey = "RPDU52QgdRjva5pKulEhrxt8MUoH5N8g";

const addAnimalButton = (animal) => {
  const animalButton = $('<button class="animal-button">');
  animalButton.attr("data-type", animal);
  animalButton.text(animal);
  $("#animal-buttons").append(animalButton);
};

const generateButtons = () => {
  $("#animal-buttons").empty();
  animals.forEach(addAnimalButton);
};

const animalClickHandler = (event) => {
  event.preventDefault();
  $("#animals").empty();
  const search = $(event.currentTarget).attr("data-type");

  $.ajax({
    url: `${apiBaseUrl}/gifs/search`,
    type: "get",
    data: {
      q: search,
      api_key: apiKey,
      limit: 10,
    },
  }).then(({ data }) => {
    for ({ rating, images } of data) {
      const animalDiv = $('<div class="animal-item">');
      const p = $("<p>").text(`Rating: ${rating}`);

      const animated = images.fixed_height.url;
      const still = images.fixed_height_still.url;

      const animalImage = $("<img>");
      animalImage.attr("src", still);
      animalImage.attr("data-still", still);
      animalImage.attr("data-animate", animated);
      animalImage.attr("data-isAnimated", "false");
      animalImage.addClass("animal-image");

      animalDiv.append(p);
      animalDiv.append(animalImage);

      $("#animals").append(animalDiv);
    }
  });
};

const imageClickHandler = (event) => {
  const img = $(event.target);
  const state = img.attr("data-isAnimated");

  if (state === "false") {
    img.attr("src", img.attr("data-animate"));
    img.attr("data-isAnimated", "true");
  } else {
    img.attr("src", img.attr("data-still"));
    img.attr("data-isAnimated", "false");
  }
};

const addAnimalListener = (event) => {
  event.preventDefault();
  animals.push($("#animal-input").val());
  generateButtons();
  $("#animal-input").val("");
};

$(document).ready(() => {
  generateButtons();
  $("#animal-buttons").on("click", ".animal-button", animalClickHandler);
  $("#animals").on("click", ".animal-item", imageClickHandler);
  $("#animal-form").on("submit", addAnimalListener);
});
