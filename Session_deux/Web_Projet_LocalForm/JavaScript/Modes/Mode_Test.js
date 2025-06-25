/* IMPORT LIST */
import { savedQuestions } from "../Modes/Mode_Edit.js";
import { buildButtonSection } from "../Utilities/Buttons.js";
import {
  createDiv,
  createInput,
  createLabel,
  createPara,
  validateInput,
  validateCheckbox,
} from "../Utilities/Utilities.js";

/* GLOBAL VARIABLES */
const mainContainer = document.querySelector("#mainContainer");

/* FUNCTIONS */

export function buildTestMode() {
  // Create a secondary title, Editing mode.
  const modeHeader = document.createElement("h3");
  modeHeader.id = "modeHeader";
  modeHeader.classList = "form-mode-title green-three text-fade-in";
  modeHeader.textContent = "Testing";
  mainContainer.appendChild(modeHeader);

  // Create the html form.
  const divForm = document.createElement("form");
  divForm.id = "form";
  divForm.className = "flex-column";
  divForm.classList.add("flex-center");
  divForm.target = "";
  mainContainer.appendChild(divForm);

  const testContainer = createDiv("testContainer", "text-fade-in", divForm);

  let inputTitle = localStorage.getItem("myTitle");
  const title = document.createElement("h3");
  title.classList = "green-two text-fade-in text-center";
  title.textContent = inputTitle;
  testContainer.appendChild(title);

  let subjectInput = localStorage.getItem("mySubject");
  const subject = document.createElement("h5");
  subject.classList = "green-two text-fade-in text-small text-center";
  subject.textContent = subjectInput;
  testContainer.appendChild(subject);

  let totalScore = savedQuestions.reduce(
    (total, question) => total + (parseFloat(question.score) || 0),
    0
  );

  let score = document.createElement("h4");
  score.classList = "text-small green-three text-fade-in text-center";
  score.textContent = `Form score: 0/${totalScore}`;
  testContainer.appendChild(score);

  const question = [];
  const questionHeader = [];
  const questionInfo = [];

  for (let i = 0; i < savedQuestions.length; i++) {
    // Question(s) main div
    question[i] = createDiv(
      `questionDiv${i}`,
      `quest-class-${i} width100 flex-column small-margin bot-border`,
      testContainer
    );

    // Div questionHeader
    questionHeader[i] = createDiv(
      `questionHeader${i}`,
      `quest-class-${i} width100 flex-row justify-between text-center`,
      question[i]
    );

    // Question count - type
    let label = createLabel(
      `label${i}`,
      `label-class-${i} h3 green-three`,
      `Question ${i + 1} - ${savedQuestions[i].type}`,
      questionHeader[i]
    );

    // Validate button
    const validateBtn = createInput(
      `delBtn${i}`,
      `del-button-${i} xsmall-btn`,
      `button`,
      ``,
      ``,
      questionHeader[i]
    );
    validateBtn.value = "validate";

    // Div questionInfo
    questionInfo[i] = createDiv(
      `infoQuestion${i}`,
      `quest-class-${i} flex-column`,
      question[i]
    );

    // Question name
    createPara(
      `question${i}`,
      `text-xsmall green-two`,
      savedQuestions[i].question,
      questionInfo[i]
    );

    createLabel(
      `inputLabel${i}`,
      `text-xsmall green-two`,
      `Answers here`,
      questionInfo[i]
    );

    // Input answer option
    createInput(
      `inputAnswer${i}`,
      `input-answer`,
      `text`,
      `validationInput`,
      ``,
      questionInfo[i]
    );
  }
  buildButtonSection(divForm);
}
