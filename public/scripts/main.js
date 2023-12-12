let totalQuestions = 5;
let currentQuestion = 1;

let BASKET = {
  spendingPreference: "useMax", // Default value
  applications: "not specified",
  capacity: "1TB",
  resolution: "1080p",
  spendingPreference: "useMax",
  tower: "Mid Tower",
  userTypes: "",
};
function previousQuestion() {
  if (currentQuestion > 1) {
    // Hide current question
    document
      .getElementById(`question${currentQuestion}`)
      .classList.remove("active");

    // Show previous question
    currentQuestion -= 1;
    let previousQuestion = document.getElementById(
      `question${currentQuestion}`
    );
    previousQuestion.style.opacity = 0;
    previousQuestion.classList.add("active");
    setTimeout(() => {
      previousQuestion.style.opacity = 1;
    }, 100);

    // Update progress bar
    let progress = ((currentQuestion - 1) / totalQuestions) * 100;
    document.getElementById("progress-bar").style.width = progress + "%";
  }
}
window.previousQuestion = previousQuestion;

function nextQuestion() {
  // Store answer before moving to the next question
  switch (currentQuestion) {
    case 1:
      if (
        document.getElementById("budgetDisplay").textContent.match(/\d+/) > 200
      ) {
        BASKET.budget = document.getElementById("budgetDisplay").textContent;
        BASKET.spendingPreference = selectedOption; // Include selectedOption in BASKET
      } else {
        alert("Your budget is too low");
        console.log(document.getElementById("budgetDisplay").textContent);
        return;
      }
      break;
    case 2:
      const selectedTypes = Array.from(
        document.querySelectorAll(".type.selected")
      ).map((typeElement) => typeElement.textContent.trim());
      if (selectedTypes.length !== 0) {
        // if selected.
        BASKET.userTypes = selectedTypes.join(", ");
        BASKET.applications = document.getElementById("app-input").value;
      } else {
        alert("Please select your type.");
        return;
      }
      break;
    case 3:
      const selectedSize = document.querySelector(".size.selected");
      BASKET.tower = selectedSize ? selectedSize.textContent.trim() : "";
      break;
    case 4:
      const selectedOption4 = document.querySelector(".option.selected");
      BASKET.capacity = selectedOption4
        ? selectedOption4.textContent.trim()
        : "";
      break;
    case 5:
      break;
    default:
      break;
  }

  if (currentQuestion <= totalQuestions) {
    // Hide current question
    document
      .getElementById(`question${currentQuestion}`)
      .classList.remove("active");

    // Show next question
    currentQuestion += 1;
    let nextQuestion = document.getElementById(`question${currentQuestion}`);
    nextQuestion.style.opacity = 0;
    nextQuestion.classList.add("active");
    setTimeout(() => {
      nextQuestion.style.opacity = 1;
    }, 100);

    // Update progress bar
    let progress = ((currentQuestion - 1) / totalQuestions) * 100;
    document.getElementById("progress-bar").style.width = progress + "%";
  }
}
window.nextQuestion = nextQuestion;

function updateValue(value) {
  var scaledValue = value * 100;
  document.getElementById("budgetDisplay").textContent = "$" + scaledValue;
}
window.updateValue = updateValue;
// ============================ Question 1========================

let selectedOption = "useMax"; // Default value

function selectOption(option) {
  // Remove 'selected' class from all options
  const options = document.querySelectorAll(".options-container .option");
  options.forEach((o) => o.classList.remove("selected"));

  // Add 'selected' class to the clicked option
  const clickedOption = document.querySelector(
    `.options-container .option[onclick="selectOption('${option}')"]`
  );
  clickedOption.classList.add("selected");

  // Update selectedOption variable
  selectedOption = option;
}
window.selectOption = selectOption;
// =============================Question 2=========================

let types = document.querySelectorAll(".type");
let appInputContainer = document.getElementById("app-input-container");
let appInput = document.getElementById("app-input");

types.forEach((type) => {
  type.addEventListener("click", function () {
    // Toggle 'selected' class for the clicked type
    this.classList.toggle("selected");

    // Show the app input field if at least one type is selected
    if (document.querySelector(".selected")) {
      appInputContainer.style.display = "block";
    } else {
      appInputContainer.style.display = "none";
      appInput.value = ""; // reset the input field if no types are selected
    }
  });
});
// ========================Question 3=====================
function selectSize(towerSize) {
  // Remove 'selected' class from all options
  document
    .querySelectorAll(".size")
    .forEach((s) => s.classList.remove("selected"));

  // Add 'selected' class to the clicked option
  let sizeElems = Array.from(document.querySelectorAll(".size"));
  let selectedSize = sizeElems.find(
    (elem) => elem.textContent.trim() === towerSize
  );
  if (selectedSize) {
    selectedSize.classList.add("selected");
  }
}
window.selectSize = selectSize;
// ================= Question 4 ============================

function selectCapacity(capacity) {
  // Remove 'selected' class from all options
  document
    .querySelectorAll(".option")
    .forEach((o) => o.classList.remove("selected"));

  // Add 'selected' class to the clicked option
  let optionElems = Array.from(document.querySelectorAll(".option"));
  let selectedOption = optionElems.find(
    (elem) => elem.textContent.trim() === capacity
  );
  if (selectedOption) {
    selectedOption.classList.add("selected");
  }
}
window.selectCapacity = selectCapacity;

///   ================= Question 5 ============================
let selectedResolution = "";

function selectResolution(resolution) {
  // Remove active class from all options
  const options = document.querySelectorAll(".q5-options .option");
  options.forEach((option) => option.classList.remove("active"));

  // Add active class to selected option
  const selectedOption = document.querySelector(
    `.q5-options .option[onclick="selectResolution('${resolution}')"]`
  );
  selectedOption.classList.add("active");

  // Update selectedResolution variable
  selectedResolution = resolution;
  BASKET.resolution = selectedResolution;
}
window.selectResolution = selectResolution;

function submitForm() {
  // Save BASKET to localStorage
  localStorage.setItem("basket", JSON.stringify(BASKET));
  console.log("submitted.");
}
window.submitForm = submitForm;

export function getBasket() {
  return BASKET;
}
